import React, { useState } from 'react';
import { Habit } from './habit';
import { DraggableList } from '../draggable/DraggableList';

const mockHabits = [
  {
    name: 'Workout',
    description: 'Every workday morning',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date(), new Date(), new Date()],
    rank: 1,
  },
  {
    name: 'Work on my-web-tools',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    rank: 2,
  },
  {
    name: 'Water plants',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    rank: 3,
  },
  {
    name: 'Clean apartment',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    rank: 4,
  },
  {
    name: 'Sort closets',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    rank: 5,
  },
  {
    name: 'Sell old computers',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    rank: 6,
  },
  {
    name: 'Prepare bachelor party',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    rank: 7,
  },
  {
    name: 'Play badminton',
    description: 'Example',
    startDate: new Date(),
    endDate: new Date(),
    occasions: [new Date()],
    rank: 8,
  },
];

export const Habits = () => {
  const [orderedHabits, setOrderedHabits] = useState(mockHabits);
  return (
    <div>
      <DraggableList listData={orderedHabits} />
    </div>
  );
};

// {orderedHabits.map(habit => {
//   return (
//     habit && (
//       <Habit
//         key={habit.name}
//         {...habit}
//         orderedHabits={orderedHabits}
//         setOrderedHabits={setOrderedHabits}
//       />
//     )
//   );
// })}
