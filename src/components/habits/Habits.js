import React, { useState } from 'react';
import styled from 'styled-components';

import { Habit } from './habit';

const habits = [
  {
    name: 'Workout',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date(), new Date(), new Date()],
    priority: 1,
  },
  {
    name: 'Work on my-web-tools',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    priority: 2,
  },
  {
    name: 'Water plants',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    priority: 3,
  },
  {
    name: 'Clean apartment',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    priority: 4,
  },
  {
    name: 'Sort closets',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    priority: 5,
  },
  {
    name: 'Sell old computers',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    priority: 6,
  },
  {
    name: 'Prepare bachelor party',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    priority: 7,
  },
  {
    name: 'Play badminton',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    priority: 8,
  },
];

export const Habits = () => {
  return (
    <div>
      {habits.map(habit => (
        <Habit {...habit} />
      ))}
    </div>
  );
};
