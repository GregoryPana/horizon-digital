import React from 'react';
import { motion } from 'framer-motion';

interface ReactiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function ReactiveButton({ 
  children, 
  onClick, 
  className = "", 
  variant = 'primary' 
}: ReactiveButtonProps) {
  const baseStyles = "relative overflow-hidden group font-syne uppercase tracking-widest rounded-full transition-all duration-300";
  const variants = {
    primary: "bg-teal text-black shadow-lg hover:shadow-teal/20",
    secondary: "bg-transparent border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98, y: 0 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">{children}</div>
      
      {variant === 'primary' && (
        <>
          {/* Glossy Texture */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 texture-noise opacity-10" />
        </>
      )}
    </motion.button>
  );
}
