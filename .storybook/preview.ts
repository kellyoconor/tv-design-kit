import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0F0F0F',
        },
        {
          name: 'light',
          value: '#F5F5F5',
        },
      ],
    },
    viewport: {
      viewports: {
        tv1080p: {
          name: '1080p TV',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
        tv4k: {
          name: '4K TV',
          styles: {
            width: '3840px',
            height: '2160px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
      },
    },
  },
};

export default preview; 