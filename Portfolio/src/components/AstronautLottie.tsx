'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AstronautLottieProps {
  className?: string;
  style?: React.CSSProperties;
}

export const AstronautLottie: React.FC<AstronautLottieProps> = ({
  className = 'w-16 h-16',
  style,
}) => {
  return (
    <motion.div
      animate={{
        y: [-4, 4, -4],
        rotate: [-3, 3, -3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`relative flex items-center justify-center ${className}`}
      style={style}
    >
      <svg
        className="w-full h-full text-slate-100 drop-shadow-[0_10px_25px_rgba(56,189,248,0.5)]"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glowing Thruster Jet Particles */}
        <motion.g
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.15, 0.9] }}
          transition={{ repeat: Infinity, duration: 0.15 }}
        >
          <path d="M6 32 L-4 35 L6 38 Z" fill="#38bdf8" />
          <circle cx="-6" cy="35" r="2.5" fill="#67e8f9" />
        </motion.g>

        {/* Life Support Backpack */}
        <rect x="12" y="22" width="7" height="22" rx="3.5" fill="#334155" />
        <rect x="14" y="26" width="3" height="6" rx="1.5" fill="#64748b" />

        {/* Spacesuit Torso */}
        <rect x="18" y="24" width="26" height="22" rx="8" fill="#f8fafc" />
        <rect x="25" y="30" width="12" height="10" rx="3" fill="#0f172a" />
        <circle cx="29" cy="35" r="2" fill="#38bdf8" />
        <circle cx="35" cy="35" r="1.5" fill="#34d399" />

        {/* Helmet Shell & Reflective Visor */}
        <rect
          x="20"
          y="8"
          width="22"
          height="20"
          rx="10"
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="1.5"
        />
        <path
          d="M24 13 Q31 9 38 13 C37 21 26 21 24 13 Z"
          fill="#fbbf24"
          opacity={0.95}
        />

        {/* Waving Arm & Suit Boots */}
        <motion.path
          d="M38 32 L46 36"
          stroke="#f8fafc"
          strokeWidth="4.5"
          strokeLinecap="round"
          animate={{ rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
        <g>
          <rect x="22" y="44" width="7" height="14" rx="3.5" fill="#cbd5e1" />
          <rect x="33" y="44" width="7" height="14" rx="3.5" fill="#94a3b8" />
        </g>
      </svg>
    </motion.div>
  );
};
