import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Simple Plus Icon Component for testing
const PlusIcon = () => (
  <svg 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className="w-full h-full"
  >
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'surface', value: '#131314' },
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outline', 'ghost', 'image'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle text (only visible on lg size)',
    },
    icon: {
      control: false,
      description: 'Optional icon element',
    },
    backgroundImage: {
      control: 'text',
      description: 'Background image URL for image variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Variants
export const Filled: Story = {
  args: {
    variant: 'filled',
    children: 'Filled Button',
    icon: <PlusIcon />,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
    icon: <PlusIcon />,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
    icon: <PlusIcon />,
  },
};

export const ImageButton: Story = {
  args: {
    variant: 'image',
    children: 'Image Button',
    icon: <PlusIcon />,
    backgroundImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=160&h=64&fit=crop',
  },
};

// Size Variants
export const SmallSize: Story = {
  name: 'Size: Small (48px)',
  args: {
    variant: 'filled',
    size: 'sm',
    children: 'Small Button',
    icon: <PlusIcon />,
  },
};

export const MediumSize: Story = {
  name: 'Size: Medium (48px)',
  args: {
    variant: 'filled',
    size: 'md',
    children: 'Medium Button',
    icon: <PlusIcon />,
  },
};

export const LargeSize: Story = {
  name: 'Size: Large (64px)',
  args: {
    variant: 'filled',
    size: 'lg',
    children: 'Large Button',
    icon: <PlusIcon />,
  },
};

// With Subtitles (only on large size)
export const WithSubtitle: Story = {
  name: 'Large with Subtitle',
  args: {
    variant: 'filled',
    size: 'lg',
    children: 'Main Title',
    subtitle: 'Subtitle text',
    icon: <PlusIcon />,
  },
};

export const OutlineWithSubtitle: Story = {
  name: 'Outline with Subtitle',
  args: {
    variant: 'outline',
    size: 'lg',
    children: 'Main Title',
    subtitle: 'Subtitle text',
    icon: <PlusIcon />,
  },
};

export const ImageWithSubtitle: Story = {
  name: 'Image with Subtitle',
  args: {
    variant: 'image',
    size: 'lg',
    children: 'Main Title',
    subtitle: 'Subtitle text',
    icon: <PlusIcon />,
    backgroundImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=160&h=64&fit=crop',
  },
};

// Without Icons
export const FilledNoIcon: Story = {
  name: 'Filled (No Icon)',
  args: {
    variant: 'filled',
    children: 'Button Text',
  },
};

export const OutlineNoIcon: Story = {
  name: 'Outline (No Icon)',
  args: {
    variant: 'outline',
    children: 'Button Text',
  },
};

// States
export const Disabled: Story = {
  args: {
    variant: 'filled',
    children: 'Disabled Button',
    icon: <PlusIcon />,
    disabled: true,
  },
};

export const FocusDemo: Story = {
  name: 'Focus State Demo',
  render: () => (
    <div className="space-y-4">
      <p className="text-tv-compose-on-surface text-tv-body-small mb-4">
        Click buttons to see focus states (110% scale + shadows)
      </p>
      <div className="flex gap-4 flex-wrap">
        <Button variant="filled" icon={<PlusIcon />}>
          Filled
        </Button>
        <Button variant="outline" icon={<PlusIcon />}>
          Outline
        </Button>
        <Button variant="ghost" icon={<PlusIcon />}>
          Ghost
        </Button>
        <Button 
          variant="image" 
          icon={<PlusIcon />}
          backgroundImage="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=160&h=64&fit=crop"
        >
          Image
        </Button>
      </div>
    </div>
  ),
};

// All Variants Showcase
export const AllVariants: Story = {
  name: 'All Variants Showcase',
  render: () => (
    <div className="space-y-8">
      {/* Small Size */}
      <div className="space-y-2">
        <h3 className="text-tv-compose-on-surface text-tv-label-large">Small (48px)</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="filled" size="sm" icon={<PlusIcon />}>Filled</Button>
          <Button variant="outline" size="sm" icon={<PlusIcon />}>Outline</Button>
          <Button variant="ghost" size="sm" icon={<PlusIcon />}>Ghost</Button>
          <Button 
            variant="image" 
            size="sm" 
            icon={<PlusIcon />}
            backgroundImage="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=160&h=48&fit=crop"
          >
            Image
          </Button>
        </div>
      </div>

      {/* Medium Size */}
      <div className="space-y-2">
        <h3 className="text-tv-compose-on-surface text-tv-label-large">Medium (48px)</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="filled" size="md" icon={<PlusIcon />}>Filled</Button>
          <Button variant="outline" size="md" icon={<PlusIcon />}>Outline</Button>
          <Button variant="ghost" size="md" icon={<PlusIcon />}>Ghost</Button>
          <Button 
            variant="image" 
            size="md" 
            icon={<PlusIcon />}
            backgroundImage="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=160&h=48&fit=crop"
          >
            Image
          </Button>
        </div>
      </div>

      {/* Large Size */}
      <div className="space-y-2">
        <h3 className="text-tv-compose-on-surface text-tv-label-large">Large (64px)</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="filled" size="lg" icon={<PlusIcon />}>Filled</Button>
          <Button variant="outline" size="lg" icon={<PlusIcon />}>Outline</Button>
          <Button variant="ghost" size="lg" icon={<PlusIcon />}>Ghost</Button>
          <Button 
            variant="image" 
            size="lg" 
            icon={<PlusIcon />}
            backgroundImage="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=160&h=64&fit=crop"
          >
            Image
          </Button>
        </div>
      </div>

      {/* Large with Subtitles */}
      <div className="space-y-2">
        <h3 className="text-tv-compose-on-surface text-tv-label-large">Large with Subtitles</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="filled" size="lg" icon={<PlusIcon />} subtitle="Subtitle text">
            Main Title
          </Button>
          <Button variant="outline" size="lg" icon={<PlusIcon />} subtitle="Subtitle text">
            Main Title
          </Button>
          <Button variant="ghost" size="lg" icon={<PlusIcon />} subtitle="Subtitle text">
            Main Title
          </Button>
          <Button 
            variant="image" 
            size="lg" 
            icon={<PlusIcon />}
            subtitle="Subtitle text"
            backgroundImage="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=160&h=64&fit=crop"
          >
            Main Title
          </Button>
        </div>
      </div>
    </div>
  ),
}; 