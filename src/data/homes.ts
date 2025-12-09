export interface Home {
  slug: string;
  name: string;
  location: string;
  headline: string;
  description: string;
  heroImage?: string;
  tags?: string[];
}

export const homes: Home[] = [
  {
    slug: 'desert-view-estate',
    name: 'Desert View Estate',
    location: 'Sand Hollow, Utah',
    headline: 'Modern desert retreat with infinity-edge pool and panoramic views.',
    description:
      'A resort-inspired custom home oriented to sunrise and sunset, with seamless indoor–outdoor living, a courtyard pool, and generous gathering spaces.',
    heroImage: '/images/homes/desert-view-estate.jpg',
    tags: ['Southern Utah', 'Desert Modern', 'Pool'],
  },
  {
    slug: 'red-rock-oasis',
    name: 'Red Rock Oasis',
    location: 'Washington County, Utah',
    headline: 'A private courtyard oasis nestled against red rock cliffs.',
    description:
      'Centered around a protected courtyard with pool and spa, this home creates an intimate retreat while capturing dramatic cliffside views.',
    heroImage: '/images/homes/red-rock-oasis.jpg',
    tags: ['Southern Utah', 'Courtyard', 'Resort-Style'],
  },
];
