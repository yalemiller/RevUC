import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { getFoodByName } from '../utils/foodValidation';

export function Scene4({ currentScene = 3, totalScenes = 8, enteredFoods = [], onFoodIndexChange }) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const foodDataList = useMemo(() => {
    return enteredFoods.map((foodName) => {
      const foodData = getFoodByName(foodName);
      if (foodData) return foodData;

      return {
        name: foodName,
        categories: ['other'],
        riskLevel: 'moderate',
        vulnerabilityScore: 50,
        primaryThreat: 'Climate change',
        cost: {
          currentAvg: 5.0,
          predictedAvg: 10.0,
          currency: 'USD',
          unit: 'lb',
        },
      };
    });
  }, [enteredFoods]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const cardWidth = container.offsetWidth * 0.94;
        const rawIndex = container.scrollLeft / cardWidth;
        const newIndex = Math.round(rawIndex);

        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < foodDataList.length) {
          setActiveIndex(newIndex);
          onFoodIndexChange?.(newIndex);
        }

        container.scrollTo({
          left: newIndex * cardWidth,
          behavior: 'smooth',
        });
      }, 90);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [activeIndex, foodDataList.length, onFoodIndexChange]);

  const getRiskLevelText = (riskLevel: string) => {
    const levels: Record<string, string> = {
      critical: 'CRITICAL',
      major: 'MAJOR',
      moderate: 'MODERATE',
      low: 'LOW',
    };
    return levels[riskLevel] || 'MODERATE';
  };

  const getCategoryName = (categories: string[]) => {
    if (!categories || categories.length === 0) return 'Food';

    const map: Record<string, string> = {
      seafood: 'Seafood',
      fruit: 'Fruit',
      grains: 'Grains',
      poultry: 'Poultry',
      dairy: 'Dairy',
      vegetable: 'Vegetable',
      other: 'Food',
    };

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
      <div className="absolute inset-0 bg-[#52c467]" />

      <div
        ref={scrollContainerRef}
        data-scroll-cards
        className="absolute top-0 bottom-0 left-0 flex items-center overflow-x-auto"
        style={{
          width: '66vw',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft: '1.2vw',
          paddingRight: '1.2vw',
          gap: '1.6vw',
        }}
      >
        <style>{`
          [data-name="Scene 4"] [data-scroll-cards]::-webkit-scrollbar {
            display: none;
          }

          [data-name="Scene 4"] [data-scroll-cards] {
            -webkit-overflow-scrolling: touch;
            scroll-snap-stop: always;
          }
        `}</style>

        {foodDataList.map((food, index) => {
          const maxPrice = Math.max(50, (food.cost?.predictedAvg || 50) * 1.2);
          const currentBarHeight = ((food.cost?.currentAvg || 0) / maxPrice) * 54;
          const projectedBarHeight = ((food.cost?.predictedAvg || 0) / maxPrice) * 54;

          return (
            <div
              key={`card-${index}`}
              className="flex-shrink-0"
              style={{
                scrollSnapAlign: 'start',
                width: '58vw',
                height: '88vh',
                padding: '0.7vw',
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-[#47c6da] rounded-[1.8vw] relative"
                style={{
                  width: '100%',
                  height: '100%',
                  padding: '2.2vh 2vw',
                }}
              >
                <p
                  className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#f5f5f5] capitalize"
                  style={{ fontSize: 'clamp(56px, 5.4vw, 112px)', lineHeight: 1 }}
                >
                  {food.name}
                </p>

                <div
                  className="absolute flex items-center justify-center bg-[#f5f5f5] rounded-full"
                  style={{
                    width: 'clamp(54px, 4.2vw, 84px)',
                    height: 'clamp(54px, 4.2vw, 84px)',
                    top: '2.2vh',
                    right: '1.5vw',
                  }}
                >
                  <p
                    className="font-['Inter:Regular',sans-serif] text-black"
                    style={{ fontSize: 'clamp(8px, 0.68vw, 12px)' }}
                  >
                    {getCategoryName(food.categories)}
                  </p>
                </div>

                <div
                  className="bg-[#f5f5f5] w-full"
                  style={{ height: '0.45vh', margin: '2.1vh 0 3vh 0' }}
                />

                <p
                  className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#f5f5f5]"
                  style={{ fontSize: 'clamp(80px, 2.5vw, 48px)', lineHeight: 1.1 }}
                >
                  Vulnerability:
                </p>

                <p
                  className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#28818f]"
                  style={{ fontSize: 'clamp(100px, 6.2vw, 132px)', lineHeight: 0.95, marginTop: '2vh' }}
                >
                  {getRiskLevelText(food.riskLevel)}
                </p>

                <p
                  className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#28818f]"
                  style={{ fontSize: 'clamp(54px, 4.8vw, 92px)', lineHeight: 1, marginTop: '1vh' }}
                >
                  {food.vulnerabilityScore || 50}/100
                </p>

                <p
                  className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#f5f5f5]"
                  style={{ fontSize: 'clamp(80px, 2.5vw, 48px)', marginTop: '7vh', lineHeight: 1.1 }}
                >
                  Primary Threat
                </p>

                <ul
                  className="font-['Inter:Regular',sans-serif] text-[#f5f5f5]"
                  style={{ fontSize: 'clamp(70px, 2.2vw, 40px)', marginLeft: '2vw', marginTop: '1.1vh' }}
                >
                  <li className="list-disc">
                    <span>{food.primaryThreat}</span>
                  </li>
                </ul>

                <div className="absolute" style={{ bottom: '1.8vh', left: '2vw' }}>
                  <svg width="64" height="64" viewBox="0 0 69 69" fill="none">
                    <circle cx="34.5" cy="34.5" r="31.5" stroke="white" strokeWidth="6" />
                  </svg>
                  <p
                    className="absolute font-['Inter:Bold',sans-serif] font-bold text-white text-center"
                    style={{
                      fontSize: 'clamp(24px, 2vw, 38px)',
                      top: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    i
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 + 0.12 }}
                  className="bg-[#f1f1f1] rounded-[1.8vw] absolute flex flex-col"
                  style={{
                    width: '39%',
                    height: '68%',
                    right: '2.4vw',
                    top: '20.5vh',
                    padding: '1.8vh 1.1vw 1.8vh 1.1vw',
                    boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
                  }}
                >
                  <div
                    className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#47c6da]"
                    style={{ fontSize: 'clamp(28px, 2.7vw, 50px)', lineHeight: 1.02 }}
                  >
                    <p>Average Price</p>
                    <p>Per {String(food.cost?.unit || 'Lb').toUpperCase()}</p>
                  </div>

                  <div className="flex-1 relative" style={{ marginTop: '2.2vh' }}>
                    <div className="absolute left-0 right-0 bg-[#d0d0d0]" style={{ top: '2%', height: '4px' }} />
                    <p
                      className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#d0d0d0]"
                      style={{ fontSize: 'clamp(12px, 1vw, 18px)', top: '-1.8vh' }}
                    >
                      ${maxPrice.toFixed(2)}
                    </p>

                    <div
                      className="absolute left-0 right-0 flex justify-around items-end"
                      style={{ top: '13%', bottom: '17%' }}
                    >
                      <div className="flex items-end justify-center" style={{ width: '32%', height: '100%' }}>
                        <div
                          className="bg-[#47c6da] w-full rounded-t-[0.8vw] flex items-start justify-center"
                          style={{
                            height: `${currentBarHeight}%`,
                            minHeight: '18px',
                            paddingTop: '1vh',
                          }}
                        >
                          <p
                            className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#f5f5f5]"
                            style={{ fontSize: 'clamp(12px, 1.05vw, 20px)' }}
                          >
                            ${food.cost?.currentAvg.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-end justify-center" style={{ width: '32%', height: '100%' }}>
                        <div
                          className="bg-[#47c6da] w-full rounded-t-[0.8vw] flex items-start justify-center"
                          style={{
                            height: `${projectedBarHeight}%`,
                            minHeight: '18px',
                            paddingTop: '1vh',
                          }}
                        >
                          <p
                            className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#f5f5f5]"
                            style={{ fontSize: 'clamp(12px, 1.05vw, 20px)' }}
                          >
                            ${food.cost?.predictedAvg.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute left-0 right-0 bg-[#d0d0d0]" style={{ bottom: '15%', height: '4px' }} />
                    <p
                      className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#d0d0d0]"
                      style={{ fontSize: 'clamp(12px, 1vw, 18px)', bottom: '16.5%' }}
                    >
                      $1.00
                    </p>

                    <div className="absolute bottom-[2%] left-0 right-0 flex justify-around">
                      <p
                        className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#47c6da]"
                        style={{ fontSize: 'clamp(16px, 1.45vw, 26px)' }}
                      >
                        Current
                      </p>
                      <p
                        className="font-['Inter:Extra_Bold',sans-serif] font-extrabold text-[#47c6da]"
                        style={{ fontSize: 'clamp(16px, 1.45vw, 26px)' }}
                      >
                        Projected
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div
        className="absolute flex gap-[0.5vw]"
        style={{ bottom: '3vh', left: '50%', transform: 'translateX(-50%)' }}
      >
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