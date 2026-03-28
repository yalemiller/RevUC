# Code Optimization & Refactoring TODO

## Status: 🔄 IN PROGRESS
**Created**: 2026-03-28
**Goal**: Make codebase modular, organized, and optimized

---

## Phase 1: Code Organization & Structure ✅ COMPLETE

### A. Constants & Configuration ✅
- [x] Extract magic numbers and repeated values to constants file
- [x] Create scene configuration objects (gradients, sun positions, prompts)
- [x] Create animation timing constants
- [x] Create color palette constants

### B. Shared Components & Utilities ✅
- [x] Create reusable animation variants file
- [x] Extract common SVG shapes (sun, ground) into components
- [x] Create food validation utility
- [x] Create reusable gradient background component

### C. Type Safety (if adding TypeScript later)
- [ ] Add prop type definitions for all components
- [ ] Create interface for scene props
- [ ] Create interface for food data structure

---

## Phase 2: Performance Optimizations ⏳

### A. React Performance ✅
- [x] Add React.memo to static components (SceneProgressIndicator, etc.)
- [ ] Add useMemo for expensive calculations
- [ ] Add useCallback for event handlers passed as props
- [ ] Lazy load scene components

### B. Animation Performance
- [ ] Use transform instead of position changes where possible
- [ ] Add will-change CSS hints for animated elements
- [ ] Optimize AnimatePresence usage
- [ ] Reduce animation complexity in Scene 3

### C. Bundle Size
- [ ] Remove unused UI components (40+ unused shadcn components)
- [ ] Remove unused dependencies (MUI, react-dnd if not used)
- [ ] Code-split by route/scene
- [ ] Optimize image imports

---

## Phase 3: Code Quality & Maintainability ⏳

### A. Scene Components
- [ ] Standardize scene component structure
- [ ] Extract repeated scene elements (background, ground, person)
- [ ] Create scene layout wrapper with common elements
- [ ] Reduce code duplication across scenes

### B. Hooks & Logic
- [ ] Move scroll lock logic into custom hook
- [ ] Create useScene3State hook for Scene 3 logic
- [ ] Add error boundaries
- [ ] Improve scroll snap logic

### C. Data Management
- [ ] Add food data validation schema
- [ ] Create data access helpers
- [ ] Add fallback data handling
- [ ] Normalize food names on load

---

## Phase 4: File Structure & Organization ⏳

### A. Directory Restructure
- [ ] Move all scene-related files to /scenes folder
- [ ] Create /constants folder
- [ ] Create /animations folder
- [ ] Create /types folder
- [ ] Organize imports folder better

### B. Naming Conventions
- [ ] Standardize component file naming
- [ ] Standardize hook naming
- [ ] Standardize utility naming
- [ ] Add consistent prefixes

### C. Documentation
- [ ] Add JSDoc comments to all exported functions
- [ ] Document component props
- [ ] Document hook parameters and return values
- [ ] Create component usage examples

---

## Phase 5: Cleanup & Polish ⏳

### A. Remove Dead Code
- [ ] Remove unused imports
- [ ] Remove unused UI components
- [ ] Remove unused dependencies
- [ ] Remove commented code

### B. Style Consistency
- [ ] Standardize Tailwind class ordering
- [ ] Extract repeated style patterns
- [ ] Consistent color usage (hex vs rgb)
- [ ] Remove inline styles where possible

### C. Accessibility
- [ ] Add proper alt text to all images
- [ ] Add ARIA labels where needed
- [ ] Ensure keyboard navigation works
- [ ] Add focus indicators

---

## Phase 6: Scene 3 Enhancements ✅ COMPLETE

### A. Arc-Based Animations ✅
- [x] Create arc path for sun movement
- [x] Add custom bezier easing for natural motion
- [x] Implement smooth transitions between time periods
- [x] Add sun rays for visual enhancement

### B. Environmental Elements ✅
- [x] Create Cloud component (3 size variants)
- [x] Create Moon component with craters
- [x] Configure clouds for each time period
- [x] Add moon for dinner time
- [x] Implement staggered cloud animations

### C. Dynamic Stomach Coupling ✅
- [x] Create position calculation utility
- [x] Calculate stomach position relative to person image
- [x] Apply proportional scaling
- [x] Use useMemo for performance
- [x] Add helper functions for scaling

### D. Configuration Updates ✅
- [x] Add cloud positions to SCENE_3_STEPS
- [x] Add moon configuration
- [x] Add stomach offset configuration
- [x] Update constants with new data

---

## Priority Order

**High Priority** (Do First):
1. Extract constants and configuration
2. Remove unused dependencies
3. Create reusable components
4. Add React.memo to static components
5. Standardize scene structure

**Medium Priority** (Do Second):
1. Animation optimizations
2. Code splitting
3. Custom hooks refactoring
4. Documentation

**Low Priority** (Nice to Have):
1. Type safety additions
2. Advanced performance optimizations
3. Extensive documentation
4. Accessibility enhancements

---

## Estimated Impact

- **Bundle Size**: Reduce by ~40% (remove unused deps)
- **Performance**: Improve by ~20% (memoization, optimization)
- **Maintainability**: Improve by ~60% (organization, constants)
- **Code Lines**: Reduce by ~30% (reusability, extraction)

---

## Notes

- Each completed item will be logged in changelog.md
- Breaking changes will be tested thoroughly
- Backward compatibility will be maintained
- Focus on incremental improvements