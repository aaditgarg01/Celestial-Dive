export const site = {
  name: 'Celestial Dive',
  edition: '5.0',
  contact: { email: 'astronomy@vit.ac.in', label: 'VIT Stellar' },
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/vit_stellar/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/vit-stellar/' },
    { label: 'GitHub', url: 'https://github.com/AstronomyClub-VITStellar' },
  ],
  team: [
    {
      name: 'Aadit Garg',
      profiles: [
        { label: 'GitHub', url: 'https://github.com/aaditgarg01' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aadit-garg22/' },
      ],
    },
    {
      name: 'Darsh L',
      profiles: [
        { label: 'GitHub', url: 'https://github.com/Dracula27581234' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/darsh-lakshmikanth-b83326388/' },
      ],
    },
    {
      name: 'Harsh Choudhary',
      profiles: [
        { label: 'GitHub', url: 'https://github.com/SpyApple-web' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/harsh-choudhary-4b4300424/' },
      ],
    },
    {
      name: 'Rishit Aggarwal',
      profiles: [
        { label: 'GitHub', url: 'https://github.com/aggarwalrishit9' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rishit-aggarwal-88504b419/' },
      ],
    },
    {
      name: 'Sushant Singh',
      profiles: [
        { label: 'GitHub', url: 'https://github.com/singhsushant4684-eng' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sushant-singh-663301378/' },
      ],
    },
    {
      name: 'Ayush Bhuyan',
      profiles: [
        { label: 'GitHub', url: 'https://github.com/ayushbhuyan2008' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ayush-animesh-bhuyan-b732b4377' },
      ],
    },
    {
      name: 'Krishna VP',
      profiles: [
        { label: 'GitHub', url: 'https://github.com/VPK570' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/vp-krishna' },
      ],
    },
  ],
} as const;

export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'The gathering' },
  { id: 'experience', label: 'The experience' },
  { id: 'sky-guide', label: 'Explore the sky' },
  { id: 'legacy', label: 'Past editions' },
  { id: 'glimpses', label: 'Glimpses' },
  { id: 'faq', label: 'Good to know' },
  { id: 'contact', label: 'Contact' },
] as const;

/** Set confirmed details and the official registration URL here. No invented event information. */
export const event = {
  dates: 'To be announced',
  time: 'To be announced',
  venue: 'To be announced',
  registrationUrl: '',
  registrationLabel: 'Registration opens soon',
};
