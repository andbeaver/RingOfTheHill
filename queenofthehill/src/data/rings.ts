const rings = [
  {
    id: 'r1',
    name: 'Solitaire - Twisted Knot Band',
    ct: 1.3,
    url: 'https://i.etsystatic.com/25066512/r/il/981039/6130253057/il_1588xN.6130253057_fr0a.jpg'
  },
  {
    id: 'r2',
    name: 'Solitaire - Deco Band',
    ct: 2.0,
    url: 'https://i.etsystatic.com/54843041/r/il/ef28d7/6353523158/il_1588xN.6353523158_mmnb.jpg'
  },
  {
    id: 'r3',
    name: 'Solitaire - Side Stones',
    ct: 1.0,
    url: 'https://i.etsystatic.com/64957283/r/il/3f9c0d/7897020869/il_794xN.7897020869_i4gr.jpg'
  },
  {
    id: 'r4',
    name: 'Crossover',
    ct: 'Unknown',
    url: 'https://i.etsystatic.com/64955952/r/il/ff2835/7896467575/il_794xN.7896467575_6s0n.jpg'
  },
  {
    id: 'r5',
    name: 'Side Oval',
    ct: 'Unknown',
    url: 'https://i.etsystatic.com/25066512/r/il/a665b5/7428860262/il_794xN.7428860262_fmk2.jpg'
  },
  {
    id: 'r6',
    name: 'Radient w/Side stones',
    ct: 'Unknown',
    url: 'https://i.etsystatic.com/25066512/r/il/7a555e/7627674535/il_794xN.7627674535_r7am.jpg'
  },
  {
    id: 'r7',
    name: 'Solitaire - Twisty Band (Hidden Halo)',
    ct: 1.24,
    url: 'https://i.etsystatic.com/14466790/r/il/0fbdf8/6757437140/il_794xN.6757437140_ogtx.jpg'
  },
  {
    id: 'r8',
    name: 'Oval w/Side Stones and Twisted Knot Band',
    ct: 'Unknown',
    url: 'https://i.etsystatic.com/25066512/r/il/b5b81a/7607780770/il_794xN.7607780770_pb1s.jpg'
  },
  {
    id: 'r9',
    name: 'Solitaire - Crossover 1/2 Pave',
    ct: 1.0,
    url: 'https://i.etsystatic.com/39029584/r/il/87d36a/5875986719/il_794xN.5875986719_cwzw.jpg'
  }
  ,
  {
    id: 'r10',
    name: 'Gothic Bat Wing Garnet',
    ct: 'Unknown',
    url: 'https://i.etsystatic.com/63077778/r/il/5b2508/8005892075/il_1588xN.8005892075_o2xw.jpg'
  },
  {
    id: 'r11',
    name: 'Heart',
    ct: 'Unknown',
    url: 'https://i.etsystatic.com/21916549/r/il/e2c3ad/7910522937/il_1588xN.7910522937_r4jh.jpg'
  },
  {
    id: 'r12',
    name: 'Three Oval Stone Peach Sapphire',
    ct: 'Unknown',
    url: 'https://i.etsystatic.com/63160342/r/il/b167cf/8005687657/il_1588xN.8005687657_lz3d.jpg'
  }
];

export type Ring = {
  id: string;
  name: string;
  url: string;
  ct: number | 'Unknown';
};

export default rings as Ring[];
