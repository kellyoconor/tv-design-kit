import type { Meta, StoryObj } from '@storybook/react';
import { Column } from './Column';
import { Card, CardContent } from '../Card/Card';
import { Text } from '../Text/Text';

const meta: Meta<typeof Column> = {
  title: 'Layout/Column',
  component: Column,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ColumnItem = ({ width = 'w-32', children }: { width?: string; children: React.ReactNode }) => (
  <Card className={`${width} h-16 flex items-center justify-center`}>
    <CardContent className="p-2">
      <Text size="sm">{children}</Text>
    </CardContent>
  </Card>
);

export const Default: Story = {
  render: () => (
    <Column>
      <ColumnItem>Item 1</ColumnItem>
      <ColumnItem>Item 2</ColumnItem>
      <ColumnItem>Item 3</ColumnItem>
    </Column>
  ),
};

export const Gaps: Story = {
  render: () => (
    <div className="flex gap-8">
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Small Gap</Text>
        <Column gap="sm">
          <ColumnItem>A</ColumnItem>
          <ColumnItem>B</ColumnItem>
          <ColumnItem>C</ColumnItem>
        </Column>
      </div>
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Large Gap</Text>
        <Column gap="xl">
          <ColumnItem>A</ColumnItem>
          <ColumnItem>B</ColumnItem>
          <ColumnItem>C</ColumnItem>
        </Column>
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex gap-8">
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Align Start</Text>
        <Column align="start" className="w-48 bg-gray-800 rounded p-4">
          <ColumnItem width="w-16">Small</ColumnItem>
          <ColumnItem width="w-32">Medium</ColumnItem>
          <ColumnItem width="w-24">Large</ColumnItem>
        </Column>
      </div>
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Align Center</Text>
        <Column align="center" className="w-48 bg-gray-800 rounded p-4">
          <ColumnItem width="w-16">Small</ColumnItem>
          <ColumnItem width="w-32">Medium</ColumnItem>
          <ColumnItem width="w-24">Large</ColumnItem>
        </Column>
      </div>
    </div>
  ),
};

export const Justification: Story = {
  render: () => (
    <div className="flex gap-8">
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Justify Between</Text>
        <Column justify="between" className="h-64">
          <ColumnItem>Top</ColumnItem>
          <ColumnItem>Middle</ColumnItem>
          <ColumnItem>Bottom</ColumnItem>
        </Column>
      </div>
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Justify Center</Text>
        <Column justify="center" className="h-64">
          <ColumnItem>A</ColumnItem>
          <ColumnItem>B</ColumnItem>
          <ColumnItem>C</ColumnItem>
        </Column>
      </div>
    </div>
  ),
}; 