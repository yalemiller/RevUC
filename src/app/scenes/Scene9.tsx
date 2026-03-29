import { SceneProgressIndicator } from '../components/SceneProgressIndicator';
import imgChest1 from '../../assets/30a91495dceb6d7fc18038e42fb8026c7916a513.png';

export function Scene9({ currentScene = 8, totalScenes = 9 }) {
  return (
    <div className="bg-white relative size-full overflow-hidden" data-name="Scene 9">
      <div className="absolute inset-0 bg-[#2ea3bd]" />

      <div className="absolute flex h-[3010px] items-center justify-center left-[99px] top-[-2056px] w-[797px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[3010px] relative w-[797px]" data-name="chest 1">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgChest1}
            />
          </div>
        </div>
      </div>

      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold h-[70px] leading-[normal] left-[1332.5px] not-italic text-[55px] text-center text-white top-[464px] w-[523px]">
        Thank You!
      </p>

      <SceneProgressIndicator totalScenes={totalScenes} currentScene={currentScene} />
    </div>
  );
}
