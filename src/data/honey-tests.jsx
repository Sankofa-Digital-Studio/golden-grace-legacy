import { Droplet, Beaker, Flame } from 'lucide-react';
import React from 'react';

export const HONEY_TESTS = [
  {
    title: 'The Thumb Test',
    icon: <Droplet size={32} className="text-amber-500" />,
    instruction: 'Put a drop on your thumb.',
    result: "If it spreads or drips, it's not pure. Real honey stays intact as a solid bead.",
  },
  {
    title: 'The Water Test',
    icon: <Beaker size={32} className="text-amber-500" />,
    instruction: 'Pour honey into a glass of water.',
    result: 'Pure honey settles at the bottom like a lump. Fake honey dissolves immediately.',
  },
  {
    title: 'The Heat Test',
    icon: <Flame size={32} className="text-amber-500" />,
    instruction: 'Heat the honey slightly.',
    result: 'Pure honey caramelizes quickly. Fake honey creates bubbles and never caramelizes.',
  },
];
