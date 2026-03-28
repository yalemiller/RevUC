import { ReactNode } from 'react';

export function SceneWrapper({ children, sceneNumber }) {
  return (
    <section
      className="h-screen w-screen snap-start snap-always relative overflow-hidden"
      data-scene={sceneNumber}
    >
      {children}
    </section>
  );
}