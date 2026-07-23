import { motion } from 'framer-motion';

export function Scene2() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ scale: 1.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background layer */}
      <motion.div className="absolute inset-0 bg-accent opacity-20" />
      <motion.div className="absolute inset-0 pattern-dots" />

      {/* Colorful letter tiles scattered */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/colorful_letter_tiles.png`}
        className="absolute inset-0 w-[120vw] h-[120vh] object-cover mix-blend-normal opacity-80"
        initial={{ rotate: -10, scale: 1.2 }}
        animate={{ rotate: 5, scale: 1.05 }}
        transition={{ duration: 4, ease: 'linear' }}
      />
      
      {/* Central UI/Board mockup representation */}
      <motion.div 
        className="absolute w-[50vw] h-[60vh] bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-4 border-white flex flex-col items-center justify-center overflow-hidden"
        initial={{ y: '30vh', opacity: 0, rotateX: 45 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.2 }}
        style={{ transformPerspective: 1000 }}
      >
        <div className="flex gap-[1vw] mb-[4vh]">
          {['S', 'P', 'E', 'L', 'L'].map((letter, i) => (
            <motion.div
              key={i}
              className="w-[6vw] h-[6vw] bg-primary rounded-xl flex items-center justify-center shadow-lg border-b-4 border-orange-500"
              initial={{ y: -50, opacity: 0, scale: 0 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + (i * 0.1), type: 'spring', stiffness: 300, damping: 15 }}
            >
              <span className="font-display text-[4vw] font-bold text-white text-shadow-strong">{letter}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-secondary px-[4vw] py-[2vh] rounded-full shadow-lg border-b-4 border-red-700"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 250, damping: 15 }}
        >
          <span className="font-display text-[4vw] font-bold text-white tracking-wider">FAST!</span>
        </motion.div>

        <motion.h3
          className="font-display text-[6vw] font-black text-accent text-shadow-colored mt-[4vh]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, type: 'spring' }}
        >
          WIN BIG!
        </motion.h3>
      </motion.div>

      {/* Decorative bursts */}
      <motion.div 
        className="absolute w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2vw] h-[2vw] rounded-full bg-primary"
            style={{
              left: `${20 + Math.random() * 60}vw`,
              top: `${20 + Math.random() * 60}vh`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 0], y: -100 }}
            transition={{ delay: 1.5 + (i * 0.2), duration: 1 }}
          />
        ))}
      </motion.div>

    </motion.div>
  );
}
