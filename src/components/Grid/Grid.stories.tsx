import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { Card, CardContent } from '../Card/Card';
import { Text } from '../Text/Text';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    gap: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ number }: { number: number }) => (
  <Card>
    <CardContent className="p-4 text-center">
      <Text>Item {number}</Text>
    </CardContent>
  </Card>
);

export const Default: Story = {
  args: {
    cols: 4,
    gap: 'md',
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 8 }, (_, i) => (
        <GridItem key={i} number={i + 1} />
      ))}
    </Grid>
  ),
};

export const TwoColumns: Story = {
  args: {
    cols: 2,
    gap: 'md',
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <GridItem key={i} number={i + 1} />
      ))}
    </Grid>
  ),
};

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    gap: 'lg',
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 9 }, (_, i) => (
        <GridItem key={i} number={i + 1} />
      ))}
    </Grid>
  ),
};

export const SixColumns: Story = {
  args: {
    cols: 6,
    gap: 'sm',
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 12 }, (_, i) => (
        <GridItem key={i} number={i + 1} />
      ))}
    </Grid>
  ),
};

export const DifferentGaps: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text variant="title-medium" weight="semibold" className="mb-4">Small Gap</Text>
        <Grid cols={4} gap="sm">
          {Array.from({ length: 4 }, (_, i) => (
            <GridItem key={i} number={i + 1} />
          ))}
        </Grid>
      </div>
      <div>
        <Text variant="title-medium" weight="semibold" className="mb-4">Large Gap</Text>
        <Grid cols={4} gap="xl">
          {Array.from({ length: 4 }, (_, i) => (
            <GridItem key={i} number={i + 1} />
          ))}
        </Grid>
      </div>
    </div>
  ),
}; 