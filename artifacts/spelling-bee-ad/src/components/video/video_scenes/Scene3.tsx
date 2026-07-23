import { motion } from 'framer-motion';

export function Scene3() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' }}
      animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div className="absolute inset-0 bg-bg-light" />

      {/* Sunburst background effect */}
      <motion.div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'repeating-conic-gradient(from 0deg, var(--color-primary) 0deg 15deg, transparent 15deg 30deg)',
          backgroundPosition: 'center',
          backgroundSize: '200% 200%'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      />

      {/* Trophy */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/trophy.png`}
        className="absolute left-[15vw] top-[20vh] h-[60vh] object-contain drop-shadow-2xl"
        initial={{ y: '50vh', scale: 0.5, rotate: -20, opacity: 0 }}
        animate={{ y: 0, scale: 1, rotate: -5, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.3 }}
      />

      {/* Bee Mascot */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/bee_mascot.png`}
        className="absolute right-[10vw] top-[15vh] h-[55vh] object-contain float-anim drop-shadow-2xl z-20"
        initial={{ x: '50vw', rotate: 45 }}
        animate={{ x: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.5 }}
      />

      <div className="absolute flex flex-col items-center justify-center z-30">
        <motion.img
          src={`${import.meta.env.BASE_URL}images/lexigenz_logo.png`}
          className="h-[25vh] object-contain drop-shadow-xl"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.8 }}
        />
        
        <motion.div
          className="bg-accent px-[4vw] py-[2vh] rounded-full shadow-[0_10px_0_#008CBA] mt-[2vh]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, type: 'spring' }}
        >
          <h2 className="font-display text-[5vw] leading-none font-bold text-white text-shadow-strong">
            PLAY THE SPELLING BEE!
          </h2>
        </motion.div>
      </div>

      {/* Confetti */}
      <motion.div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-[1.5vw] h-[3vw] ${i % 2 === 0 ? 'bg-secondary' : 'bg-primary'} rounded-sm`}
            style={{
              left: '50%',
              top: '50%',
            }}
            initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1, 0.5],
              x: (Math.random() - 0.5) * 80 + 'vw', 
              y: (Math.random() - 0.5) * 80 + 'vh',
              rotate: Math.random() * 360
            }}
            transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
