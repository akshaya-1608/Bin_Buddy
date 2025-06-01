// Tips.js
const tipsByClass = {
  cardboard: {
    label: '🟫 Cardboard',
    recyclability: '✅ Recyclable',
    tips: [
      'Flatten boxes.',
      'Remove tape or labels if possible.',
      'Keep dry — wet cardboard is often rejected.',
    ],
  },
  'e-waste': {
    label: '💻 E-waste',
    recyclability: '⚠ Special Recycling',
    tips: [
      'Do not put in household bins.',
      'Use authorized e-waste collection centers.',
      'Backup and wipe data from devices.',
    ],
  },
  glass: {
    label: '🟩 Glass',
    recyclability: '✅ Recyclable',
    tips: [
      'Rinse bottles/jars.',
      'Remove metal/plastic lids.',
      'Don’t mix broken glass in household recycling — use special bins.',
    ],
  },
  metal: {
    label: '🛠 Metal',
    recyclability: '✅ Recyclable',
    tips: [
      'Rinse food cans.',
      'Crush if possible to save space.',
      'Large scrap metal: take to scrapyard or bulk collection.',
    ],
  },
  organic: {
    label: '🍌 Organic Waste',
    recyclability: '♻ Compostable (not recyclable)',
    tips: [
      'Use a compost bin.',
      'Avoid meat/dairy in home compost.',
      'Wrap in newspaper if municipal collection is available.',
    ],
  },
  paper: {
    label: '📄 Paper',
    recyclability: '✅ Recyclable',
    tips: [
      'Avoid glossy or laminated paper (not recyclable).',
      'Shredded paper is accepted only in clear bags (check locally).',
      'Keep dry and clean.',
    ],
  },
  plastic: {
    label: '🧴 Plastic',
    recyclability: '⚠ Varies by Type',
    tips: [
      'Rinse containers.',
      'Check for recycling symbol (1, 2, sometimes 5 are accepted).',
      'Plastic bags/film: often NOT accepted curbside — use store drop-off.',
    ],
  },
};

export default tipsByClass;
