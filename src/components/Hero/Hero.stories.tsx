import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Featured Movie Title',
    description: 'An epic adventure that will take you on a journey through space and time. Experience stunning visuals and compelling storytelling in this must-watch blockbuster.',
    backgroundImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
    primaryAction: {
      label: 'Watch Now',
      onClick: () => alert('Watch Now clicked!'),
    },
    secondaryAction: {
      label: 'Add to List',
      onClick: () => alert('Added to list!'),
    },
  },
};

export const WithoutActions: Story = {
  args: {
    title: 'Coming Soon',
    description: 'Get ready for the most anticipated movie of the year.',
    backgroundImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop',
  },
};

export const PrimaryActionOnly: Story = {
  args: {
    title: 'Watch Now',
    description: 'Stream this amazing content right now.',
    backgroundImage: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop',
    primaryAction: {
      label: 'Start Watching',
      onClick: () => alert('Started watching!'),
    },
  },
};

export const NoBackground: Story = {
  args: {
    title: 'Simple Hero',
    description: 'A hero component without a background image.',
    primaryAction: {
      label: 'Get Started',
      onClick: () => alert('Get started!'),
    },
  },
}; 