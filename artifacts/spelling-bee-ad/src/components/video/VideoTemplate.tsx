import { useEffect, useRef } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';

import { Scene0 } from './video_scenes/Scene0';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';

export const SCENE_DURATIONS: Record<string, number> = {
  scene0: 3000,
  scene1: 4000,
  scene2: 4000,
  scene3: 4000,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, ms] of Object.entries(SCENE_DURATIONS)) {
    out[key] = cumulativeMs / 1000;
    cumulativeMs += ms;
  }
  return out;
})();

const AUDIO_SEEK_EPSILON_SEC = 0.18;

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  scene0: Scene0,
  scene1: Scene1,
  scene2: Scene2,
  scene3: Scene3,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
    if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) {
      audio.currentTime = targetTime;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted]);

  return (
    <>
      <div
        className="w-full h-screen overflow-hidden relative"
        style={{ backgroundColor: 'var(--color-bg-light)' }}
      >
        {/* Persistent Background Elements outside AnimatePresence */}
        <motion.div
          className="absolute w-[60vw] h-[60vw] rounded-full blur-[80px] opacity-40 pointer-events-none"
          animate={{
            background: sceneIndex === 0
              ? 'radial-gradient(circle, var(--color-primary), transparent)'
              : sceneIndex === 1
              ? 'radial-gradient(circle, var(--color-accent), transparent)'
              : sceneIndex === 2
              ? 'radial-gradient(circle, var(--color-secondary), transparent)'
              : 'radial-gradient(circle, var(--color-primary), transparent)',
            x: sceneIndex === 0 ? '-10vw' : sceneIndex === 1 ? '50vw' : sceneIndex === 2 ? '0vw' : '40vw',
            y: sceneIndex === 0 ? '-10vw' : sceneIndex === 1 ? '20vw' : sceneIndex === 2 ? '40vw' : '-20vw',
            scale: sceneIndex === 3 ? 1.5 : 1,
          }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        />
        <motion.div
          className="absolute w-[40vw] h-[40vw] rounded-full blur-[60px] opacity-30 pointer-events-none"
          animate={{
            background: sceneIndex === 0
              ? 'radial-gradient(circle, var(--color-accent), transparent)'
              : sceneIndex === 1
              ? 'radial-gradient(circle, var(--color-secondary), transparent)'
              : sceneIndex === 2
              ? 'radial-gradient(circle, var(--color-primary), transparent)'
              : 'radial-gradient(circle, var(--color-accent), transparent)',
            x: sceneIndex === 0 ? '60vw' : sceneIndex === 1 ? '-20vw' : sceneIndex === 2 ? '50vw' : '10vw',
            y: sceneIndex === 0 ? '40vw' : sceneIndex === 1 ? '-10vw' : sceneIndex === 2 ? '-10vw' : '50vw',
          }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        />

        <AnimatePresence mode="sync">
          {SceneComponent && <SceneComponent key={currentSceneKey} />}
        </AnimatePresence>
      </div>

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
        preload="auto"
        autoPlay
        muted={muted}
      />
    </>
  );
}
