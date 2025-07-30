import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';
import { Text } from '../Text/Text';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container className="bg-gray-800 min-h-64 flex items-center justify-center">
      <Text size="xl" weight="bold">Default Container (XL)</Text>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Container size="sm" className="bg-gray-800 p-4">
        <Text>Small Container</Text>
      </Container>
      <Container size="md" className="bg-gray-700 p-4">
        <Text>Medium Container</Text>
      </Container>
      <Container size="lg" className="bg-gray-600 p-4">
        <Text>Large Container</Text>
      </Container>
      <Container size="xl" className="bg-gray-500 p-4">
        <Text>Extra Large Container</Text>
      </Container>
      <Container size="full" className="bg-gray-400 p-4">
        <Text color="primary">Full Width Container</Text>
      </Container>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Container className="py-8">
      <div className="space-y-6">
        <Text as="h1" size="3xl" weight="bold">TV Component Library</Text>
        <Text size="lg" color="secondary">
          A comprehensive set of components designed specifically for TV and streaming interfaces.
        </Text>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded">
            <Text weight="semibold" className="mb-2">Feature 1</Text>
            <Text size="sm" color="secondary">Focus management</Text>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <Text weight="semibold" className="mb-2">Feature 2</Text>
            <Text size="sm" color="secondary">Keyboard navigation</Text>
          </div>
        </div>
      </div>
    </Container>
  ),
}; 