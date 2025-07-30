import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './Navigation';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const navigationItems = [
  { label: 'Home', isActive: true },
  { label: 'Movies', isActive: false },
  { label: 'TV Shows', isActive: false },
  { label: 'My List', isActive: false },
  { label: 'Settings', isActive: false },
];

export const Horizontal: Story = {
  args: {
    items: navigationItems,
    orientation: 'horizontal',
    variant: 'primary',
  },
};

export const Vertical: Story = {
  args: {
    items: navigationItems,
    orientation: 'vertical',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    items: navigationItems,
    orientation: 'horizontal',
    variant: 'secondary',
  },
};

export const WithLinks: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', isActive: true },
      { label: 'About', href: '/about', isActive: false },
      { label: 'Contact', href: '/contact', isActive: false },
    ],
    orientation: 'horizontal',
    variant: 'primary',
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: navigationItems.map(item => ({
      ...item,
      onClick: () => alert(`Clicked ${item.label}`),
    })),
    orientation: 'horizontal',
    variant: 'primary',
  },
}; 