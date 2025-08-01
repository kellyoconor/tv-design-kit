import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 65,
    className: 'w-64',
  },
};

export const WithLabel: Story = {
  args: {
    value: 45,
    showLabel: true,
    className: 'w-64',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div>
        <p className="text-sm text-gray-300 mb-2">Small</p>
        <Progress value={30} size="sm" />
      </div>
      <div>
        <p className="text-sm text-gray-300 mb-2">Medium</p>
        <Progress value={65} size="md" />
      </div>
      <div>
        <p className="text-sm text-gray-300 mb-2">Large</p>
        <Progress value={80} size="lg" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div className="space-y-2">
        <Progress value={65} color="primary" />
        <div className="text-sm text-tv-compose-neutral-80">Primary</div>
      </div>
      <div className="space-y-2">
        <Progress value={45} color="secondary" />
        <div className="text-sm text-tv-compose-neutral-80">Secondary</div>
      </div>
      <div className="space-y-2">
        <Progress value={90} color="success" />
        <div className="text-sm text-tv-compose-neutral-80">Success</div>
      </div>
      <div className="space-y-2">
        <Progress value={70} color="error" />
        <div className="text-sm text-tv-compose-neutral-80">Warning</div>
      </div>
      <div className="space-y-2">
        <Progress value={25} color="error" />
      </div>
    </div>
  ),
};

export const VideoProgress: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <div className="flex justify-between text-sm text-gray-300">
        <span>The Amazing Movie</span>
        <span>45 min remaining</span>
      </div>
      <Progress value={65} color="primary" showLabel />
    </div>
  ),
}; 