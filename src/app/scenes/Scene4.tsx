import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { getFoodByName } from '../utils/foodValidation';

export function Scene4({ currentScene = 3, totalScenes = 8, enteredFoods = [], onFoodIndexChange }) {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Get food data for each entered food
  const foodDataList = useMemo(() => {
    return enteredFoods.map(foodName => {
      const foodData = getFoodByName(foodName);
      if (foodData) return foodData;
      return {
        name: foodName,
        categories: ['other'],
        riskLevel: 'moderate',
        vulnerabilityScore: 50,
        primaryThreat: 'Climate change',
        cost: {
          currentAvg: 5.00,
          predictedAvg: 10.00,
          currency: 'USD',
          unit: 'lb'
        }
      };
    });
  }, [enteredFoods]);

  // Track which card is most visible via horizontal scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.55; // each card is ~55vw
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < foodDataList.length) {
        setActiveIndex(newIndex);
        onFoodIndexChange?.(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, foodDataList.length, onFoodIndexChange]);

  const getRiskLevelText = (riskLevel) => {
    const levels = { critical: 'CRITICAL', major: 'MAJOR', moderate: 'MODERATE', low: 'LOW' };
    return levels[riskLevel] || 'MODERATE';
  };

  const getCategoryName = (categories) => {
    if (!categories || categories.length === 0) return 'Food';
    const map = { seafood: 'Seafood', fruit: 'Fruit', grains: 'Grains', poultry: 'Poultry', dairy: 'Dairy', vegetable: 'Vegetable', other: 'Food' };
    return map[categories[0]] || 'Food';
  };

  if (foodDataList.length === 0) {
    return (
      <div className="bg-white relative size-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl text-gray-500">No food data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white relative size-full overflow-hidden" data-name="Scene 4">
      {/* Green Background */}
      <div className="absolute inset-0 bg-[#52c467]" />

      {/* Person is rendered by ParallaxPerson overlay (fixed, right side) */}

      {/* Horizontal scrolling food cards container - LEFT 60% of screen only */}
      <div
        ref={scrollContainerRef}
        data-scroll-cards
        className="absolute top-0 bottom-0 left-0 flex items-center overflow-x-auto"
        style={{
          width: '60vw',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft: '2vw',
          paddingRight: '2vw',
          gap: '2vw',
        }}
      >
        <style>{`
          [data-name="Scene 4"] [data-scroll-cards]::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {foodDataList.map((food, index) => {
          const maxPrice = Math.max(50, (food.cost?.predictedAvg || 50) * 1.2);
          const currentBarHeight = ((food.cost?.currentAvg || 0) / maxPrice) * 60;
          const projectedBarHeight = ((food.cost?.predictedAvg || 0) / maxPrice) * 60;

          return (
            <div
              key={`card-${index}`}
              className="flex-shrink-0 flex items-start gap-[1vw]"
              style={{
                scrollSnapAlign: 'start',
                width: '54vw',
                height: '85vh',
              }}
            >
              {/* Main Info Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#47c6da] rounded-[1.5vw] relative"
                style={{
                  width: '55%',
                  height: '100%',
                  padding: '2vh 2vw',
                }}
              >
                {/* Food Name */}
                <p
                  className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#f5f5f5] capitalize"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 100px)', lineHeight: 1.1 }}
                >
                  {food.name.toLowerCase()}
                </p>

                {/* Category Circle */}
                <div
                  className="absolute flex items-center justify-center bg-[#f5f5f5] rounded-full"
                  style={{
                    width: 'clamp(40px, 4.5vw, 91px)',
                    height: 'clamp(40px, 4.5vw, 91px)',
                    top: '2vh',
                    right: '1.5vw',
                  }}
                >
                  <p className="font-['Inter:Regular',sans-serif] text-black" style={{ fontSize: 'clamp(6px, 0.55vw, 10px)' }}>
                    {getCategoryName(food.categories)}
                  </p>
                </div>

                {/* Divider */}
                <div className="bg-[#f5f5f5] w-full" style={{ height: '0.6vh', margin: '1.5vh 0' }} />

                {/* Vulnerability */}
                <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#f5f5f5]"
                  style={{ fontSize: 'clamp(18px, 2.3vw, 50px)', marginTop: '2vh' }}>
                  Vulnerability:
                </p>
                <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#28818f]"
                  style={{ fontSize: 'clamp(32px, 5vw, 120px)', lineHeight: 1.2 }}>
                  {getRiskLevelText(food.riskLevel)}
                </p>
                <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#28818f]"
                  style={{ fontSize: 'clamp(24px, 3.5vw, 80px)' }}>
                  {food.vulnerabilityScore || 50}/100
                </p>

                {/* Primary Threat */}
                <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#f5f5f5]"
                  style={{ fontSize: 'clamp(18px, 2.3vw, 50px)', marginTop: '3vh' }}>
                  Primary Threat
                </p>
                <ul className="font-['Inter:Regular',sans-serif] text-[#f5f5f5]"
                  style={{ fontSize: 'clamp(16px, 2vw, 50px)', marginLeft: '2vw', marginTop: '0.5vh' }}>
                  <li className="list-disc">
                    <span className="leading-[normal]">{food.primaryThreat}</span>
                  </li>
                </ul>

                {/* Info Button */}
                <div className="absolute" style={{ bottom: '1.5vh', left: '2vw' }}>
                  <svg width="clamp(30px, 3.5vw, 69px)" height="clamp(30px, 3.5vw, 69px)" viewBox="0 0 69 69" fill="none">
                    <circle cx="34.5" cy="34.5" r="31.5" stroke="white" strokeWidth="6" />
                  </svg>
                  <p className="absolute font-['Inter:Bold',sans-serif] font-bold text-white text-center"
                    style={{ fontSize: 'clamp(18px, 2.3vw, 50px)', top: '2px', left: '50%', transform: 'translateX(-50%)' }}>
                    i
                  </p>
                </div>
              </motion.div>

              {/* Price Chart Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.15 }}
                className="bg-[#f5f5f5] rounded-[1.8vw] relative flex flex-col"
                style={{
                  width: '45%',
                  height: '80%',
                  alignSelf: 'flex-end',
                  padding: '1.5vh 1vw',
                }}
              >
                {/* Chart Title */}
                <div className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#47c6da]"
                  style={{ fontSize: 'clamp(16px, 2.2vw, 50px)', lineHeight: 1 }}>
                  <p>Average Price</p>
                  <p>Per {food.cost?.unit || 'Lb'}</p>
                </div>

                {/* Chart Area */}
                <div className="flex-1 relative" style={{ marginTop: '2vh' }}>
                  {/* Top scale line */}
                  <div className="absolute left-0 right-0 bg-[#d9d9d9]" style={{ top: 0, height: '4px' }} />
                  <p className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#d9d9d9]"
                    style={{ fontSize: 'clamp(8px, 0.9vw, 20px)', top: '-2.5vh' }}>
                    ${(Math.max(50, (food.cost?.predictedAvg || 50) * 1.2)).toFixed(2)}
                  </p>

                  {/* Bars container */}
                  <div className="absolute bottom-[30%] left-0 right-0 flex justify-around items-end" style={{ top: '10%' }}>
                    {/* Current Bar */}
                    <div className="flex flex-col items-center" style={{ width: '35%' }}>
                      <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#f5f5f5]"
                        style={{ fontSize: 'clamp(8px, 0.9vw, 20px)', marginBottom: '0.5vh' }}>
                        ${food.cost?.currentAvg.toFixed(2)}
                      </p>
                      <div className="bg-[#47c6da] w-full rounded-t-[0.8vw]"
                        style={{ height: `${currentBarHeight}%` }} />
                    </div>
                    {/* Projected Bar */}
                    <div className="flex flex-col items-center" style={{ width: '35%' }}>
                      <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#f5f5f5]"
                        style={{ fontSize: 'clamp(8px, 0.9vw, 20px)', marginBottom: '0.5vh' }}>
                        ${food.cost?.predictedAvg.toFixed(2)}
                      </p>
                      <div className="bg-[#47c6da] w-full rounded-t-[0.8vw]"
                        style={{ height: `${projectedBarHeight}%` }} />
                    </div>
                  </div>

                  {/* Bottom scale line */}
                  <div className="absolute left-0 right-0 bg-[#d9d9d9]" style={{ bottom: '28%', height: '4px' }} />
                  <p className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#d9d9d9]"
                    style={{ fontSize: 'clamp(8px, 0.9vw, 20px)', bottom: '30%' }}>
                    $1.00
                  </p>

                  {/* Labels */}
                  <div className="absolute bottom-[12%] left-0 right-0 flex justify-around">
                    <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#47c6da]"
                      style={{ fontSize: 'clamp(10px, 1.1vw, 25px)' }}>Current</p>
                    <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#47c6da]"
                      style={{ fontSize: 'clamp(10px, 1.1vw, 25px)' }}>Projected</p>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Scroll hint dots */}
      <div className="absolute flex gap-[0.5vw]" style={{ bottom: '3vh', left: '50%', transform: 'translateX(-50%)' }}>
        {foodDataList.map((_, i) => (
          <div
            key={`dot-${i}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: 'clamp(8px, 0.7vw, 14px)',
              height: 'clamp(8px, 0.7vw, 14px)',
              backgroundColor: i === activeIndex ? '#ffffff' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>
    </div>
  );
}