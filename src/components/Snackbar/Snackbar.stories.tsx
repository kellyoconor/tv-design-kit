import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar, SnackbarAction } from './Snackbar';
import React from 'react';

// Icons for demonstration
const InfoIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
    <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM9 8a1 1 0 11-2 0v3a1 1 0 102 0V8zm-1-3a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
    <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"/>
  </svg>
);

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'leading-icon', 'trailing-icon', 'both-icons'],
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    autoHideDuration: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
    },
    open: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    children: 'This is a snackbar message',
    open: true,
    variant: 'default',
  },
};

export const WithLeadingIcon: Story = {
  args: {
    children: 'Message with leading icon',
    open: true,
    variant: 'leading-icon',
    leadingIcon: <InfoIcon />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    children: 'Message with trailing icon',
    open: true,
    variant: 'trailing-icon',
    trailingIcon: <CloseIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Message with both icons',
    open: true,
    variant: 'both-icons',
    leadingIcon: <InfoIcon />,
    trailingIcon: <CloseIcon />,
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [variant, setVariant] = React.useState<'default' | 'leading-icon' | 'trailing-icon' | 'both-icons'>('default');

    return (
      <div className="space-y-4 p-8">
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => {
              setVariant('default');
              setOpen(true);
            }}
            className="px-4 py-2 bg-tv-compose-primary-40 text-tv-compose-white rounded-tv-sm hover:bg-tv-compose-primary-50 transition-colors"
          >
            Show Default
          </button>
          
          <button
            onClick={() => {
              setVariant('leading-icon');
              setOpen(true);
            }}
            className="px-4 py-2 bg-tv-compose-primary-40 text-tv-compose-white rounded-tv-sm hover:bg-tv-compose-primary-50 transition-colors"
          >
            Show Leading Icon
          </button>
          
          <button
            onClick={() => {
              setVariant('trailing-icon');
              setOpen(true);
            }}
            className="px-4 py-2 bg-tv-compose-primary-40 text-tv-compose-white rounded-tv-sm hover:bg-tv-compose-primary-50 transition-colors"
          >
            Show Trailing Icon
          </button>
          
          <button
            onClick={() => {
              setVariant('both-icons');
              setOpen(true);
            }}
            className="px-4 py-2 bg-tv-compose-primary-40 text-tv-compose-white rounded-tv-sm hover:bg-tv-compose-primary-50 transition-colors"
          >
            Show Both Icons
          </button>
        </div>

        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          variant={variant}
          leadingIcon={<InfoIcon />}
          trailingIcon={<CloseIcon />}
          autoHideDuration={4000}
          position="bottom"
        >
          This snackbar will auto-hide in 4 seconds
        </Snackbar>
      </div>
    );
  },
};

// All Variants Grid
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-8">
      <h2 className="text-tv-title-large text-tv-compose-on-surface mb-4">
        Snackbar Variants
      </h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-tv-title-medium text-tv-compose-on-surface">Default</h3>
          <div className="relative">
            <Snackbar open={true} variant="default">
              Simple snackbar message
            </Snackbar>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-tv-title-medium text-tv-compose-on-surface">Leading Icon</h3>
          <div className="relative">
            <Snackbar 
              open={true} 
              variant="leading-icon" 
              leadingIcon={<InfoIcon />}
            >
              Message with leading icon
            </Snackbar>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-tv-title-medium text-tv-compose-on-surface">Trailing Icon</h3>
          <div className="relative">
            <Snackbar 
              open={true} 
              variant="trailing-icon" 
              trailingIcon={<CloseIcon />}
            >
              Message with trailing icon
            </Snackbar>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-tv-title-medium text-tv-compose-on-surface">Both Icons</h3>
          <div className="relative">
            <Snackbar 
              open={true} 
              variant="both-icons" 
              leadingIcon={<InfoIcon />}
              trailingIcon={<CloseIcon />}
            >
              Message with both icons
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Position Variants
export const Positions: Story = {
  render: () => (
    <div className="relative w-[800px] h-[600px] bg-tv-compose-neutral-10 rounded-tv-lg p-4">
      <div className="text-tv-title-medium text-tv-compose-on-surface text-center mb-4">
        Snackbar Positions
      </div>
      
      <Snackbar open={true} position="top" variant="leading-icon" leadingIcon={<InfoIcon />}>
        Top position
      </Snackbar>
      
      <Snackbar open={true} position="top-left" variant="leading-icon" leadingIcon={<InfoIcon />}>
        Top Left
      </Snackbar>
      
      <Snackbar open={true} position="top-right" variant="trailing-icon" trailingIcon={<CloseIcon />}>
        Top Right
      </Snackbar>
      
      <Snackbar open={true} position="bottom" variant="both-icons" leadingIcon={<InfoIcon />} trailingIcon={<CloseIcon />}>
        Bottom position
      </Snackbar>
      
      <Snackbar open={true} position="bottom-left" variant="leading-icon" leadingIcon={<InfoIcon />}>
        Bottom Left
      </Snackbar>
      
      <Snackbar open={true} position="bottom-right" variant="trailing-icon" trailingIcon={<CloseIcon />}>
        Bottom Right
      </Snackbar>
    </div>
  ),
}; 