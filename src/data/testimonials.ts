export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location?: string;
  project?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'anderson-sand-hollow',
    quote:
      'Utah Oasis made the entire process feel easy. The home is everything we hoped for and more.',
    name: 'J. & M. Anderson',
    location: 'Sand Hollow, Utah',
    project: 'Desert View Estate',
  },
  {
    id: 'carter-wasatch',
    quote:
      'Their attention to detail and communication gave us total confidence from day one.',
    name: 'The Carter Family',
    location: 'Wasatch Front',
  },
];
