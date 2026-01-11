# Fortebet Quiz System - Design Guidelines

## Design Approach
**Reference-Based Hybrid**: Combine "Who Wants to Be a Millionaire" game show drama with modern card-based quiz platforms (Kahoot, Quizizz). Focus on tension-building progression and celebratory moments.

**Brand Integration**: Fortebet green (#00B140 assumed) as primary accent, dark gray (#1A1A1A) for depth, white for clarity. Use green strategically for correct answers, progress, and CTAs.

## Typography Hierarchy
**Primary Font**: Inter or DM Sans (Google Fonts CDN)
**Display Font**: Montserrat Bold for dramatic moments

- **Quiz Questions**: text-2xl md:text-3xl, font-bold, leading-tight
- **Answer Options**: text-lg md:text-xl, font-medium
- **Lifeline Labels**: text-sm, uppercase, tracking-wide
- **Score/Progress**: text-4xl md:text-6xl, font-bold (celebration moments)
- **Body Text**: text-base, font-normal

## Layout System
**Spacing Primitives**: Use Tailwind units 4, 6, 8, 12, 16 for consistency
- Cards: p-6 md:p-8
- Sections: py-12 md:py-16
- Component gaps: gap-4 md:gap-6
- Edges: px-4 md:px-6

**Container Strategy**:
- Quiz arena: max-w-4xl mx-auto (focused attention)
- Full-width progress bars and backgrounds
- Mobile-first stack, desktop centered layouts

## Hero Section
**Full-width dramatic entry** (h-screen or min-h-[600px]):
- Background image: Stadium lights or crowd excitement blur, dark overlay (opacity-60)
- Center-stacked content: Logo, "Test Your Knowledge", CTA button with blur backdrop
- Animated particles or spotlight effect (subtle, CSS-based)
- Button: Green with backdrop-blur-md, white text, shadow-xl

## Core Components

### Question Card
- Large elevated card (shadow-2xl, rounded-2xl)
- Dark gray background with subtle gradient
- Question number badge (top-left, green pill)
- Question text centered, generous padding (p-8 md:p-12)
- Progress ring or bar showing question position (1/15)

### Answer Grid
- 2x2 grid on desktop (grid-cols-1 md:grid-cols-2)
- Each option: Large card button (min-h-[100px])
- Letter prefix (A/B/C/D) in circle badge
- Hover: scale-105, green border glow
- Selected: Green border, checkmark icon (Heroicons)
- Correct: Green background fade-in
- Incorrect: Red border pulse, shake animation

### Lifelines Panel
- Horizontal row of 3 cards (50:50, Phone Friend, Ask Audience)
- Icon-first design (Heroicons)
- Disabled state: opacity-40, grayscale
- Active glow effect on green

### Prize Ladder (Side Panel Desktop)
- Vertical progression list
- Current question highlighted (green background, pulsing)
- Completed: white text, checkmark
- Upcoming: opacity-60
- Safe havens (£1K, £32K): Gold accent

### Results Screen
- Celebration confetti animation (canvas-confetti library)
- Large score display with count-up animation
- Performance breakdown cards grid
- Share buttons (social icons)
- "Play Again" prominent CTA

## Animations
**Strategic Use Only**:
- Question transition: Fade + slide up (300ms)
- Answer reveal: Stagger fade-in (100ms delay each)
- Correct answer: Green pulse + scale (500ms)
- Progress: Smooth width transition (400ms ease-out)
- Modal entry: Scale from 95% to 100% (200ms)

**No**: Constant background animations, excessive parallax, distracting scroll effects

## Images Specification

**Hero Image**: 
- Type: Stadium/game show atmosphere with dramatic lighting
- Placement: Full-screen background with dark overlay
- Style: Cinematic, high-energy, blurred to ensure text readability
- Fallback: Dark gradient (gray to black)

**Optional Decorative**:
- Trophy/prize imagery for results screen background (subtle)
- Abstract geometric patterns for card backgrounds (SVG, subtle)

## Mobile Responsiveness
- Single column answer stack on mobile
- Prize ladder collapses to horizontal progress bar
- Reduced padding (p-4 instead of p-8)
- Larger touch targets (min-h-[64px] for buttons)
- Bottom-fixed lifeline bar on mobile

## State Variations
- Loading: Skeleton cards with pulse animation
- Timer pressure: Red border glow when <10s remaining
- Locked answers: Cursor-not-allowed, reduced opacity
- Game over: Full-screen overlay with blur backdrop

**Icon Library**: Heroicons (CDN) - use solid variants for emphasis, outline for secondary actions