import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-primary"
      initial={{ x: '100vw' }}
      animate={{ x: 0 }}
      exit={{ x: '-100vw' }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Dynamic background collage */}
      <motion.div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[1vw] p-[1vw] opacity-40 mix-blend-luminosity">
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/spelling-bee-1.jpg`} 
          className="w-full h-full object-cover rounded-xl"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/spelling-bee-2.jpg`} 
          className="w-full h-full object-cover rounded-xl"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/spelling-bee-3.jpg`} 
          className="w-full h-full object-cover rounded-xl col-span-2"
          initial={{ scale: 1.2, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
        />
      </motion.div>

      {/* Featured Image Frame */}
      <motion.div 
        className="absolute w-[45vw] h-[55vh] right-[5vw] top-[20vh] bg-white p-[1vw] rounded-2xl shadow-2xl rotate-3"
        initial={{ y: '50vh', rotate: 15, opacity: 0 }}
        animate={
          phase === 0 ? { y: 0, rotate: 3, opacity: 1 } :
          phase === 1 ? { y: '-2vh', rotate: -2, scale: 1.05 } :
          { y: 0, rotate: 1, scale: 1 }
        }
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      >
        <img 
          src={
            phase === 0 ? `${import.meta.env.BASE_URL}images/spelling-bee-2.jpg` :
            phase === 1 ? `${import.meta.env.BASE_URL}images/spelling-bee-1.jpg` :
            `${import.meta.env.BASE_URL}images/spelling-bee-3.jpg`
          }
          className="w-full h-full object-cover rounded-xl"
        />
        {/* Cute tape effect */}
        <div className="absolute -top-[2vh] left-[20vw] w-[8vw] h-[4vh] bg-white/50 backdrop-blur-sm -rotate-6 shadow-sm" />
      </motion.div>

      <div className="absolute left-[5vw] top-[30vh] max-w-[45vw] z-20">
        <motion.h2
          className="font-display text-[6vw] leading-[1.1] font-bold text-white text-shadow-strong"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          COMPETE IN THE
        </motion.h2>
        <motion.div
          className="bg-accent px-[2vw] py-[1vh] rounded-xl mt-[2vh] inline-block shadow-xl rotate-[-2deg]"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: -2 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <h2 className="font-display text-[7vw] leading-none font-bold text-white text-shadow-strong">
            ULTIMATE
          </h2>
        </motion.div>
        <motion.h2
          className="font-display text-[6vw] leading-[1.1] font-bold text-secondary text-shadow-white mt-[2vh] ml-[2vw]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, type: 'spring' }}
        >
          SPELLING BEE!
        </motion.h2>
      </div>
    </motion.div>
  );
}
