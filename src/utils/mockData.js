import { uuidv4 } from './helpers';

export const getMemories = () => {
  const memoriesData = [
    {
      _id: uuidv4(),
      name: 'Programming',
      description: 'Collection of all programming related memories',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['categories'],
    },
    {
      _id: uuidv4(),
      name: 'Sports',
      description: 'Collection of all sports related memories',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['categories'],
    },
    {
      _id: uuidv4(),
      name: 'Celebrations',
      description: 'Collection of all celebration related memories',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['categories'],
    },
    {
      _id: uuidv4(),
      name: 'Padel with Sofia, Alex & Alex',
      description: 'Play padel at pdlcenter',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['sports', 'sofia', 'alex', 'friends', 'padel', 'stockholm'],
    },
    {
      _id: uuidv4(),
      name: 'Midsummer in hartung',
      description:
        'Celebrate with Sofia and the family. Also meet Alex & Alex.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: [
        'celebrations',
        'sofia',
        'alex',
        'family',
        'sundsvall',
        'midsummer',
      ],
    },
    {
      _id: uuidv4(),
      name: 'Office party',
      description: 'Festival themed office party at Trädgården.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['celebrations', 'trädgården', 'festival', 'theme party'],
    },
    {
      _id: uuidv4(),
      name: 'HTML',
      description: 'All you need to know about HTML.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['programming', 'web', 'syntax'],
    },
    {
      _id: uuidv4(),
      name: 'JavaScript',
      description: 'All you need to know about JavaScript.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['programming', 'web', 'syntax'],
    },
    {
      _id: uuidv4(),
      name: 'CSS',
      description: 'All you need to know about CSS.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['programming', 'web', 'syntax'],
    },
    {
      _id: uuidv4(),
      name: 'ES6',
      description: 'All you need to know about ES6.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['javascript', 'programming', 'web', 'syntax'],
    },
    {
      _id: uuidv4(),
      name: 'React',
      description: 'All you need to know about React.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: [
        'javascript',
        'programming',
        'web',
        'syntax',
        'dw online sales tech-stack',
      ],
    },
    {
      _id: uuidv4(),
      name: 'Node',
      description: 'All you need to know about Node.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: [
        'javascript',
        'programming',
        'web',
        'syntax',
        'dw online sales tech-stack',
      ],
    },
    {
      _id: uuidv4(),
      name: 'Vue',
      description: 'All you need to know about Vue.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['javascript', 'programming', 'web', 'syntax'],
    },
    {
      _id: uuidv4(),
      name: 'Styled Components',
      description: 'All you need to know about Styled Components.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: [
        'css',
        'javascript',
        'programming',
        'web',
        'syntax',
        'dw online sales tech-stack',
      ],
    },
    {
      _id: uuidv4(),
      name: 'GraphQL',
      description: 'All you need to know about GraphQL.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: [
        'db',
        'API',
        'programming',
        'javascript',
        'web',
        'syntax',
        'dw online sales tech-stack',
      ],
    },
    {
      _id: uuidv4(),
      name: 'MongoDB',
      description: 'All you need to know about MongoDB.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: [
        'db',
        'javascript',
        'programming',
        'web',
        'syntax',
        'my-web-tools tech-stack',
      ],
    },
    {
      _id: uuidv4(),
      name: 'Array.some()',
      description:
        'The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['es6', 'array', 'syntax'],
    },
    {
      _id: uuidv4(),
      name: 'Array.map()',
      description:
        'The map() method creates a new array with the results of calling a provided function on every element in the calling array.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['es6', 'array', 'syntax'],
    },
    {
      _id: uuidv4(),
      name: 'Array.reduce()',
      description:
        'The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['es6', 'array', 'syntax'],
    },
    {
      _id: uuidv4(),
      name: 'Array.filter()',
      description:
        'The filter() method creates a new array with all elements that pass the test implemented by the provided function.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['es6', 'array', 'syntax'],
    },
    {
      _id: uuidv4(),
      name: 'Array.find()',
      description:
        'The find() method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['es6', 'array', 'syntax'],
    },
    {
      _id: uuidv4(),
      name: 'Array.find()',
      description:
        'The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['es6', 'array', 'syntax'],
    },
    {
      _id: uuidv4(),
      name: 'Array',
      description:
        'The JavaScript array is written as [] and contains a pletora of helpful functions to manipulate it.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['javascript'],
    },
    {
      _id: uuidv4(),
      name: 'Const',
      description: 'The const is an ES6 variable.',
      createdAt: new Date('2019-06-22'),
      updatedAt: new Date('2019-06-22'),
      dueDate: new Date('2019-06-25'),
      tags: ['javascript', 'es6'],
    },
  ];

  // Add children links to mock array
  const memoriesData2 = memoriesData.map(memory => ({
    ...memory,
    links: memoriesData
      .filter(m => m.tags.some(tag => tag.includes(memory.name.toLowerCase())))
      .map(m => ({
        _id: uuidv4(),
        type: 'link',
        name: 'child',
        linkedId: m._id,
      })),
  }));
  // Add parent links to mock array
  const memories = memoriesData2.map(memory => ({
    ...memory,
    links: memory.links.concat(
      memoriesData2
        .filter(m =>
          m.links.some(
            link => link.name === 'child' && link.linkedId === memory._id
          )
        )
        .map(m => ({
          _id: uuidv4(),
          type: 'link',
          name: 'parent',
          linkedId: m._id,
        }))
    ),
  }));
  return memories;
};
