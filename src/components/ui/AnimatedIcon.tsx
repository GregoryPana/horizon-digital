import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimatedIconProps {
  type: 'outdated' | 'found' | 'zero' | 'start' | 'briefcase' | 'shopping' | 'bed';
  active?: boolean;
}

export function AnimatedIcon({ type, active }: AnimatedIconProps) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia("(max-width: 1023px)").matches : false
  );

  useEffect(() => {
    const match = window.matchMedia("(max-width: 1023px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    match.addEventListener("change", handler);
    return () => match.removeEventListener("change", handler);
  }, []);

  const drawTransition = (duration: number, delay: number = 0) => ({
    duration,
    delay: (active ? 1.4 : 0) + delay,
    ease: "easeInOut" as const,
  });

  const commonProps = (duration: number, delay: number = 0) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: active ? { pathLength: 1, opacity: 1 } : {},
    whileInView: !active ? { pathLength: 1, opacity: 1, transition: drawTransition(duration, delay) } : undefined,
    transition: active ? drawTransition(duration, delay) : undefined,
    whileHover: !isMobile ? { pathLength: [0, 1], opacity: [0, 1], transition: { duration } } : undefined,
  });

  if (type === 'outdated') {
    return (
      <svg className="h-8 w-8 text-cyan transition-colors duration-300 group-hover:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.circle cx="12" cy="12" r="10" {...commonProps(1)} />
        <motion.path d="M16 16s-1.5-2-4-2-4 2-4 2" {...commonProps(0.6, 0.5)} />
        <motion.line x1="9" y1="9" x2="9.01" y2="9" 
          initial={{ opacity: 0, scale: 0 }} 
          animate={active ? { opacity: 1, scale: 1 } : {}}
          whileInView={!active ? { opacity: 1, scale: 1, transition: drawTransition(0.3, 0.8) } : undefined} 
          transition={active ? drawTransition(0.3, 0.8) : undefined}
        />
        <motion.line x1="15" y1="9" x2="15.01" y2="9" 
          initial={{ opacity: 0, scale: 0 }} 
          animate={active ? { opacity: 1, scale: 1 } : {}}
          whileInView={!active ? { opacity: 1, scale: 1, transition: drawTransition(0.3, 0.9) } : undefined} 
          transition={active ? drawTransition(0.3, 0.9) : undefined}
        />
      </svg>
    );
  }

  if (type === 'found') {
    return (
      <svg className="h-8 w-8 text-cyan transition-colors duration-300 group-hover:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.circle cx="11" cy="11" r="8" {...commonProps(0.8)} />
        <motion.line x1="21" y1="21" x2="16.65" y2="16.65" {...commonProps(0.4, 0.6)} />
        <motion.path d="m13.5 8.5-5 5" {...commonProps(0.4, 0.9)} />
        <motion.path d="m8.5 8.5 5 5" {...commonProps(0.4, 0.9)} />
      </svg>
    );
  }

  if (type === 'zero') {
    return (
      <svg className="h-8 w-8 text-cyan transition-colors duration-300 group-hover:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d="M22 12h-4l-3 9L9 3l-3 9H2" {...commonProps(1.2)} />
      </svg>
    );
  }

  if (type === 'start') {
    return (
      <svg className="h-8 w-8 text-cyan transition-colors duration-300 group-hover:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.circle cx="12" cy="12" r="10" {...commonProps(0.9)} />
        <motion.path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" {...commonProps(0.7, 0.6)} />
        <motion.line x1="12" y1="17" x2="12.01" y2="17" 
          initial={{ opacity: 0, scale: 0 }} 
          animate={active ? { opacity: 1, scale: 1 } : {}}
          whileInView={!active ? { opacity: 1, scale: 1, transition: drawTransition(0.3, 1.1) } : undefined} 
          transition={active ? drawTransition(0.3, 1.1) : undefined}
        />
      </svg>
    );
  }

  if (type === 'briefcase') {
    return (
      <svg className="h-8 w-8 text-cyan transition-colors duration-300 group-hover:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.rect width="20" height="14" x="2" y="6" rx="2" {...commonProps(1)} />
        <motion.path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" {...commonProps(0.8, 0.5)} />
      </svg>
    );
  }

  if (type === 'shopping') {
    return (
      <svg className="h-8 w-8 text-cyan transition-colors duration-300 group-hover:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" {...commonProps(1.2)} />
        <motion.path d="M3 6h18" {...commonProps(0.4, 0.8)} />
        <motion.path d="M16 10a4 4 0 0 1-8 0" {...commonProps(0.6, 1.0)} />
      </svg>
    );
  }

  if (type === 'bed') {
    return (
      <svg className="h-8 w-8 text-cyan transition-colors duration-300 group-hover:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d="M2 4v16" {...commonProps(0.6)} />
        <motion.path d="M2 8h18a2 2 0 0 1 2 2v10" {...commonProps(1.0, 0.2)} />
        <motion.path d="M2 17h20" {...commonProps(0.4, 0.8)} />
        <motion.path d="M6 8v9" {...commonProps(0.4, 1.0)} />
      </svg>
    );
  }

  return null;
}
