/** Replace pending entries with confirmed archive content. Never infer dates or POC details. */
export const editions = [
  {
    edition: '1.0',
    title: 'Where the story began.',
    status: 'ARCHIVE IN PROGRESS',
    description:
      'Every tradition starts with a first night of looking up. Photographs, stories, and the people behind our first edition will be collected here.',
    pocName: '',
    pocUrl: '',
  },
  {
    edition: '2.0',
    title: 'Another night. A wider universe.',
    status: 'ARCHIVE IN PROGRESS',
    description:
      'The second chapter of Celestial Dive. We’re gathering the memories and team details that made this edition its own.',
    pocName: '',
    pocUrl: '',
  },
  {
    edition: '3.0',
    title: 'The curiosity kept growing.',
    status: 'ARCHIVE IN PROGRESS',
    description:
      'A space for the third edition’s photographs, highlights, and stories from the people who brought it together.',
    pocName: '',
    pocUrl: '',
  },
  {
    edition: '4.0',
    title: 'More nights worth remembering.',
    status: 'ARCHIVE IN PROGRESS',
    description:
      'The chapter before this one. Confirmed highlights and point-of-contact details from the fourth edition will appear here.',
    pocName: '',
    pocUrl: '',
  },
  {
    edition: '5.0',
    title: 'Our next chapter is above us.',
    status: 'THE NEXT GATHERING',
    description:
      'A new edition. The same irresistible pull of the night sky. Follow along as we bring Celestial Dive 5.0 to life.',
    pocName: '',
    pocUrl: '',
  },
];
export const faqs = [
  {
    question: 'Do I need to know astronomy?',
    answer:
      'No prior astronomy knowledge is needed. Celestial Dive is built around curiosity, shared discoveries, and asking questions. Come as you are.',
  },
  {
    question: 'When and where is Celestial Dive 5.0?',
    answer:
      'The date, timing, and venue are yet to be announced. Confirmed details will be added to this website and shared through VIT Stellar’s official channels.',
  },
  {
    question: 'How do I register?',
    answer:
      'Registration has not opened yet. The official registration link and any participation requirements will be published here when they are confirmed.',
  },
  {
    question: 'Should I bring my own telescope?',
    answer:
      'The equipment arrangements and bring-along list will be shared with the final event instructions. Please check those details before bringing personal equipment.',
  },
  {
    question: 'What will we be able to see?',
    answer:
      'The observing plan will be chosen around the event date, location, and conditions. No specific planet, constellation, or deep-sky object is guaranteed.',
  },
  {
    question: 'What happens if the sky is cloudy?',
    answer:
      'Outdoor observing depends on the weather. Any changes to the plan will be communicated through the official event updates. For questions, contact VIT Stellar at astronomy@vit.ac.in.',
  },
];
export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  edition: string;
  width: number;
  height: number;
};
/** Add approved Celestial Dive photographs to public/assets/gallery and list them here. */
export const photos: Photo[] = [];
