import { motion } from 'framer-motion';

export function Scene2() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ scale: 1.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background */}
      <motion.div className="absolute inset-0 bg-accent opacity-20" />
      <motion.div className="absolute inset-0 pattern-dots" />

      {/* Colorful letter tiles full-bleed */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/colorful_letter_tiles.png`}
        className="absolute inset-0 w-full h-full object-cover mix-blend-normal opacity-70"
        initial={{ rotate: -8, scale: 1.25 }}
        animate={{ rotate: 4, scale: 1.08 }}
        transition={{ duration: 4, ease: 'linear' }}
      />

      {/* Card — portrait: wide, not as tall, centred */}
      <motion.div
        className="relative z-10 w-[84vw] bg-white/92 backdrop-blur-md rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-4 border-white flex flex-col items-center justify-center py-[5vh] px-[4vw] gap-[4vh]"
        initial={{ y: '40vh', opacity: 0, rotateX: 35 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.2 }}
        style={{ transformPerspective: 1000 }}
      >
        {/* S-P-E-L-L tiles */}
        <div className="flex gap-[2.5vw]">
          {['S', 'P', 'E', 'L', 'L'].map((letter, i) => (
            <motion.div
              key={i}
              className="w-[12vw] h-[12vw] bg-primary rounded-xl flex items-center justify-center shadow-lg border-b-4 border-orange-500"
              initial={{ y: -60, opacity: 0, scale: 0 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 300, damping: 15 }}
            >
              <span className="font-display text-[7vw] font-bold text-white text-shadow-strong">
                {letter}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-secondary px-[8vw] py-[2vh] rounded-full shadow-lg border-b-4 border-red-700"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 250, damping: 15 }}
        >
          <span className="font-display text-[7vw] font-bold text-white tracking-wider">
            FAST!
          </span>
        </motion.div>

        <motion.h3
          className="font-display text-[11vw] font-black text-accent text-shadow-colored leading-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, type: 'spring' }}
        >
          WIN BIG!
        </motion.h3>
      </motion.div>

      {/* Burst dots */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[3vw] h-[3vw] rounded-full bg-primary"
            style={{
              left: `${10 + (i * 10) % 80}vw`,
              top: `${15 + (i * 13) % 70}vh`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2, 0], y: -80 }}
            transition={{ delay: 1.4 + i * 0.18, duration: 1.1 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
