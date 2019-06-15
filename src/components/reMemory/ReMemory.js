import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { uuidv4 } from '../../utils/helpers';

const mockMemory = [
  {
    _id: uuidv4(),
    name: 'Sports',
    description: 'Collection of all sports related memories',
    createdAt: new Date('2019-06-22'),
    updatedAt: new Date('2019-06-22'),
    dueDate: new Date('2019-06-25'),
    tags: ['Categories'],
    children: [],
    linked: [],
  },
  {
    _id: uuidv4(),
    name: 'Celebrations',
    description: 'Collection of all celebration related memories',
    createdAt: new Date('2019-06-22'),
    updatedAt: new Date('2019-06-22'),
    dueDate: new Date('2019-06-25'),
    tags: ['Categories'],
    children: [],
    linked: [],
  },
  {
    _id: uuidv4(),
    name: 'Padel with Sofia, Alex & Alex',
    description: 'Play padel at pdlcenter',
    createdAt: new Date('2019-06-22'),
    updatedAt: new Date('2019-06-22'),
    dueDate: new Date('2019-06-25'),
    tags: ['sports', 'sofia', 'alex', 'friends', 'padel', 'stockholm'],
    children: [],
    linked: [],
  },
  {
    _id: uuidv4(),
    name: 'Midsummer in hartung',
    description: 'Celebrate with Sofia and the family. Also meet Alex & Alex.',
    createdAt: new Date('2019-06-22'),
    updatedAt: new Date('2019-06-22'),
    dueDate: new Date('2019-06-25'),
    tags: ['celebrations', 'sofia', 'alex', 'family', 'sundsvall', 'midsummer'],
    children: [],
    linked: [],
  },
  {
    _id: uuidv4(),
    name: 'Office party',
    description: 'Festival themed office party at Trädgården.',
    createdAt: new Date('2019-06-22'),
    updatedAt: new Date('2019-06-22'),
    dueDate: new Date('2019-06-25'),
    tags: ['celebrations', 'trädgården', 'festival', 'theme party'],
    children: [],
    linked: [],
  },
  {
    _id: uuidv4(),
    name: 'Bup',
    description: '.',
    createdAt: new Date('2019-06-22'),
    updatedAt: new Date('2019-06-22'),
    dueDate: new Date('2019-06-25'),
    tags: ['dup', 'sports'],
    children: [],
    linked: [],
  },
];

mockMemory.map(memory =>
  memory.children.push(
    ...mockMemory.filter(m =>
      m.tags.some(tag => tag.includes(memory.name.toLowerCase()))
    )
  )
);

export const ReMemory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const q = searchQuery.toLowerCase();
  return (
    <div>
      <Header>ReMemory</Header>
      <Body>
        <SearchWrapper>
          <Search
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Remove>&times;</Remove>
        </SearchWrapper>
        <SearchResults>
          {mockMemory.map(m => {
            return (
              (m.name.toLowerCase().includes(q) ||
                m.description.toLowerCase().includes(q) ||
                m.tags.some(tag => tag.includes(q))) && (
                <LI>
                  <Em>{m.name}</Em>
                  <Tags>
                    {m.tags
                      .filter(t => t.includes(q))
                      .map(t => (
                        <Tag onClick={() => setSearchQuery(t)}>{t}</Tag>
                      ))}
                  </Tags>
                  {m.description}
                  <Tags>
                    {m.children.map(c => (
                      <Child onClick={() => setSearchQuery(c.name)}>
                        {c.name}
                      </Child>
                    ))}
                  </Tags>
                </LI>
              )
            );
          })}
        </SearchResults>
      </Body>
    </div>
  );
};

const Header = styled.h2`
  color: ${colors.brightGrey || 'white'};
`;

const Body = styled.div`
  color: ${colors.brightGrey || 'white'};
  min-width: 40rem;
`;

const LI = styled.li`
  list-style: none;
  margin: 1rem 0;
  padding: 0;
`;

const SearchWrapper = styled.div`
  margin: 0 0.2rem;
  width: 100%;
`;

const Search = styled.input`
  border: none;
  border-bottom: 1px solid ${colors.brightGrey};
  color: ${colors.brightGrey};
  background-color: inherit;
  padding: 0.1rem 0.5rem;
  width: 98%;
  max-width: 15rem;
`;

const Remove = styled.button`
  margin-left: -1.1rem;
  background-color: inherit;
  border: none;
  color: inherit;
`;

const SearchResults = styled.ul`
  margin: 0;
`;

const Tags = styled.p`
  padding: 0.2rem 0;
  margin-bottom: 0;
`;

const Tag = styled.span`
  border: 1px solid ${colors.brightGrey};
  padding: 0.1rem 0.5rem;
  margin: 0 0.2rem;
  opacity: 0.8;

  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const Child = styled(Tag)`
  opacity: 0.3;
`;

const Em = styled.span`
  color: ${colors.orange};
`;
