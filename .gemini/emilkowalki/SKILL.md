---
name: emilkowal-animations
description: "43 rules for building better web animations. Includes timing, easing, performance, and accessibility patterns for React, CSS, and Framer Motion."
---

# Emil Kowalski Animation Skills

This skill codifies 43 essential rules for creating tasteful, performant, and accessible UI animations, distilled from the principles of Emil Kowalski (animations.dev).

## 1. Easing Selection (CRITICAL)
- **ease-1**: Use `ease-out` as the default for UI elements appearing. It feels snappy and responsive.
- **ease-2**: Use custom `cubic-bezier(.4, 0, .2, 1)` (Inter) or similar curves over browser defaults like `ease`.
- **ease-3**: Avoid `linear` unless animating continuous properties like colors or opacity in a long transition.
- **ease-4**: Use spring physics (`damping: 15`, `stiffness: 150`) for physical elements like modals, drawers, and draggable items.
- **ease-5**: Entry animations should be faster than exit animations (snappy in, smooth out).

## 2. Timing & Duration (CRITICAL)
- **timing-1**: Keep most UI transitions under **300ms**. 
- **timing-2**: Micro-interactions (hovers, clicks) should be between **100ms - 150ms**.
- **timing-3**: Large transitions (page fades, full-width drawers) can be **300ms - 450ms**.
- **timing-4**: Use **staggered** delays for lists to create a sense of direction (e.g., 20ms - 50ms between items).
- **timing-5**: Percieved speed is more important than absolute duration. Faster is usually better for utility.

## 3. Property Selection (HIGH)
- **props-1**: Animate only **transform** and **opacity**. These avoid layout thrashing and are hardware-accelerated.
- **props-2**: Avoid animating `width`, `height`, `top`, `left`, `margin`, or `padding` unless absolutely necessary (use scale/translate instead).
- **props-3**: Use `will-change: transform` only when an animation is about to happen to prevent GPU memory bloat.
- **props-4**: For layout changes (e.g., list reordering), use `Framer Motion`'s `layout` prop to handle FLIP animations performantly.

## 4. Transform Techniques (HIGH)
- **transform-1**: Animate from a high initial scale (e.g., `0.95` to `1`) rather than `0` to keep the UI legible during the transition.
- **transform-2**: Entrances should involve a slight vertical/horizontal translation (y: 10px -> 0) to give a sense of origin.
- **transform-3**: Use `origin-center` for buttons and `origin-top` for dropdowns to make the growth feel natural.

## 5. Interaction Patterns (MEDIUM-HIGH)
- **interact-1**: Animations must be **interruptible**. If a user clicks away, the animation should stop or reverse instantly.
- **interact-2**: For drag-to-dismiss, the element must stay locked to the cursor/finger with zero latency.
- **interact-3**: On release (swipe), the velocity of the gesture should be inherited by the exit animation.
- **interact-4**: Hover states should be subtly elastic to feel "tactile".

## 6. Strategic Animation (MEDIUM)
- **strategy-1**: Every animation must serve a purpose (e.g., showing state change, hierarchy, or affordance).
- **strategy-2**: Avoid animating elements triggered by keyboard interactions (focus, enter) unless it's a critical visual cue.
- **strategy-3**: Remove animations for high-frequency user actions (e.g., every keystroke in an input) to avoid distraction.

## 7. Accessibility & Polish (MEDIUM)
- **polish-1**: Always respect `prefers-reduced-motion`. Disable or simplify animations (e.g., fade instead of slide) when active.
- **polish-2**: Maintain `aria-live` regions through animations to ensure screen readers are not confused by moving content.
- **polish-3**: Ensure no animation lasts longer than 5 seconds (WCAG guideline).
- **polish-4**: Use `0.93` as a standard scale for press/click interactions ($clicked $scale).

## Implementation Example (Framer Motion)
```tsx
const variants = {
  initial: { opacity: 0, y: 10, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.2, 
      ease: [0.4, 0, 0.2, 1] 
    }
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.15 } 
  }
}
```

## Checklist for Reviewing Animations
1. [ ] Does it only animate `transform` and `opacity`?
2. [ ] Is the duration under 300ms?
3. [ ] Does it use an `ease-out` or spring curve for entry?
4. [ ] Is it interruptible?
5. [ ] Does it handle `prefers-reduced-motion`?
6. [ ] Is the origin point logical?
7. [ ] Does it feel snappy rather than "floaty"?
