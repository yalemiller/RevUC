import { useMemo } from 'react';
import { motion } from 'motion/react';
import imgChest1 from '../../assets/30a91495dceb6d7fc18038e42fb8026c7916a513.png';

/**
 * ParallaxPerson79 - ONE person image as a fixed overlay spanning scenes 7-9.
 * 
 * Scene 7 (scrollProgress 6-7): Parallax entrance at 0.93x rate, left side
 * Scene 8 (scrollProgress 7-8): Person FIXED, left side (cards scroll horizontally)
 * Scene 9 (scrollProgress 8-9): Smooth crop transition to feet view, left side
 * 
 * TUNING GUIDE:
 * - widthVw: person size (affects height via aspect ratio)
 * - leftVw: horizontal position on screen
 * - startTopVh: where person top is at scene 7 (negative = head above viewport)
 * - offsetUpPx: additional upward nudge in pixels
 * - parallaxRate: 0.93 = person moves at 93% of background speed during Scene 7→8
 * - feetOffsetVh: additional downward movement to show feet in Scene 9
 */
const PERSON2_CONFIG = {
  widthVw: 44,
  leftVw: 2, // mirrored from right side (~57vw) — tweak this value to move left/right
  startTopVh: -18,
  offsetUpPx: -150,
  parallaxRate: 0.93,
  feetOffsetVh: 93,
};

const BELLY_ANCHOR = {
  xPct: 0.57,
  yPct: 0.43,
};

interface ParallaxPerson79Props {
  scrollProgress: number;
  foods?: string[];
  currentFoodIndex?: number;
}

export function ParallaxPerson79({ scrollProgress, foods = [], currentFoodIndex = -1 }: ParallaxPerson79Props) {
  const personTop = useMemo(() => {
    const bellyPos = PERSON2_CONFIG.startTopVh - 100 * PERSON2_CONFIG.parallaxRate;
    // Move image upward to reveal lower body (feet) in viewport.
    const feetPos = bellyPos - PERSON2_CONFIG.feetOffsetVh;

    if (scrollProgress < 6) {
      // Before Scene 7
      return -300;
    } else if (scrollProgress <= 7) {
      // Scene 7: parallax effect, entrance — move UP
      const delta = scrollProgress - 6;
      return PERSON2_CONFIG.startTopVh - delta * 100 * PERSON2_CONFIG.parallaxRate;
    } else if (scrollProgress <= 8) {
      // Scene 8 -> 9: continue travel from belly to feet.
      // Important: in a 9-scene layout, progress reaches 8 (not 9) at the top of Scene 9.
      const delta = Math.max(0, Math.min(1, scrollProgress - 7));
      return bellyPos + (feetPos - bellyPos) * delta;
    } else if (scrollProgress > 9) {
      return feetPos;
    } else {
      return feetPos;
    }
  }, [scrollProgress]);

  const lateFoods = useMemo(() => {
    if (foods.length > 0) return foods.slice(0, 4);
    return ['salmon', 'almonds', 'turkey', 'coffee'];
  }, [foods]);

  const foodsOpacity = useMemo(() => {
    if (lateFoods.length === 0) return 0;
    if (scrollProgress < 6.05) return 0;
    if (scrollProgress < 6.25) return (scrollProgress - 6.05) / 0.2;
    if (scrollProgress <= 8) return 1;
    return 0;
  }, [scrollProgress, lateFoods.length]);

  const opacity = useMemo(() => {
    // Visible only during scenes 7-9
    if (scrollProgress >= 6 && scrollProgress <= 9) return 1;
    return 0;
  }, [scrollProgress]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        height: '100vh',
        overflow: 'hidden',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          left: `${PERSON2_CONFIG.leftVw}vw`,
          width: `${PERSON2_CONFIG.widthVw}vw`,
          opacity,
        }}
        animate={{ top: `calc(${personTop}vh - ${PERSON2_CONFIG.offsetUpPx}px)` }}
        transition={{ type: 'spring', stiffness: 130, damping: 20, mass: 0.8 }}
      >
        <img
          src={imgChest1}
          alt="Person illustration"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {foodsOpacity > 0 ? (
          <div
            style={{
              position: 'absolute',
              left: `${BELLY_ANCHOR.xPct * 100}%`,
              top: `${BELLY_ANCHOR.yPct * 100}%`,
              transform: 'translate(-35%, -10%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.9vh',
              width: '30%',
              opacity: foodsOpacity,
              pointerEvents: 'none',
            }}
          >
            {lateFoods.map((food, index) => {
              const isActive = currentFoodIndex === -1 ? true : index === currentFoodIndex;
              return (
                <motion.div
                  key={`person79-food-${food}-${index}`}
                  initial={{ opacity: 0, y: 10, scale: 0.94 }}
                  animate={{
                    opacity: isActive ? 1 : 0.56,
                    y: 0,
                    scale: isActive ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  style={{
                    backgroundColor: '#47c6da',
                    borderRadius: 'clamp(8px, 0.9vw, 16px)',
                    minHeight: '5.8vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 18px rgba(0, 0, 0, 0.18)',
                    padding: '0 0.7vw',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter:Bold',sans-serif",
                      fontWeight: 'bold',
                      color: '#ffffff',
                      fontSize: 'clamp(12px, 0.95vw, 20px)',
                      textTransform: 'capitalize',
                      margin: 0,
                      lineHeight: 'normal',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {food.toLowerCase()}
                  </p>
                </motion.div>
              );
            })}
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}
