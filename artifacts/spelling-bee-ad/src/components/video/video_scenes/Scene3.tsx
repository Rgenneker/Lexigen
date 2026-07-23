import { motion } from 'framer-motion';

export function Scene3() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-bg-light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Rotating star background */}
      <motion.div
        className="absolute w-[180vw] h-[180vw] opacity-10"
        style={{
          backgroundImage:
            'repeating-conic-gradient(var(--color-primary) 0% 10%, transparent 10% 20%)',
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      />

      {/* Pulsing ring */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] rounded-full border-[2vw] border-primary/30"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* Big decorative accent blob */}
      <motion.div
        className="absolute w-[50vw] h-[50vw] bg-accent rounded-full opacity-15 blur-3xl"
        initial={{ x: '50vw', rotate: 45 }}
        animate={{ x: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.5 }}
      />

      {/* Logo */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/lexigenz_logo.png`}
        className="relative z-10 w-[72vw] object-contain drop-shadow-xl"
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.6 }}
      />

      {/* CTA button */}
      <motion.div
        className="relative z-10 bg-accent px-[8vw] py-[3vh] rounded-full shadow-[0_8px_0_#008CBA] mt-[5vh]"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 180, damping: 14 }}
      >
        <h2 className="font-display text-[7.5vw] leading-none font-bold text-white text-shadow-strong">
          PLAY THE SPELLING BEE!
        </h2>
      </motion.div>

      {/* URL */}
      <motion.p
        className="relative z-10 font-body font-bold text-[5vw] text-text-secondary mt-[3vh] tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        lexigenz.com
      </motion.p>

      {/* Confetti */}
      <motion.div className="absolute inset-0 pointer-events-none z-20">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-sm ${i % 3 === 0 ? 'bg-secondary' : i % 3 === 1 ? 'bg-primary' : 'bg-accent'}`}
            style={{
              width: `${1.5 + (i % 3) * 0.5}vw`,
              height: `${3 + (i % 4) * 0.5}vw`,
              left: '50%',
              top: '40%',
            }}
            initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{
              scale: [0, 1, 0.6],
              x: `${(((i * 37) % 100) - 50) * 1.6}vw`,
              y: `${(((i * 53) % 100) - 50) * 1.4}vh`,
              rotate: ((i * 71) % 360),
            }}
            transition={{ delay: 1.1, duration: 1.6, ease: 'easeOut' }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
