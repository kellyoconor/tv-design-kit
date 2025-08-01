import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display-large', 'display-medium', 'display-small',
        'headline-large', 'headline-medium', 'headline-small',
        'title-large', 'title-medium', 'title-small',
        'label-large', 'label-medium', 'label-small',
        'body-large', 'body-medium', 'body-small'
      ],
    },
    color: {
      control: 'select',
      options: ['on-surface', 'on-surface-variant', 'inverse-surface', 'inverse-on-surface', 'primary', 'secondary', 'tertiary', 'error', 'white', 'black'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is default text',
    variant: 'body-medium',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="body-small">Body Small Text</Text>
      <Text variant="body-medium">Body Medium Text</Text>
      <Text variant="body-large">Body Large Text</Text>
      <Text variant="label-small">Label Small Text</Text>
      <Text variant="label-medium">Label Medium Text</Text>
      <Text variant="label-large">Label Large Text</Text>
      <Text variant="title-small">Title Small Text</Text>
      <Text variant="title-medium">Title Medium Text</Text>
      <Text variant="title-large">Title Large Text</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2 p-4 bg-tv-compose-neutral-10">
      <Text color="on-surface">On Surface</Text>
      <Text color="on-surface-variant">On Surface Variant</Text>
      <Text color="primary">Primary Color</Text>
      <Text color="secondary">Secondary Color</Text>
      <Text color="tertiary">Tertiary Color</Text>
      <Text color="error">Error Color</Text>
      <Text color="white">White Color</Text>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Text as="h1" variant="headline-large" weight="bold">Heading 1</Text>
      <Text as="h2" variant="headline-medium" weight="bold">Heading 2</Text>
      <Text as="h3" variant="headline-small" weight="semibold">Heading 3</Text>
      <Text as="h4" variant="title-large" weight="semibold">Heading 4</Text>
      <Text as="h5" variant="title-medium" weight="medium">Heading 5</Text>
      <Text as="h6" variant="title-small" weight="medium">Heading 6</Text>
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

export const Alignment: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <Text align="left" className="w-full">Left aligned text</Text>
      <Text align="center" className="w-full">Center aligned text</Text>
      <Text align="right" className="w-full">Right aligned text</Text>
    </div>
  ),
}; 