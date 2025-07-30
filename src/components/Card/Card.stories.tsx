import type { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardImage, 
  CardText, 
  CardHeading, 
  CardTitle, 
  CardSubtitle, 
  CardDescription, 
  CardTag,
  CardHeader,
  CardContent,
  CardFooter,
} from './Card';

// Sample data for stories
const sampleImage = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=225&fit=crop';
const samplePosterImage = 'https://images.unsplash.com/photo-1489599558652-02c2c3c29c27?w=280&h=400&fit=crop';

// Simple Tag Icon Component
const TagIcon = () => (
  <svg viewBox="0 0 10 10" fill="currentColor" className="w-full h-full">
    <circle cx="5" cy="5" r="3" />
  </svg>
);

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'surface', value: '#1F1F1F' },
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['wide-standard', 'wide-classic', 'compact', 'classic', 'standard'],
      description: 'Card layout variant',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'focused', 'inactive'],
      description: 'Card state',
    },
    focusable: {
      control: 'boolean',
      description: 'Whether the card can receive focus',
    },
    hoverable: {
      control: 'boolean', 
      description: 'Whether the card shows hover effects',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Card Variants
export const WideStandard: Story = {
  name: 'Wide Standard',
  args: {
    variant: 'wide-standard',
    focusable: true,
  },
  render: (args) => (
    <Card {...args}>
      <CardImage 
        src={sampleImage} 
        alt="Sample content"
        aspectRatio="video"
        className="w-[196px] flex-shrink-0"
      />
      <CardText>
        <CardHeading>
          <CardTitle>Amazing Movie Title</CardTitle>
          <CardSubtitle>Action • 2024</CardSubtitle>
        </CardHeading>
      </CardText>
    </Card>
  ),
};

export const WideClassic: Story = {
  name: 'Wide Classic',
  args: {
    variant: 'wide-classic',
    focusable: true,
  },
  render: (args) => (
    <Card {...args}>
      <CardImage 
        src={sampleImage} 
        alt="Sample content"
        aspectRatio="video"
        className="w-[196px] flex-shrink-0"
      />
      <CardText>
        <CardHeading>
          <CardTitle>Classic Layout Card</CardTitle>
          <CardSubtitle>Drama • 2023</CardSubtitle>
        </CardHeading>
        <div className="flex items-center gap-2 mt-2">
          <CardTag>HD</CardTag>
          <CardTag icon={<TagIcon />}>Premium</CardTag>
        </div>
      </CardText>
    </Card>
  ),
};

export const Compact: Story = {
  name: 'Compact',
  args: {
    variant: 'compact',
    focusable: true,
  },
  render: (args) => (
    <Card {...args}>
      <CardImage 
        src={samplePosterImage} 
        alt="Sample poster"
        aspectRatio="portrait"
        className="flex-1"
      />
      <CardText className="p-2">
        <CardHeading>
          <CardTitle className="text-sm">Compact Card</CardTitle>
          <CardSubtitle className="text-xs">Short Title</CardSubtitle>
        </CardHeading>
      </CardText>
    </Card>
  ),
};

export const Classic: Story = {
  name: 'Classic',
  args: {
    variant: 'classic',
    focusable: true,
  },
  render: (args) => (
    <Card {...args}>
      <CardImage 
        src={samplePosterImage} 
        alt="Sample poster"
        aspectRatio="portrait"
        className="flex-1"
      />
      <CardText>
        <CardHeading>
          <CardTitle>Classic Card Layout</CardTitle>
          <CardSubtitle>Adventure • 2024</CardSubtitle>
        </CardHeading>
        <CardDescription>
          This is a longer description that shows how the classic card layout handles more text content with proper spacing and typography.
        </CardDescription>
        <div className="flex flex-wrap gap-1 mt-2">
          <CardTag>4K</CardTag>
          <CardTag>HDR</CardTag>
          <CardTag icon={<TagIcon />}>New</CardTag>
        </div>
      </CardText>
    </Card>
  ),
};

export const Standard: Story = {
  name: 'Standard',
  args: {
    variant: 'standard',
    focusable: true,
  },
  render: (args) => (
    <Card {...args}>
      <CardImage 
        src={sampleImage} 
        alt="Sample content"
        aspectRatio="video"
        className="flex-1"
      />
      <CardText>
        <CardHeading>
          <CardTitle>Standard Card</CardTitle>
          <CardSubtitle>Comedy • 2024</CardSubtitle>
        </CardHeading>
        <div className="flex gap-1 mt-1">
          <CardTag>HD</CardTag>
        </div>
      </CardText>
    </Card>
  ),
};

// Card States
export const DefaultState: Story = {
  name: 'Default State',
  args: {
    variant: 'wide-standard',
    state: 'default',
  },
  render: (args) => (
    <Card {...args}>
      <CardImage 
        src={sampleImage} 
        alt="Sample content"
        aspectRatio="video"
        className="w-[196px] flex-shrink-0"
      />
      <CardText>
        <CardHeading>
          <CardTitle>Default State</CardTitle>
          <CardSubtitle>Normal opacity and styling</CardSubtitle>
        </CardHeading>
      </CardText>
    </Card>
  ),
};

export const FocusedState: Story = {
  name: 'Focused State',
  args: {
    variant: 'wide-standard',
    state: 'focused',
  },
  render: (args) => (
    <Card {...args}>
      <CardImage 
        src={sampleImage} 
        alt="Sample content"
        aspectRatio="video"
        className="w-[196px] flex-shrink-0"
      />
      <CardText>
        <CardHeading>
          <CardTitle>Focused State</CardTitle>
          <CardSubtitle>Enhanced border and shadow</CardSubtitle>
        </CardHeading>
      </CardText>
    </Card>
  ),
};

export const InactiveState: Story = {
  name: 'Inactive State',
  args: {
    variant: 'wide-standard',
    state: 'inactive',
  },
  render: (args) => (
    <Card {...args}>
      <CardImage 
        src={sampleImage} 
        alt="Sample content"
        aspectRatio="video"
        className="w-[196px] flex-shrink-0"
      />
      <CardText>
        <CardHeading>
          <CardTitle>Inactive State</CardTitle>
          <CardSubtitle>Reduced opacity (60%)</CardSubtitle>
        </CardHeading>
      </CardText>
    </Card>
  ),
};

// Interactive Cards
export const InteractiveCard: Story = {
  name: 'Interactive Card',
  args: {
    variant: 'classic',
    focusable: true,
    hoverable: true,
    onClick: () => alert('Card clicked!'),
  },
  render: (args) => (
    <Card {...args}>
      <CardImage 
        src={samplePosterImage} 
        alt="Interactive content"
        aspectRatio="portrait"
        className="flex-1"
      />
      <CardText>
        <CardHeading>
          <CardTitle>Interactive Card</CardTitle>
          <CardSubtitle>Click or focus me!</CardSubtitle>
        </CardHeading>
        <CardDescription>
          This card responds to clicks and focus events with proper accessibility.
        </CardDescription>
      </CardText>
    </Card>
  ),
};

// Legacy Layout (backward compatibility)
export const LegacyLayout: Story = {
  name: 'Legacy Layout',
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <h3 className="text-tv-title-medium text-tv-compose-on-surface">Legacy Card</h3>
      </CardHeader>
      <CardContent>
        <p className="text-tv-body-medium text-tv-compose-on-surface opacity-80">
          This uses the legacy CardHeader, CardContent, and CardFooter components for backward compatibility.
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          <CardTag>Legacy</CardTag>
          <CardTag>Compatible</CardTag>
        </div>
      </CardFooter>
    </Card>
  ),
};

// Component Showcase
export const AllComponents: Story = {
  name: 'Component Showcase',
  render: () => (
    <div className="space-y-6">
      <h2 className="text-tv-title-large text-tv-compose-on-surface mb-4">Card Components</h2>
      
      {/* CardImage variants */}
      <div className="space-y-2">
        <h3 className="text-tv-title-medium text-tv-compose-on-surface">CardImage Aspect Ratios</h3>
        <div className="flex gap-4">
          <div className="space-y-1">
            <CardImage 
              src={sampleImage} 
              alt="Video aspect ratio"
              aspectRatio="video"
              className="w-40"
            />
            <p className="text-tv-label-small text-tv-compose-on-surface text-center">Video (16:9)</p>
          </div>
          <div className="space-y-1">
            <CardImage 
              src={sampleImage} 
              alt="Square aspect ratio"
              aspectRatio="square"
              className="w-32"
            />
            <p className="text-tv-label-small text-tv-compose-on-surface text-center">Square (1:1)</p>
          </div>
          <div className="space-y-1">
            <CardImage 
              src={samplePosterImage} 
              alt="Portrait aspect ratio"
              aspectRatio="portrait"
              className="w-24"
            />
            <p className="text-tv-label-small text-tv-compose-on-surface text-center">Portrait (3:4)</p>
          </div>
        </div>
      </div>

      {/* Typography components */}
      <div className="space-y-2">
        <h3 className="text-tv-title-medium text-tv-compose-on-surface">Typography Components</h3>
        <div className="bg-tv-compose-neutral-10 p-4 rounded-tv-lg w-fit">
          <CardHeading>
            <CardTitle>Card Title</CardTitle>
            <CardSubtitle>Card Subtitle</CardSubtitle>
          </CardHeading>
          <CardDescription className="mt-2">
            This is a card description that can span multiple lines and provides additional context about the content.
          </CardDescription>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <h3 className="text-tv-title-medium text-tv-compose-on-surface">Tags</h3>
        <div className="flex gap-2">
          <CardTag>Simple Tag</CardTag>
          <CardTag icon={<TagIcon />}>With Icon</CardTag>
          <CardTag icon={<TagIcon />}>Premium</CardTag>
        </div>
      </div>
    </div>
  ),
};

// All Variants Grid
export const AllVariants: Story = {
  name: 'All Variants Grid',
  render: () => (
    <div className="space-y-8">
      <h2 className="text-tv-title-large text-tv-compose-on-surface">All Card Variants</h2>
      
      {/* Wide variants */}
      <div className="space-y-4">
        <h3 className="text-tv-title-medium text-tv-compose-on-surface">Wide Variants</h3>
        <div className="flex flex-col gap-4">
          <Card variant="wide-standard" focusable>
            <CardImage 
              src={sampleImage} 
              alt="Wide standard"
              aspectRatio="video"
              className="w-[196px] flex-shrink-0"
            />
            <CardText>
              <CardHeading>
                <CardTitle>Wide Standard</CardTitle>
                <CardSubtitle>Horizontal layout</CardSubtitle>
              </CardHeading>
            </CardText>
          </Card>
          
          <Card variant="wide-classic" focusable>
            <CardImage 
              src={sampleImage} 
              alt="Wide classic"
              aspectRatio="video"
              className="w-[196px] flex-shrink-0"
            />
            <CardText>
              <CardHeading>
                <CardTitle>Wide Classic</CardTitle>
                <CardSubtitle>Classic styling</CardSubtitle>
              </CardHeading>
              <div className="flex gap-1 mt-2">
                <CardTag>HD</CardTag>
              </div>
            </CardText>
          </Card>
        </div>
      </div>

      {/* Vertical variants */}
      <div className="space-y-4">
        <h3 className="text-tv-title-medium text-tv-compose-on-surface">Vertical Variants</h3>
        <div className="flex gap-4">
          <Card variant="compact" focusable>
            <CardImage 
              src={samplePosterImage} 
              alt="Compact"
              aspectRatio="portrait"
              className="flex-1"
            />
            <CardText className="p-2">
              <CardHeading>
                <CardTitle className="text-sm">Compact</CardTitle>
                <CardSubtitle className="text-xs">Small</CardSubtitle>
              </CardHeading>
            </CardText>
          </Card>
          
          <Card variant="standard" focusable>
            <CardImage 
              src={sampleImage} 
              alt="Standard"
              aspectRatio="video"
              className="flex-1"
            />
            <CardText>
              <CardHeading>
                <CardTitle>Standard</CardTitle>
                <CardSubtitle>Medium size</CardSubtitle>
              </CardHeading>
            </CardText>
          </Card>
          
          <Card variant="classic" focusable>
            <CardImage 
              src={samplePosterImage} 
              alt="Classic"
              aspectRatio="portrait"
              className="flex-1"
            />
            <CardText>
              <CardHeading>
                <CardTitle>Classic</CardTitle>
                <CardSubtitle>Full featured</CardSubtitle>
              </CardHeading>
              <CardDescription>
                With description and tags
              </CardDescription>
              <div className="flex gap-1 mt-2">
                <CardTag>4K</CardTag>
                <CardTag>New</CardTag>
              </div>
            </CardText>
          </Card>
        </div>
      </div>
    </div>
  ),
}; 