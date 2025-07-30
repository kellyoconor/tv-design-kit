import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'muted', 'accent', 'success', 'warning', 'error'],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is default text',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Text size="xs">Extra Small Text</Text>
      <Text size="sm">Small Text</Text>
      <Text size="base">Base Text</Text>
      <Text size="lg">Large Text</Text>
      <Text size="xl">Extra Large Text</Text>
      <Text size="2xl">2XL Text</Text>
      <Text size="3xl">3XL Text</Text>
      <Text size="4xl">4XL Text</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="normal">Normal Weight</Text>
      <Text weight="medium">Medium Weight</Text>
      <Text weight="semibold">Semibold Weight</Text>
      <Text weight="bold">Bold Weight</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="primary">Primary Color</Text>
      <Text color="secondary">Secondary Color</Text>
      <Text color="muted">Muted Color</Text>
      <Text color="accent">Accent Color</Text>
      <Text color="success">Success Color</Text>
      <Text color="warning">Warning Color</Text>
      <Text color="error">Error Color</Text>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Text as="h1" size="4xl" weight="bold">Heading 1</Text>
      <Text as="h2" size="3xl" weight="bold">Heading 2</Text>
      <Text as="h3" size="2xl" weight="semibold">Heading 3</Text>
      <Text as="h4" size="xl" weight="semibold">Heading 4</Text>
      <Text as="h5" size="lg" weight="medium">Heading 5</Text>
      <Text as="h6" size="base" weight="medium">Heading 6</Text>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Text align="left">Left aligned text</Text>
      <Text align="center">Center aligned text</Text>
      <Text align="right">Right aligned text</Text>
    </div>
  ),
}; 