import { motion } from 'framer-motion';

export function Scene0() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background decorations */}
      <motion.div 
        className="absolute inset-0 bg-primary opacity-20"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: 'linear' }}
      />
      
      {/* Exciting Kid Image */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/excited_kid.png`}
        className="absolute -right-[10vw] bottom-0 h-[80vh] object-contain float-anim z-10 drop-shadow-2xl"
        initial={{ y: '100vh', rotate: 10 }}
        animate={{ y: 0, rotate: -5 }}
        exit={{ y: '100vh', rotate: 20, transition: { duration: 0.6 } }}
        transition={{ 
          y: { type: 'spring', stiffness: 200, damping: 20, delay: 0.2 },
          rotate: { type: 'spring', stiffness: 100, damping: 10, delay: 0.3 }
        }}
      />

      <div className="absolute left-[10vw] top-[30vh] max-w-[50vw] z-20">
        <motion.h1
          className="font-display text-[7vw] leading-[1.1] font-bold text-text-primary text-shadow-white"
          initial="hidden"
          animate="visible"
          exit={{ x: '-20vw', opacity: 0, transition: { duration: 0.5 } }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {['Think', 'you\'re', 'a', 'SPELLING', 'CHAMPION?'].map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[2vw] ${i === 3 ? 'text-accent text-shadow-strong' : ''} ${i === 4 ? 'text-secondary text-shadow-strong' : ''}`}
              variants={{
                hidden: { y: '1em', opacity: 0, rotate: i % 2 === 0 ? 5 : -5 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  rotate: 0,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* Floating abstract shapes */}
      <motion.div
        className="absolute left-[5vw] top-[15vh] w-[8vw] h-[8vw] bg-accent rounded-full opacity-60 mix-blend-multiply"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', delay: 0.5 }}
      />
      <motion.div
        className="absolute left-[40vw] bottom-[20vh] w-[12vw] h-[12vw] bg-secondary rounded-lg rotate-12 opacity-40 mix-blend-multiply"
        initial={{ scale: 0, opacity: 0, rotate: -45 }}
        animate={{ scale: 1, opacity: 0.4, rotate: 12 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', delay: 0.7 }}
      />
    </motion.div>
  );
}
