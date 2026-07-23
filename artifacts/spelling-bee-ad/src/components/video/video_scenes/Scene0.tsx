import { motion } from 'framer-motion';

export function Scene0() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center overflow-hidden"
      initial={{ clipPath: 'circle(0% at 50% 30%)' }}
      animate={{ clipPath: 'circle(150% at 50% 30%)' }}
      exit={{ clipPath: 'circle(0% at 50% 30%)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Soft warm background */}
      <motion.div
        className="absolute inset-0 bg-bg-light"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: 'linear' }}
      />

      {/* Big decorative circle top-right */}
      <motion.div
        className="absolute -top-[15vw] -right-[15vw] w-[60vw] h-[60vw] rounded-full bg-primary opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.1 }}
      />
      <motion.div
        className="absolute top-[5vw] -left-[10vw] w-[35vw] h-[35vw] rounded-full bg-accent opacity-15"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.3 }}
      />

      {/* Title block — top, centred */}
      <div className="relative z-20 flex flex-col items-center pt-[14vh] px-[8vw] text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: '-10vh', transition: { duration: 0.4 } }}
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
        >
          {[
            { word: 'Think', cls: 'text-text-primary' },
            { word: "you're", cls: 'text-text-primary' },
            { word: 'a', cls: 'text-text-primary' },
            { word: 'SPELLING', cls: 'text-accent text-shadow-strong' },
            { word: 'CHAMPION?', cls: 'text-secondary text-shadow-strong' },
          ].map(({ word, cls }, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[2vw] font-display font-bold leading-tight text-[10vw] text-shadow-white ${cls}`}
              variants={{
                hidden: { y: '1em', opacity: 0, rotate: i % 2 === 0 ? 6 : -6 },
                visible: {
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                  transition: { type: 'spring', stiffness: 300, damping: 18 },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Floating accent badge */}
      <motion.div
        className="relative z-20 mt-[4vh] bg-primary rounded-full px-[6vw] py-[2vh] shadow-xl"
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: -3 }}
        exit={{ scale: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.7 }}
      >
        <span className="font-display font-bold text-[6vw] text-white text-shadow-strong">
          🐝 Prove it!
        </span>
      </motion.div>

      {/* Kid image — bottom, centred */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/excited_kid.png`}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[50vh] object-contain float-anim z-10 drop-shadow-2xl"
        initial={{ y: '60vh', rotate: 8 }}
        animate={{ y: 0, rotate: -4 }}
        exit={{ y: '60vh', rotate: 20, transition: { duration: 0.5 } }}
        transition={{
          y: { type: 'spring', stiffness: 180, damping: 20, delay: 0.25 },
          rotate: { type: 'spring', stiffness: 100, damping: 10, delay: 0.35 },
        }}
      />

      {/* Small decorative shapes */}
      <motion.div
        className="absolute left-[8vw] top-[55vh] w-[10vw] h-[10vw] bg-accent rounded-full opacity-50 mix-blend-multiply"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.5 }}
      />
      <motion.div
        className="absolute right-[6vw] top-[60vh] w-[14vw] h-[14vw] bg-secondary rounded-lg rotate-12 opacity-40 mix-blend-multiply"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 12 }}
        transition={{ type: 'spring', delay: 0.65 }}
      />
    </motion.div>
  );
}
