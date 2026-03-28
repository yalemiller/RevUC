import { useMemo } from 'react';
import imgBag1 from "figma:asset/161e525cc32e6c36fdb23b7da795dc9faee62f01.png";
import { SceneProgressIndicator } from '../components/SceneProgressIndicator';

export function Scene6({ currentScene = 5, totalScenes = 8, scrollProgress = 5 }) {
  // Text opacity - smooth fade in/out based on scroll progress
  // Scene 6 = scrollProgress 5. Fade in from 4.5→5, fade out from 5.5→6
  const textOpacity = useMemo(() => {
    if (scrollProgress < 4.5) return 0;
    if (scrollProgress < 5) return (scrollProgress - 4.5) / 0.5;
    if (scrollProgress <= 5.5) return 1;
    if (scrollProgress < 6) return 1 - (scrollProgress - 5.5) / 0.5;
    return 0;
  }, [scrollProgress]);

  return (
    <div className="bg-[#c7e5f1] relative size-full" data-name="Scene 6">
      {/* Light blue background */}
      <div className="absolute bg-[#c7e5f1] inset-0" />
      
      {/* Grocery bag image - positioned to "catch" the food blocks */}
      <div 
        className="absolute"
        style={{
          right: '0vw',
          top: '18.5vh',
          width: '36vw',
          height: '65.5vh',
        }}
        data-name="Bag 1"
      >
        <img 
          alt="Grocery bag illustration" 
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
          src={imgBag1} 
        />
      </div>
      
      {/* Main text - top (fades) */}
      <p 
        className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic text-[#0f707f]"
        style={{
          left: '9.4vw',
          top: '20.7vh',
          width: '38.8vw',
          fontSize: 'clamp(22px, 2.9vw, 55px)',
          opacity: textOpacity,
          transition: 'opacity 0.15s ease',
        }}
      >
        In ten years, adjusted for inflation that could cost
      </p>
      
      {/* Price (fades) */}
      <p 
        className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic text-[#0f707f]"
        style={{
          left: '9.4vw',
          top: '35.7vh',
          width: '47.2vw',
          fontSize: 'clamp(60px, 10.4vw, 200px)',
          opacity: textOpacity,
          transition: 'opacity 0.15s ease',
        }}
      >
        $250.54
      </p>
      
      {/* Increase text (fades) */}
      <p 
        className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic text-[#0f707f]"
        style={{
          left: '9.4vw',
          top: '58.6vh',
          width: '38.8vw',
          fontSize: 'clamp(22px, 2.9vw, 55px)',
          opacity: textOpacity,
          transition: 'opacity 0.15s ease',
        }}
      >
        125% increase
      </p>
      
      {/* Bottom turquoise bar */}
      <div 
        className="absolute bg-[#2ea3bd]"
        style={{
          left: '-5.5vw',
          top: '84.7vh',
          width: '110vw',
          height: '13.3vh',
        }}
      />

      {/* Scene progress indicator */}
      <SceneProgressIndicator 
        totalScenes={totalScenes} 
        currentScene={currentScene} 
      />
    </div>
  );
}
