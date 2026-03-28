import { useEffect, useState, useRef } from 'react';

export function useScrollSnap({ totalScenes, onSceneChange }) {
  const [currentScene, setCurrentScene] = useState(0);
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const onSceneChangeRef = useRef(onSceneChange);

  useEffect(() => {
    onSceneChangeRef.current = onSceneChange;
  }, [onSceneChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Force a clean initial position so reloads/HMR never start mid-story.
    container.scrollTo({ top: 0, behavior: 'auto' });
    setCurrentScene(0);
    onSceneChangeRef.current?.(0);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = container.scrollTop;
      const sceneHeight = window.innerHeight;
      const newScene = Math.round(scrollPosition / sceneHeight);

      if (newScene !== currentScene && newScene >= 0 && newScene < totalScenes) {
        setCurrentScene(newScene);
        onSceneChangeRef.current?.(newScene);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentScene, totalScenes]);

  const scrollToScene = (sceneIndex) => {
    const container = containerRef.current;
    if (!container) return;

    isScrollingRef.current = true;
    const targetScroll = sceneIndex * window.innerHeight;

    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  return {
    containerRef,
    currentScene,
    scrollToScene,
  };
}