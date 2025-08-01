import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Hero,
  Modal,
  Navigation,
  Poster,
  Progress,
  Row,
  Text,
} from './index';
import './styles/globals.css';

const demoPosters = [
  {
    src: 'https://images.unsplash.com/photo-1489599162026-0b5a10b63e70?w=400&h=600&fit=crop',
    title: 'Sci-Fi Adventure',
    subtitle: '2023 • Action',
  },
  {
    src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
    title: 'Mystery Drama',
    subtitle: '2023 • Thriller',
  },
  {
    src: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
    title: 'Comedy Special',
    subtitle: '2023 • Comedy',
  },
  {
    src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
    title: 'Documentary',
    subtitle: '2023 • Documentary',
  },
];

const navigationItems = [
  { label: 'Home', isActive: true },
  { label: 'Movies', isActive: false },
  { label: 'TV Shows', isActive: false },
  { label: 'My List', isActive: false },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(65);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Container size="full" className="py-8">
        {/* Navigation */}
        <Navigation
          items={navigationItems}
          className="mb-8"
        />

        {/* Hero Section */}
        <Hero
          title="Featured Movie Title"
          description="An epic adventure that will take you on a journey through space and time. Experience stunning visuals and compelling storytelling in this must-watch blockbuster."
          backgroundImage="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop"
          primaryAction={{
            label: 'Watch Now',
            onClick: () => setIsModalOpen(true),
          }}
          secondaryAction={{
            label: 'Add to List',
            onClick: () => console.log('Added to list'),
          }}
          className="mb-12"
        />

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Progress Example */}
          <Card className="p-6">
            <CardHeader>
              <Text as="h2" variant="title-large" weight="semibold">
                Continue Watching
              </Text>
            </CardHeader>
            <CardContent>
              <Row gap="md" align="center">
                <div className="flex-1">
                  <Text variant="body-medium" className="mb-2">
                    The Great Series - S1E5
                  </Text>
                  <Progress
                    value={progress}
                    showLabel
                    color="primary"
                  />
                </div>
                <Button
                  size="sm"
                  onClick={() => setProgress(Math.min(progress + 10, 100))}
                >
                  Update Progress
                </Button>
              </Row>
            </CardContent>
          </Card>

          {/* Trending Movies */}
          <section>
            <Text as="h2" variant="headline-small" weight="bold" className="mb-6">
              Trending Now
            </Text>
            <Grid cols={4} gap="lg">
              {demoPosters.map((poster, index) => (
                <Poster
                  key={index}
                  src={poster.src}
                  alt={poster.title}
                  title={poster.title}
                  subtitle={poster.subtitle}
                  onClick={() => setIsModalOpen(true)}
                  className="transition-transform hover:scale-105"
                />
              ))}
            </Grid>
          </section>

          {/* Component Showcase */}
          <section>
            <Text as="h2" variant="headline-small" weight="bold" className="mb-6">
              Component Showcase
            </Text>
            <Grid cols={2} gap="lg">
              <Card hoverable>
                <CardHeader>
                  <Text as="h3" variant="title-medium" weight="semibold">
                    Buttons
                  </Text>
                </CardHeader>
                <CardContent>
                  <Row gap="sm">
                    <Button variant="filled" size="sm">Primary</Button>
                    <Button variant="outline" size="sm">Secondary</Button>
                    <Button variant="ghost" size="sm">Ghost</Button>
                  </Row>
                </CardContent>
              </Card>

              <Card hoverable>
                <CardHeader>
                  <Text as="h3" variant="title-medium" weight="semibold">
                    Typography
                  </Text>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Text variant="body-small" color="on-surface-variant">Extra Small Text</Text>
                  <Text variant="body-medium">Small Text</Text>
                  <Text variant="body-medium">Base Text</Text>
                  <Text variant="title-medium" weight="semibold">Large Semibold</Text>
                  <Text variant="title-large" weight="bold" color="primary">XL Bold Accent</Text>
                </CardContent>
              </Card>
            </Grid>
          </section>
        </div>
      </Container>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Movie Details"
        size="lg"
      >
        <div className="space-y-4">
          <Text variant="body-medium">
            This is a demo modal showing how the TV component library handles 
            overlays and focus management. Perfect for showing detailed information 
            about movies, shows, or other content.
          </Text>
          <Row gap="md" justify="end">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="filled" onClick={() => setIsModalOpen(false)}>
              Watch Now
            </Button>
          </Row>
        </div>
      </Modal>
    </div>
  );
}

export default App; 