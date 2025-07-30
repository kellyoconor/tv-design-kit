import type { Meta, StoryObj } from '@storybook/react';
import { Chip, ChipGroup } from './Chip';
import React from 'react';

// Icons for demonstration
const FilterIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
    <path d="M3 4.5A1.5 1.5 0 014.5 3h7A1.5 1.5 0 0113 4.5v1.086a1.5 1.5 0 01-.44 1.061L9 10.207V13.5a1.5 1.5 0 01-.758 1.302l-1.5.875A1.5 1.5 0 015 14.625V10.207L1.44 6.647A1.5 1.5 0 011 5.586V4.5z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
    <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"/>
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 01-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
    <path fillRule="evenodd" d="M8 2a.5.5 0 01.5.5v5h5a.5.5 0 010 1h-5v5a.5.5 0 01-1 0v-5h-5a.5.5 0 010-1h5v-5A.5.5 0 018 2z" clipRule="evenodd" />
  </svg>
);

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filter', 'input', 'suggestion', 'action'],
    },
    selected: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    focusable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    children: 'Default Chip',
    variant: 'filter',
  },
};

export const Selected: Story = {
  args: {
    children: 'Selected Chip',
    variant: 'filter',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Chip',
    variant: 'filter',
    disabled: true,
  },
};

export const WithLeadingIcon: Story = {
  args: {
    children: 'With Icon',
    variant: 'filter',
    leadingIcon: <FilterIcon />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    children: 'Removable',
    variant: 'input',
    trailingIcon: <CloseIcon />,
    onRemove: () => console.log('Remove clicked'),
  },
};

export const WithImage: Story = {
  args: {
    children: 'Avatar Chip',
    variant: 'input',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face',
    trailingIcon: <CloseIcon />,
    onRemove: () => console.log('Remove clicked'),
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Full Featured',
    variant: 'filter',
    leadingIcon: <HeartIcon />,
    trailingIcon: <CloseIcon />,
    onRemove: () => console.log('Remove clicked'),
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [selectedChips, setSelectedChips] = React.useState<Set<string>>(new Set(['genre1']));
    const [inputChips, setInputChips] = React.useState(['React', 'TypeScript', 'Design System']);

    const toggleChip = (id: string) => {
      const newSelected = new Set(selectedChips);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      setSelectedChips(newSelected);
    };

    const removeInputChip = (index: number) => {
      setInputChips(chips => chips.filter((_, i) => i !== index));
    };

    return (
      <div className="space-y-8 p-8">
        <div>
          <h3 className="text-tv-title-medium text-tv-compose-on-surface mb-4">
            Filter Chips (Multi-select)
          </h3>
          <ChipGroup>
            {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'].map((genre, index) => (
              <Chip
                key={`genre${index}`}
                variant="filter"
                selected={selectedChips.has(`genre${index}`)}
                onSelect={() => toggleChip(`genre${index}`)}
                leadingIcon={<FilterIcon />}
              >
                {genre}
              </Chip>
            ))}
          </ChipGroup>
        </div>

        <div>
          <h3 className="text-tv-title-medium text-tv-compose-on-surface mb-4">
            Input Chips (Removable)
          </h3>
          <ChipGroup>
            {inputChips.map((tech, index) => (
              <Chip
                key={index}
                variant="input"
                trailingIcon={<CloseIcon />}
                onRemove={() => removeInputChip(index)}
              >
                {tech}
              </Chip>
            ))}
          </ChipGroup>
        </div>

        <div>
          <h3 className="text-tv-title-medium text-tv-compose-on-surface mb-4">
            Action Chips
          </h3>
          <ChipGroup>
            <Chip variant="action" leadingIcon={<PlusIcon />} onSelect={() => console.log('Add')}>
              Add to List
            </Chip>
            <Chip variant="action" leadingIcon={<HeartIcon />} onSelect={() => console.log('Like')}>
              Like
            </Chip>
          </ChipGroup>
        </div>
      </div>
    );
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-8">
      <h2 className="text-tv-title-large text-tv-compose-on-surface mb-4">
        Chip Variants & States
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-tv-title-medium text-tv-compose-on-surface mb-3">Filter Chips</h3>
          <ChipGroup className="mb-2">
            <Chip variant="filter">Default</Chip>
            <Chip variant="filter" selected>Selected</Chip>
            <Chip variant="filter" disabled>Disabled</Chip>
            <Chip variant="filter" leadingIcon={<FilterIcon />}>With Icon</Chip>
            <Chip variant="filter" leadingIcon={<FilterIcon />} selected>Selected + Icon</Chip>
          </ChipGroup>
        </div>

        <div>
          <h3 className="text-tv-title-medium text-tv-compose-on-surface mb-3">Input Chips</h3>
          <ChipGroup className="mb-2">
            <Chip variant="input" trailingIcon={<CloseIcon />}>Removable</Chip>
            <Chip variant="input" image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face" trailingIcon={<CloseIcon />}>
              Avatar
            </Chip>
            <Chip variant="input" leadingIcon={<HeartIcon />} trailingIcon={<CloseIcon />}>
              Both Icons
            </Chip>
            <Chip variant="input" disabled trailingIcon={<CloseIcon />}>Disabled</Chip>
          </ChipGroup>
        </div>

        <div>
          <h3 className="text-tv-title-medium text-tv-compose-on-surface mb-3">Suggestion Chips</h3>
          <ChipGroup className="mb-2">
            <Chip variant="suggestion">Quick Action</Chip>
            <Chip variant="suggestion" leadingIcon={<PlusIcon />}>Add Item</Chip>
            <Chip variant="suggestion" disabled>Disabled</Chip>
          </ChipGroup>
        </div>

        <div>
          <h3 className="text-tv-title-medium text-tv-compose-on-surface mb-3">Action Chips</h3>
          <ChipGroup className="mb-2">
            <Chip variant="action" leadingIcon={<PlusIcon />}>Create New</Chip>
            <Chip variant="action" leadingIcon={<HeartIcon />}>Add to Favorites</Chip>
            <Chip variant="action" disabled leadingIcon={<PlusIcon />}>Disabled Action</Chip>
          </ChipGroup>
        </div>
      </div>
    </div>
  ),
};

// Group Layout Demo
export const GroupLayouts: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <h2 className="text-tv-title-large text-tv-compose-on-surface mb-4">
        Chip Group Layouts
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-tv-title-medium text-tv-compose-on-surface mb-3">Horizontal (Default)</h3>
          <ChipGroup gap="md">
            <Chip variant="filter">Action</Chip>
            <Chip variant="filter">Comedy</Chip>
            <Chip variant="filter" selected>Drama</Chip>
            <Chip variant="filter">Horror</Chip>
          </ChipGroup>
        </div>

        <div>
          <h3 className="text-tv-title-medium text-tv-compose-on-surface mb-3">Vertical</h3>
          <ChipGroup orientation="vertical" gap="sm">
            <Chip variant="filter">Action</Chip>
            <Chip variant="filter">Comedy</Chip>
            <Chip variant="filter" selected>Drama</Chip>
            <Chip variant="filter">Horror</Chip>
          </ChipGroup>
        </div>

        <div>
          <h3 className="text-tv-title-medium text-tv-compose-on-surface mb-3">Wrapping</h3>
          <div className="w-[300px]">
            <ChipGroup wrap={true} gap="sm">
              <Chip variant="filter">Action</Chip>
              <Chip variant="filter">Comedy</Chip>
              <Chip variant="filter">Drama</Chip>
              <Chip variant="filter">Horror</Chip>
              <Chip variant="filter">Sci-Fi</Chip>
              <Chip variant="filter">Romance</Chip>
              <Chip variant="filter">Documentary</Chip>
              <Chip variant="filter">Animation</Chip>
            </ChipGroup>
          </div>
        </div>
      </div>
    </div>
  ),
}; 