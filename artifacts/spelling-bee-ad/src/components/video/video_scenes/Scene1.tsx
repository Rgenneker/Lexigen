import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1400);
    const t2 = setTimeout(() => setPhase(2), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center overflow-hidden bg-primary"
      initial={{ x: '100vw' }}
      animate={{ x: 0 }}
      exit={{ x: '-100vw' }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Full-bleed photo collage background — 2×3 portrait grid */}
      <motion.div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-[1.5vw] p-[1.5vw] opacity-35 mix-blend-luminosity">
        {[
          'spelling-bee-1.jpg',
          'spelling-bee-2.jpg',
          'spelling-bee-3.jpg',
          'spelling-bee-1.jpg',
          'spelling-bee-2.jpg',
          'spelling-bee-3.jpg',
        ].map((img, i) => (
          <motion.img
            key={i}
            src={`${import.meta.env.BASE_URL}images/${img}`}
            className="w-full h-full object-cover rounded-2xl"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: i * 0.08 }}
          />
        ))}
      </motion.div>

      {/* Bottom gradient overlay so text is legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />

      {/* Featured framed photo — upper-center */}
      <motion.div
        className="relative z-10 mt-[8vh] w-[72vw] h-[40vh] bg-white p-[2vw] rounded-3xl shadow-2xl"
        style={{ rotate: phase === 1 ? -3 : 2, transformOrigin: 'center' }}
        initial={{ y: '-60vh', rotate: 15, opacity: 0 }}
        animate={{
          y: 0,
          rotate: phase === 1 ? -3 : 2,
          scale: phase === 1 ? 1.04 : 1,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 140, damping: 14 }}
      >
        <motion.img
          src={`${import.meta.env.BASE_URL}images/${
            phase === 0
              ? 'spelling-bee-2.jpg'
              : phase === 1
              ? 'spelling-bee-1.jpg'
              : 'spelling-bee-3.jpg'
          }`}
          className="w-full h-full object-cover rounded-2xl"
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        {/* tape strip */}
        <div className="absolute -top-[3vh] left-[30vw] w-[14vw] h-[4vh] bg-white/55 backdrop-blur-sm -rotate-6 shadow-sm rounded-sm" />
      </motion.div>

      {/* Text block — lower, stacked */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center pb-[8vh] px-[8vw] text-center">
        <motion.h2
          className="font-display text-[8vw] leading-[1.15] font-bold text-white text-shadow-strong"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          COMPETE IN THE
        </motion.h2>

        <motion.div
          className="bg-accent px-[5vw] py-[1.5vh] rounded-2xl mt-[2vh] shadow-xl inline-block"
          style={{ rotate: -2 }}
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: -2 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <h2 className="font-display text-[10vw] leading-none font-bold text-white text-shadow-strong">
            ULTIMATE
          </h2>
        </motion.div>

        <motion.h2
          className="font-display text-[8vw] leading-[1.15] font-bold text-secondary text-shadow-white mt-[2vh]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, type: 'spring' }}
        >
          SPELLING CHALLENGE
        </motion.h2>
      </div>
    </motion.div>
  );
}
