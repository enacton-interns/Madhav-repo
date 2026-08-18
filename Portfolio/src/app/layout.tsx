import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030712',
};

export const metadata: Metadata = {
  title: 'Madhav Kotak | Full-Stack & Systems Software Engineer',
  description:
    'Official portfolio of Madhav Kotak — Full-Stack & Systems Software Engineer specializing in Next.js, React 19, TypeScript, Node.js, Go, and Cloud Architecture.',
  keywords: [
    'Madhav Kotak',
    'Developer Portfolio',
    'Full-Stack Engineer',
    'Systems Software Engineer',
    'Next.js',
    'React',
    'TypeScript',
    'Go',
    'Tailwind CSS',
  ],
  authors: [{ name: 'Madhav Kotak' }],
  openGraph: {
    title: 'Madhav Kotak | Full-Stack & Systems Software Engineer',
    description:
      'Crafting high-throughput web applications, resilient cloud systems, and sleek interactive interfaces.',
    type: 'website',
    url: 'https://madhavkotak.dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
