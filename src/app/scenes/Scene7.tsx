import { SceneProgressIndicator } from '../components/SceneProgressIndicator';

// Placeholder for Scene 7
export function Scene7({ currentScene = 6, totalScenes = 8 }) {
  return (
    <div className="bg-[#a8e6cf] relative size-full flex items-center justify-center" data-name="Scene 7">
      <h1 className="text-6xl font-bold text-[#2ea3bd]">Scene 7</h1>
      <p className="absolute bottom-20 text-2xl text-gray-600">Placeholder - Coming Soon</p>
      <SceneProgressIndicator totalScenes={totalScenes} currentScene={currentScene} />
    </div>
  );
}