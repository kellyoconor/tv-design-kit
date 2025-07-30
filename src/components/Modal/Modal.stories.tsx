import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalDemo = ({ title, size }: { title?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        size={size}
      >
        <div className="space-y-4">
          <Text>
            This is a modal dialog. It can contain any content you want to display
            as an overlay on top of the main interface.
          </Text>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalDemo title="Default Modal" />,
};

export const WithoutTitle: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo title="Small Modal" size="sm" />,
};

export const Large: Story = {
  render: () => <ModalDemo title="Large Modal" size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalDemo title="Extra Large Modal" size="xl" />,
};

export const MovieDetails: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Show Movie Details</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Movie Details"
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex gap-4">
              <img
                src="https://images.unsplash.com/photo-1489599162026-0b5a10b63e70?w=150&h=225&fit=crop"
                alt="Movie Poster"
                className="w-24 h-36 object-cover rounded"
              />
              <div className="flex-1 space-y-2">
                <Text as="h3" size="xl" weight="bold">The Amazing Movie</Text>
                <Text color="secondary">2023 • Action, Adventure • 2h 15m</Text>
                <Text size="sm">
                  An epic adventure that takes you on a journey through space and time.
                  Experience stunning visuals and compelling storytelling.
                </Text>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button variant="secondary">Add to List</Button>
              <Button variant="primary">Watch Now</Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
}; 