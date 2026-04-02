# Theme Usage Guide

## Quick Start

### Using the Theme Toggle
1. Look for the sun/moon icon in the top-right corner of the navbar
2. Click to toggle between light and dark modes
3. Watch the smooth vertical animation
4. Your preference is automatically saved

### Animation Behavior
- **Switching to Dark Mode**: Animation slides down from top
- **Switching to Light Mode**: Animation slides up from bottom
- **Duration**: 0.6 seconds with smooth easing

## For Developers

### Adding Dark Mode to Components

#### Basic Usage
```tsx
// Simple background and text
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

#### Common Patterns

**Cards:**
```tsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
  Card content
</div>
```

**Buttons:**
```tsx
<button className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700">
  Click me
</button>
```

**Inputs:**
```tsx
<input className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
```

**Text Colors:**
```tsx
<p className="text-gray-600 dark:text-gray-400">Secondary text</p>
<h1 className="text-gray-900 dark:text-white">Primary heading</h1>
```

### Accessing Theme State

```tsx
'use client';

import { useTheme } from '@/context/ThemeContext';

export default function MyComponent() {
  const { theme, toggleTheme, isAnimating } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {isAnimating && <p>Animating...</p>}
    </div>
  );
}
```

### Color Palette Reference

#### Light Mode
| Element | Class | Color |
|---------|-------|-------|
| Background | `bg-white` | #FFFFFF |
| Secondary BG | `bg-gray-50` | #F9FAFB |
| Primary Text | `text-gray-900` | #111827 |
| Secondary Text | `text-gray-600` | #4B5563 |
| Border | `border-gray-200` | #E5E7EB |

#### Dark Mode
| Element | Class | Color |
|---------|-------|-------|
| Background | `dark:bg-gray-900` | #111827 |
| Secondary BG | `dark:bg-gray-800` | #1F2937 |
| Primary Text | `dark:text-white` | #FFFFFF |
| Secondary Text | `dark:text-gray-300` | #D1D5DB |
| Border | `dark:border-gray-700` | #374151 |

### Best Practices

#### 1. Always Pair Light and Dark Classes
```tsx
// ✅ Good
<div className="bg-white dark:bg-gray-900">

// ❌ Bad - missing dark mode
<div className="bg-white">
```

#### 2. Use Consistent Color Scales
```tsx
// ✅ Good - consistent scale
<div className="bg-gray-50 dark:bg-gray-800">
<p className="text-gray-600 dark:text-gray-400">

// ❌ Bad - inconsistent
<div className="bg-gray-50 dark:bg-gray-900">
<p className="text-gray-600 dark:text-gray-100">
```

#### 3. Test Both Modes
- Always test your components in both light and dark modes
- Check contrast ratios for accessibility
- Verify hover states work in both modes

#### 4. Use Transition Classes
```tsx
// Add smooth transitions
<div className="bg-white dark:bg-gray-900 transition-colors duration-300">
```

### Common Components

#### Navigation Link
```tsx
<Link
  href="/path"
  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
>
  Link Text
</Link>
```

#### Card with Shadow
```tsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
  Card content
</div>
```

#### Form Input
```tsx
<input
  type="text"
  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
/>
```

#### Alert/Error Message
```tsx
<div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded">
  Error message
</div>
```

### Customizing the Animation

To modify the animation, edit `app/globals.css`:

```css
/* Change animation duration */
@keyframes slideDownDark {
  /* Adjust timing here */
}

/* Change animation style */
.theme-transition-overlay {
  /* Modify overlay appearance */
}
```

### Disabling Animations

For users who prefer reduced motion:

```tsx
// In ThemeContext.tsx, check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Skip animation, instant switch
}
```

## Troubleshooting

### Theme Not Persisting
- Check localStorage is enabled in browser
- Verify `localStorage.getItem('theme')` returns value
- Clear browser cache and try again

### Flash of Unstyled Content
- Ensure `suppressHydrationWarning` is on `<html>` tag
- ThemeProvider should load before rendering children
- Check that initial theme is applied immediately

### Animation Not Smooth
- Verify CSS animations are supported
- Check for conflicting CSS transitions
- Ensure GPU acceleration is enabled

### Colors Not Changing
- Verify `dark` class is on `<html>` element
- Check Tailwind dark mode is configured
- Inspect element to see if dark: classes are applied

## Tips & Tricks

### Quick Theme Testing
```tsx
// Add to any component for quick testing
<button onClick={() => document.documentElement.classList.toggle('dark')}>
  Quick Toggle (Dev Only)
</button>
```

### Debugging Theme State
```tsx
// Log theme changes
useEffect(() => {
  console.log('Theme changed to:', theme);
}, [theme]);
```

### Custom Theme Colors
```tsx
// Add to tailwind.config.ts for custom colors
theme: {
  extend: {
    colors: {
      'dark-bg': '#0a0a0a',
      'dark-text': '#e5e5e5',
    }
  }
}
```

## Resources

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Support

For issues or questions about the theme implementation:
1. Check this guide first
2. Review the implementation in `context/ThemeContext.tsx`
3. Inspect the CSS animations in `app/globals.css`
4. Test in different browsers
