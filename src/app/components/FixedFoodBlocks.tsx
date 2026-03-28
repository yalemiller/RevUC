import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * FixedFoodBlocks - ONE set of food blocks that persists from scene 3 through scene 6.
 * 
 * These blocks are at a FIXED screen position. They never move.
 * The world scrolls around them:
 * - Scenes 3-4: Person's stomach is aligned behind the blocks
 * - Scene 5: Receipt scrolls up, its itemized area aligns with blocks
 * - Scene 6: Bag scrolls up, its opening aligns with blocks
 * 
 * This position MUST match the person's stomach position in ParallaxPerson.
 * Person stomach screen Y ≈ personTop_scene3 + 43% * imageHeight
 * 
 * TUNING: Adjust these values AND the receipt/bag positions in Scene5/Scene6
 * to align everything. Also adjust ParallaxPerson PERSON_CONFIG if stomach misaligns.
 */
const FOOD_BLOCKS_POSITION = {
  topVh: 35,            // Vertical position on screen
  leftVw: 73.5,           // Horizontal position (aligns with person stomach)
  widthVw: 15,          // Width of the block column
  blockHeightVh: 9.5,   // Height of each block
  gapVh: 1.75,           // Gap between blocks
};

export function FixedFoodBlocks({ scrollProgress, foods = [], currentFoodIndex = -1 }) {
  // Visible from scene 3 (when foods start appearing) through scene 6
  // Fade in during scene 3, persist through scene 6, fade out after
  const opacity = useMemo(() => {
    // Don't show if no foods
    if (foods.length === 0) return 0;
    // Fade in: once foods exist (during scene 3), always visible
    if (scrollProgress < 1.8) return 0;
    if (scrollProgress < 2.1) return (scrollProgress - 1.8) / 0.3;
    if (scrollProgress <= 5.5) return 1;
    if (scrollProgress < 6) return 1 - (scrollProgress - 5.5) / 0.5;
    return 0;
  }, [scrollProgress, foods.length]);

  if (opacity <= 0 || foods.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: `${FOOD_BLOCKS_POSITION.topVh}vh`,
        left: `${FOOD_BLOCKS_POSITION.leftVw}vw`,
        width: `${FOOD_BLOCKS_POSITION.widthVw}vw`,
        display: 'flex',
        flexDirection: 'column',
        gap: `${FOOD_BLOCKS_POSITION.gapVh}vh`,
        opacity,
        zIndex: 6,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {foods.map((food, index) => (
          <motion.div
            key={`fixed-food-${index}`}
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{
              opacity: currentFoodIndex === -1 ? 1 : (index === currentFoodIndex ? 1 : 0.5),
              y: 0,
              scale: currentFoodIndex === -1 ? 1 : (index === currentFoodIndex ? 1 : 0.95),
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              backgroundColor: '#47c6da',
              borderRadius: 'clamp(8px, 1.2vw, 25px)',
              height: `${FOOD_BLOCKS_POSITION.blockHeightVh}vh`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <p
              style={{
                fontFamily: "'Inter:Bold',sans-serif",
                fontWeight: 'bold',
                color: 'white',
                fontSize: 'clamp(12px, 1.8vw, 45px)',
                textTransform: 'capitalize',
                margin: 0,
                lineHeight: 'normal',
              }}
            >
              {food.toLowerCase()}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
