# TV Components Library

A React component library specifically designed for TV and streaming interfaces, optimized for remote control navigation and viewing from a distance.

## Features

- 🎯 **TV-Optimized**: Components designed for TV screens and remote control navigation
- ⌨️ **Keyboard Navigation**: Full support for directional navigation with arrow keys
- 🎨 **Focus Management**: Visual focus indicators optimized for TV viewing
- 📱 **Responsive**: Works across different screen sizes and TV resolutions
- 🎪 **Storybook**: Comprehensive component documentation and examples
- 📦 **TypeScript**: Full TypeScript support with type definitions
- 🎭 **Customizable**: Extensive theming and customization options

## Installation

```bash
npm install tv-components
```

Or with yarn:

```bash
yarn add tv-components
```

## Quick Start

```tsx
import React from 'react';
import { Button, Hero, Navigation, Poster } from 'tv-components';

function App() {
  return (
    <div>
      <Navigation
        items={[
          { label: 'Home', isActive: true },
          { label: 'Movies', isActive: false },
          { label: 'TV Shows', isActive: false },
        ]}
      />
      
      <Hero
        title="Featured Content"
        description="Discover amazing content optimized for your TV experience"
        primaryAction={{
          label: 'Watch Now',
          onClick: () => console.log('Watch clicked'),
        }}
      />
      
      <Poster
        src="/movie-poster.jpg"
        alt="Movie Title"
        title="Amazing Movie"
        subtitle="2023 • Action"
        onClick={() => console.log('Poster clicked')}
      />
    </div>
  );
}
```

## Components

### Core Components

- **Button** - Interactive buttons with TV-optimized focus states
- **Card** - Content containers with hover and focus effects
- **Hero** - Large featured content sections with background images
- **Modal** - Overlay dialogs with focus management
- **Navigation** - Menu components with keyboard navigation
- **Poster** - Movie/show poster displays with aspect ratio support
- **Progress** - Progress bars for showing content completion
- **Text** - Typography component with TV-optimized sizing

### Layout Components

- **Container** - Page containers with responsive sizing
- **Grid** - CSS Grid layouts with TV-friendly spacing
- **Row** - Flexbox rows with alignment options
- **Column** - Flexbox columns with alignment options

### Utilities

- **FocusManager** - Global focus and keyboard event management
- **useFocus** - Hook for managing component focus state
- **useKeyboardNavigation** - Hook for handling TV remote navigation

## TV-Specific Features

### Focus Management

All interactive components include:
- Visual focus indicators with blue ring styling
- Smooth transitions between focus states
- Keyboard navigation support (arrow keys, enter, escape)
- Focus trapping in modals and overlays

### Remote Control Support

The library handles common TV remote buttons:
- **Arrow Keys**: Directional navigation
- **Enter/Space**: Selection and activation
- **Escape**: Back/cancel actions
- **Backspace**: Alternative back action

### Viewing Distance Optimization

- Larger touch targets (minimum 44px)
- Increased font sizes for readability
- High contrast color scheme
- Generous spacing between elements

## Development

### Running the Demo

```bash
npm run dev
```

### Building the Library

```bash
npm run build:lib
```

### Running Storybook

```bash
npm run storybook
```

### Linting

```bash
npm run lint
```

## Customization

The library uses CSS custom properties for theming:

```css
:root {
  --tv-bg-primary: #0F0F0F;
  --tv-bg-secondary: #1A1A1A;
  --tv-text-primary: #FFFFFF;
  --tv-accent-primary: #007AFF;
  /* ... more variables */
}
```

You can override these variables to customize the appearance.

## TypeScript Support

All components include comprehensive TypeScript definitions:

```tsx
import { ButtonProps, HeroProps } from 'tv-components';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Browser Support

- Modern browsers with ES2020 support
- Chrome, Firefox, Safari, Edge
- Smart TV browsers (Samsung Tizen, LG webOS, etc.)
- Set-top boxes and streaming devices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details. 