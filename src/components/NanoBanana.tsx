"use client";
import { motion, useScroll, useTransform } from 'framer-motion';

export default function NanoBanana() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 5000], [0, 360]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-8 right-8 z-50 flex flex-col items-center justify-center gap-2 group"
    >
      <motion.div 
        style={{ rotate }}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_20px_rgba(250,204,21,0.3)] group-hover:shadow-[0_0_30px_rgba(250,204,21,0.6)] flex items-center justify-center text-2xl md:text-3xl border border-yellow-300 backdrop-blur-md cursor-pointer hover:scale-110 transition-all duration-300"
      >
        🍌
      </motion.div>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] uppercase font-bold tracking-widest text-yellow-500/80 bg-black/80 px-3 py-1.5 rounded-full backdrop-blur-md border border-yellow-500/20">
        Nano Banana
      </span>
    </motion.div>
  );
}
