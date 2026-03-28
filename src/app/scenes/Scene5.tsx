import { useMemo } from 'react';
import imgReceipt1 from "figma:asset/9c3dc63f059e5edf6e5cd9ea26c689682b0147c6.png";
import { SceneProgressIndicator } from '../components/SceneProgressIndicator';

export function Scene5({ currentScene = 4, totalScenes = 8, scrollProgress = 4 }) {
  // Text opacity based on scroll progress - smooth fade in/out
  // Scene 5 = scrollProgress 4. Fade in from 3.5→4, fade out from 4.5→5
  const textOpacity = useMemo(() => {
    if (scrollProgress < 3.5) return 0;
    if (scrollProgress < 4) return (scrollProgress - 3.5) / 0.5;
    if (scrollProgress <= 4.5) return 1;
    if (scrollProgress < 5) return 1 - (scrollProgress - 4.5) / 0.5;
    return 0;
  }, [scrollProgress]);

  return (
    <div className="bg-white relative size-full" data-name="Scene 5">
      {/* Light blue background */}
      <div className="absolute bg-[#c7e5f1] inset-0" />
      
      {/* Receipt image */}
      <div 
        className="absolute"
        style={{
          right: '0vw',
          top: '-2.4vh',
          width: '33vw',
          height: '100.3vh',
        }}
        data-name="Receipt 1"
      >
        <img 
          alt="Receipt showing food items" 
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
          src={imgReceipt1} 
        />
      </div>
      
      {/* Main text - fades based on scroll */}
      <p 
        className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic text-[#0f707f] text-center"
        style={{
          left: '27vw',
          top: '33vh',
          width: '38.8vw',
          fontSize: 'clamp(22px, 2.9vw, 55px)',
          opacity: textOpacity,
          transition: 'opacity 0.15s ease',
        }}
      >
        Today these items cost
      </p>
      
      {/* Price - fades based on scroll */}
      <p 
        className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic text-[#0f707f]"
        style={{
          left: '11vw',
          top: '40vh',
          width: '43.7vw',
          fontSize: 'clamp(60px, 10.4vw, 200px)',
          opacity: textOpacity,
          transition: 'opacity 0.15s ease',
        }}
      >
        $132.54
      </p>

      {/* Scene progress indicator */}
      <SceneProgressIndicator 
        totalScenes={totalScenes} 
        currentScene={currentScene} 
      />
    </div>
  );
}
