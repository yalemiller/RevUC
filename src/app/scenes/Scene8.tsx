import { SceneProgressIndicator } from '../components/SceneProgressIndicator';

// Placeholder for Scene 8
export function Scene8({ currentScene = 7, totalScenes = 8 }) {
  return (
    <div className="bg-[#ff9a9e] relative size-full flex items-center justify-center" data-name="Scene 8">
      <h1 className="text-6xl font-bold text-white">Scene 8</h1>
      <p className="absolute bottom-20 text-2xl text-white opacity-70">Placeholder - Coming Soon</p>
      <SceneProgressIndicator totalScenes={totalScenes} currentScene={currentScene} />
    </div>
  );
}