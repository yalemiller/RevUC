# Food Futures - Project Structure

## 📁 Directory Structure

```
/src
├── /app
│   ├── App.tsx                      # Main app entry point with scroll container
│   ├── /components
│   │   ├── ScrollContainer.tsx      # Snap scroll container wrapper
│   │   ├── SceneWrapper.tsx         # Individual scene wrapper
│   │   ├── BarChart.tsx             # Reusable bar chart component
│   │   ├── SceneProgressIndicator.tsx # Scene progress dots indicator
│   │   └── /ui                      # Shadcn UI components library
│   ├── /hooks
│   │   └── useScrollSnap.ts         # Custom hook for scroll management
│   ├── /scenes
│   │   ├── index.ts                 # Central export for all scenes
│   │   ├── Scene1.tsx               # Landing page (complete)
│   │   ├── Scene2.tsx               # Introduction (complete)
│   │   ├── Scene3.tsx               # Placeholder
│   │   ├── Scene4.tsx               # Placeholder
│   │   ├── Scene5.tsx               # Placeholder
│   │   ├── Scene6.tsx               # Placeholder
│   │   ├── Scene7.tsx               # Placeholder
│   │   └── Scene8.tsx               # Placeholder
│   └── /utils
│       └── dataHelpers.ts           # Data transformation utilities
├── /data
│   └── foods.json                   # Food data JSON file
├── /imports
│   ├── Scene1.tsx                   # Original Figma import (reference)
│   ├── Scene2-6-85.tsx              # Original Figma import (reference)
│   └── svg-r2pv384azv.ts           # SVG paths from Figma
└── /styles
    ├── index.css                    # Global styles
    ├── theme.css                    # Theme tokens
    └── fonts.css                    # Font imports
```

## 🏗️ Architecture Overview

### JavaScript-Based Architecture
The project uses JavaScript (not TypeScript) for maximum simplicity and flexibility. All files use `.tsx` extension for React JSX support, but without TypeScript type annotations.

### Modular Scene System
Each scene is a separate component in `/src/app/scenes/`. This makes it easy to:
- Work on scenes independently
- Add new scenes without affecting existing ones
- Replace placeholder scenes with actual content

### Adding a New Scene
1. Create `/src/app/scenes/SceneX.tsx`
2. Add export to `/src/app/scenes/index.ts`
3. Import in `App.tsx` and add to scroll container
4. Update `TOTAL_SCENES` constant in `App.tsx`

Example:
```tsx
// In /src/app/scenes/Scene9.tsx
export function Scene9() {
  return (
    <div className="relative size-full bg-[#your-color]">
      {/* Your content */}
    </div>
  );
}

// In /src/app/scenes/index.ts
export { Scene9 } from './Scene9';

// In /src/app/App.tsx
import { Scene9 } from './scenes';
const TOTAL_SCENES = 9; // Update this

// Add to JSX:
<SceneWrapper sceneNumber={9}>
  <Scene9 />
</SceneWrapper>
```

## 🎨 Design System

### Color Palette (60s Inspired)
- Primary Turquoise: `#2ea3bd`
- Yellow Highlight: `#fae850`
- Cream: `#f4e8d0`
- Red: `#ff6b6b`
- Yellow: `#ffd93d`
- Mint: `#95e1d3`
- Coral: `#f38181`
- Light Green: `#a8e6cf`
- Pink: `#ff9a9e`
- Progress Indicator Gray: `#d2d2d2`
- Inactive Dot: `#8A8A8A`

### Typography
- Primary Font: Inter Extra Bold (Scene 1 title text)
- Bold Font: Inter Bold (Scene 2 headline)
- Regular Font: Inter Regular (Scene 2 body text)
- Font size for instructions: 40px
- Font size for headlines: 65px
- Use Tailwind utilities for responsive sizing

## 📊 Data Structure

### Food Data Format (`/src/data/foods.json`)
```json
{
  "foods": [
    {
      "id": "coffee",
      "name": "Coffee",
      "categories": ["grains", "poultry", "fruit"],
      "riskLevel": "major",
      "primaryThreat": "rising_temperatures",
      "cost": {
        "currentAvg": 1.5,
        "predictedAvg": 3.75,
        "currency": "USD",
        "unit": "cup"
      }
    }
  ]
}
```

### Using Data in Scenes
```tsx
import foodData from '../../data/foods.json';
import { transformFoodDataForChart } from '../utils/dataHelpers';

const chartData = transformFoodDataForChart(foodData.foods);
```

## 🎬 Animation Guidelines

### Using Motion (Framer Motion)
```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Common Animation Patterns
1. **Fade In**: `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}`
2. **Slide In**: `initial={{ x: -100 }}` → `animate={{ x: 0 }}`
3. **Scale + Fade**: `initial={{ opacity: 0, scale: 0.9 }}` → `animate={{ opacity: 1, scale: 1 }}`
4. **Bobbing**: `animate={{ y: [0, -10, 0] }}` with `repeat: Infinity`
5. **Delayed Start**: Use `transition={{ delay: 1 }}`

### Scene 2 Animation Timing
- Person illustration: 0.2s delay
- Headline text: 0.3s delay
- Subtitle text: 0.5s delay
- Progress indicator: 0.1s delay

## 📈 Using the Bar Chart Component

```tsx
import { BarChart } from '../components/BarChart';

<BarChart
  data={chartData}
  xKey="name"
  bars={[
    { dataKey: 'current', fill: '#2ea3bd', name: 'Current Cost' },
    { dataKey: 'predicted', fill: '#ff6b6b', name: 'Predicted Cost' }
  ]}
  height={400}
/>
```

## 📍 Using the Scene Progress Indicator

The progress indicator automatically tracks which scene the user is currently viewing:

```tsx
import { SceneProgressIndicator } from '../components/SceneProgressIndicator';

<SceneProgressIndicator 
  totalScenes={8} 
  currentScene={currentSceneIndex} // 0-indexed
/>
```

**Features:**
- Dynamically calculates height based on number of scenes
- White circle = current scene
- Gray circles (#8A8A8A) = other scenes
- Fixed position on left side of screen (doesn't scroll)
- Automatically updates as user scrolls
- z-50 ensures it's always on top

## 🔧 Utility Functions

### Data Helpers (`/src/app/utils/dataHelpers.ts`)
- `transformFoodDataForChart(foods)` - Convert food array to chart format
- `calculatePercentageIncrease(current, predicted)` - Get % increase
- `formatCurrency(value, currency)` - Format as currency string
- `getRiskColor(riskLevel)` - Get color based on risk level
- `filterByRiskLevel(foods, level)` - Filter by risk
- `sortByCostIncrease(foods, ascending)` - Sort by cost change

## 🔄 Scroll Behavior

### How Snap Scrolling Works
- Each scene is wrapped in `<SceneWrapper>` with `snap-start`
- Scrolling automatically snaps to nearest scene
- `useScrollSnap` hook tracks current scene
- Scrollbar is hidden but scrolling still works
- Progress indicator stays fixed while scenes scroll

### Accessing Current Scene
```tsx
const { currentScene } = useScrollSnap({
  totalScenes: 8,
  onSceneChange: (index) => console.log('Scene', index)
});
```

## 🚀 Development Workflow

1. **Start with placeholder**: Use colored backgrounds to visualize layout
2. **Add animations**: Use motion/react for smooth transitions
3. **Integrate data**: Load from JSON and use utility functions
4. **Add charts**: Use BarChart component with your data
5. **Polish**: Fine-tune animations and interactions

## 📝 Best Practices

- ✅ Keep each scene component under 200 lines
- ✅ Extract complex logic into hooks or utilities
- ✅ Use default parameter values for props
- ✅ Test scroll behavior on different screen sizes
- ✅ Keep animations subtle and purposeful
- ✅ Use semantic HTML elements
- ✅ Add descriptive data-name attributes for debugging
- ✅ Use `overflow-hidden` when cropping images

## 🐛 Debugging

### Common Issues
1. **Scene not snapping**: Check if SceneWrapper has `h-screen` class
2. **Animation not starting**: Verify delay timing in transition
3. **Data not loading**: Check JSON import path
4. **Scroll position wrong**: Ensure window.innerHeight is calculated correctly
5. **Progress indicator scrolling**: Ensure it's using `fixed` not `absolute`
6. **Image cropping not working**: Check for `overflow-hidden` and proper height

### Console Logging
Current scene is logged automatically. Check browser console to see:
```
Current scene: 1
Current scene: 2
...
```
