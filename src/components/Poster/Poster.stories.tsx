import type { Meta, StoryObj } from '@storybook/react';
import { Poster } from './Poster';

const meta: Meta<typeof Poster> = {
  title: 'Components/Poster',
  component: Poster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    aspectRatio: {
      control: { type: 'select' },
      options: ['portrait', 'landscape', 'square'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Portrait: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1489599162026-0b5a10b63e70?w=400&h=600&fit=crop',
    alt: 'Movie Poster',
    title: 'Amazing Movie',
    subtitle: '2023 • Action',
    aspectRatio: 'portrait',
  },
};

export const Landscape: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop',
    alt: 'Movie Scene',
    title: 'Epic Adventure',
    subtitle: '2023 • Adventure',
    aspectRatio: 'landscape',
  },
};

export const Square: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
    alt: 'Documentary',
    title: 'Nature Doc',
    subtitle: '2023 • Documentary',
    aspectRatio: 'square',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Poster
        src="https://images.unsplash.com/photo-1489599162026-0b5a10b63e70?w=400&h=600&fit=crop"
        alt="Small"
        title="Small"
        subtitle="Size SM"
        size="sm"
      />
      <Poster
        src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop"
        alt="Medium"
        title="Medium"
        subtitle="Size MD"
        size="md"
      />
      <Poster
        src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop"
        alt="Large"
        title="Large"
        subtitle="Size LG"
        size="lg"
      />
      <Poster
        src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop"
        alt="Extra Large"
        title="Extra Large"
        subtitle="Size XL"
        size="xl"
      />
    </div>
  ),
};

export const WithoutText: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1489599162026-0b5a10b63e70?w=400&h=600&fit=crop',
    alt: 'Movie Poster',
  },
};

export const Interactive: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1489599162026-0b5a10b63e70?w=400&h=600&fit=crop',
    alt: 'Clickable Poster',
    title: 'Click Me!',
    subtitle: '2023 • Interactive',
    onClick: () => alert('Poster clicked!'),
  },
}; 