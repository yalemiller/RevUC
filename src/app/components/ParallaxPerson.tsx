import { useMemo } from 'react';
import imgChest1 from '../../assets/30a91495dceb6d7fc18038e42fb8026c7916a513.png';

/**
 * ParallaxPerson - ONE person image as a fixed overlay spanning scenes 2-4.
 * 
 * The person is JUST the image. Food blocks are a separate fixed overlay
 * (FixedFoodBlocks) that happens to align with the stomach area.
 * 
 * Scene 2: Head + torso visible
 * Scene 2→3: Parallax (person scrolls at 0.5x background speed)
 * Scene 3-4: Person FIXED, stomach aligned with food blocks position
 * After scene 4: Person fades out, food blocks persist
 * 
 * TUNING GUIDE:
 * - widthVw: person size (affects height via aspect ratio)
 * - leftVw: horizontal position on screen
 * - startTopVh: where person top is at scene 2 (negative = head above viewport)
 * - parallaxRate: 0.5 = person moves at half background speed
 * 
 * The person's stomach must align with FOOD_BLOCKS_POSITION in FixedFoodBlocks.
 * Stomach screen position = (startTopVh - parallaxRate*100) + 0.43 * imageHeightVh
 * At current values: -21 - 50 + 0.43*235 ≈ -71 + 101 = 30vh ✓
 */
const PERSON_CONFIG = {
  widthVw: 35,
  leftVw: 63,
  startTopVh: -21,
  parallaxRate: 0.5,
};

export function ParallaxPerson({ scrollProgress }) {
  const personTop = useMemo(() => {
    if (scrollProgress <= 1) {
      return PERSON_CONFIG.startTopVh;
    } else if (scrollProgress <= 2) {
      // Scene 2→3: parallax at 0.5x
      const delta = scrollProgress - 1;
      return PERSON_CONFIG.startTopVh - delta * 100 * PERSON_CONFIG.parallaxRate;
    } else {
      // Scene 3→4+: person FIXED
      return PERSON_CONFIG.startTopVh - 100 * PERSON_CONFIG.parallaxRate;
    }
  }, [scrollProgress]);

  const opacity = useMemo(() => {
    if (scrollProgress < 0.7) return 0;
    if (scrollProgress < 1) return (scrollProgress - 0.7) / 0.3;
    if (scrollProgress <= 3.3) return 1;
    if (scrollProgress < 3.8) return 1 - (scrollProgress - 3.3) / 0.5;
    return 0;
  }, [scrollProgress]);

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: `${personTop}vh`,
        left: `${PERSON_CONFIG.leftVw}vw`,
        width: `${PERSON_CONFIG.widthVw}vw`,
        opacity,
        zIndex: 4,
        pointerEvents: 'none',
      }}
    >
      <img
        src={imgChest1}
        alt="Person illustration"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
}
