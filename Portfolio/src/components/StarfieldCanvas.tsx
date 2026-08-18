'use client';

import React, { useEffect, useRef } from 'react';

interface Star3D {
  x: number; // 3D offset relative to center (-width..width)
  y: number; // 3D offset relative to center (-height..height)
  z: number; // Depth 1 (closest) to MAX_Z (deep space)
  px: number; // Previous projected screen X
  py: number; // Previous projected screen Y
  size: number;
  alpha: number;
  targetAlpha: number;
  twinkleSpeed: number;
  color: string;
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const MAX_Z = 1000;
    const FOV = 350;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let targetScrollVel = 0;
    let currentScrollVel = 0;

    const checkIsOverscrolling = (deltaY: number) => {
      if (typeof window === 'undefined') return false;
      const currentY = window.scrollY;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

      // Overscrolling at top of page (trying to scroll up)
      if (currentY <= 2 && deltaY < 0) return true;

      // Overscrolling at bottom of page (trying to scroll down)
      if (currentY >= maxScroll - 4 && deltaY > 0) return true;

      return false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.04;
      targetMouseY = (e.clientY - height / 2) * 0.04;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const dy = currentScrollY - lastScrollY;

      if (checkIsOverscrolling(dy)) {
        targetScrollVel = 0;
        lastScrollY = currentScrollY;
        return;
      }

      targetScrollVel = dy * 0.35;
      lastScrollY = currentScrollY;
    };

    const handleWheel = (e: WheelEvent) => {
      if (checkIsOverscrolling(e.deltaY)) {
        targetScrollVel = 0;
        return;
      }
      targetScrollVel = e.deltaY * 0.12;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    // Star colors: crisp white, icy blue, soft violet, bright cyan
    const starColors = ['#ffffff', '#e0e7ff', '#c7d2fe', '#ddd6fe', '#38bdf8', '#a7f3d0'];

    const starCount = Math.floor((width * height) / 7500);
    const stars: Star3D[] = Array.from({ length: Math.min(starCount, 220) }, () => {
      const z = Math.random() * MAX_Z + 1;
      const x = (Math.random() - 0.5) * width * 2;
      const y = (Math.random() - 0.5) * height * 2;
      const initialPx = width / 2 + (x / z) * FOV;
      const initialPy = height / 2 + (y / z) * FOV;
      const alpha = Math.random() * 0.7 + 0.3;

      return {
        x,
        y,
        z,
        px: initialPx,
        py: initialPy,
        size: Math.random() * 1.5 + 0.6,
        alpha,
        targetAlpha: alpha,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse & scroll damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      currentScrollVel += (targetScrollVel - currentScrollVel) * 0.12;

      // Decay scroll speed toward 0 when stopped
      targetScrollVel *= 0.88;

      // Radial background nebula gradient
      const centerX = width / 2 + mouseX;
      const centerY = height / 2 + mouseY;

      const radialGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        40,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      radialGradient.addColorStop(0, 'rgba(30, 27, 75, 0.3)');
      radialGradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.45)');
      radialGradient.addColorStop(1, 'rgba(3, 7, 18, 0.96)');

      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // Calculate Z velocity:
      // Base ambient drift: moves away into deep space (+1.2 Z speed)
      // Scroll Down (currentScrollVel > 0): Traveler moves forward -> stars zoom TOWARDS you (-Z speed)
      // Scroll Up (currentScrollVel < 0): Traveler moves backward -> stars zoom AWAY from you (+Z speed)
      const zSpeed = 1.2 - currentScrollVel * 5.0;

      stars.forEach((star) => {
        // Update 3D depth
        star.z += zSpeed;

        // Respawn wrap bounds:
        if (star.z > MAX_Z) {
          // Moved too far into deep space -> respawn near camera
          star.z = 10;
          star.x = (Math.random() - 0.5) * width * 1.5;
          star.y = (Math.random() - 0.5) * height * 1.5;
          star.px = centerX + (star.x / star.z) * FOV;
          star.py = centerY + (star.y / star.z) * FOV;
        } else if (star.z < 1) {
          // Reached/passed camera -> respawn deep in space
          star.z = MAX_Z;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.px = centerX + (star.x / star.z) * FOV;
          star.py = centerY + (star.y / star.z) * FOV;
        }

        // Project 3D -> 2D screen coordinates
        const screenX = centerX + (star.x / star.z) * FOV;
        const screenY = centerY + (star.y / star.z) * FOV;

        // Depth scale factor: 1 at camera (z=1), 0 at deep horizon (z=MAX_Z)
        const depthFactor = Math.max(0, 1 - star.z / MAX_Z);
        const currentSize = Math.max(0.4, depthFactor * 3.5 * star.size);

        // Twinkle logic
        if (Math.abs(star.alpha - star.targetAlpha) < 0.01) {
          star.targetAlpha = Math.random() * 0.7 + 0.3;
        } else {
          star.alpha += (star.targetAlpha - star.alpha) * star.twinkleSpeed;
        }

        const effectiveAlpha = Math.max(0.1, Math.min(1, star.alpha * depthFactor));

        // Speed Streak / Light Ray Threshold
        const speedMagnitude = Math.abs(zSpeed);

        if (speedMagnitude > 3.0) {
          // HIGH SPEED -> Render Radial Light Ray / Streak!
          ctx.save();
          ctx.globalAlpha = Math.max(0.2, effectiveAlpha);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.max(0.8, currentSize * 0.9);
          ctx.lineCap = 'round';

          ctx.beginPath();
          ctx.moveTo(star.px, star.py);
          ctx.lineTo(screenX, screenY);
          ctx.stroke();

          // Outer glowing streak line
          ctx.shadowBlur = Math.min(16, speedMagnitude * 1.5);
          ctx.shadowColor = star.color;
          ctx.stroke();
          ctx.restore();
        } else {
          // NORMAL / AMBIENT SPEED -> Render 3D Projected Star Point
          ctx.save();
          ctx.globalAlpha = effectiveAlpha;
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(screenX, screenY, currentSize, 0, Math.PI * 2);
          ctx.fill();

          if (currentSize > 1.6) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = star.color;
            ctx.fill();
          }
          ctx.restore();
        }

        // Store current screen coordinates as previous for next frame streak
        star.px = screenX;
        star.py = screenY;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

