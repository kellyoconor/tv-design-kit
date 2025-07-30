import type { Meta, StoryObj } from '@storybook/react';
import { Row } from './Row';
import { Card, CardContent } from '../Card/Card';
import { Text } from '../Text/Text';

const meta: Meta<typeof Row> = {
  title: 'Layout/Row',
  component: Row,
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

const RowItem = ({ height = 'h-16', children }: { height?: string; children: React.ReactNode }) => (
  <Card className={`${height} flex items-center justify-center min-w-16`}>
    <CardContent className="p-2">
      <Text size="sm">{children}</Text>
    </CardContent>
  </Card>
);

export const Default: Story = {
  render: () => (
    <Row>
      <RowItem>Item 1</RowItem>
      <RowItem>Item 2</RowItem>
      <RowItem>Item 3</RowItem>
    </Row>
  ),
};

export const Gaps: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Small Gap</Text>
        <Row gap="sm">
          <RowItem>A</RowItem>
          <RowItem>B</RowItem>
          <RowItem>C</RowItem>
        </Row>
      </div>
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Large Gap</Text>
        <Row gap="xl">
          <RowItem>A</RowItem>
          <RowItem>B</RowItem>
          <RowItem>C</RowItem>
        </Row>
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Align Start</Text>
        <Row align="start" className="h-24 bg-gray-800 rounded">
          <RowItem height="h-8">Short</RowItem>
          <RowItem height="h-16">Tall</RowItem>
          <RowItem height="h-12">Medium</RowItem>
        </Row>
      </div>
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Align Center</Text>
        <Row align="center" className="h-24 bg-gray-800 rounded">
          <RowItem height="h-8">Short</RowItem>
          <RowItem height="h-16">Tall</RowItem>
          <RowItem height="h-12">Medium</RowItem>
        </Row>
      </div>
    </div>
  ),
};

export const Justification: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Justify Between</Text>
        <Row justify="between" className="w-full">
          <RowItem>Left</RowItem>
          <RowItem>Center</RowItem>
          <RowItem>Right</RowItem>
        </Row>
      </div>
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Justify Center</Text>
        <Row justify="center" className="w-full">
          <RowItem>A</RowItem>
          <RowItem>B</RowItem>
          <RowItem>C</RowItem>
        </Row>
      </div>
    </div>
  ),
}; 