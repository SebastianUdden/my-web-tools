import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { getMemories } from '../../utils/mockData';

const getLinksOfType = (memories, memoryIndex, links, name) => {
  if (!links.length) return undefined;
  return links
    .filter(link => link.name === name)
    .map(link => memories[memoryIndex.indexOf(link.linkedId)]);
};

export const ReMemory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [memories, setMemories] = useState(getMemories());
  const q = searchQuery.toLowerCase();

  useEffect(() => {
    const memoryIndex = memories.map(m => m._id);
    setMemories(
      memories.map(memory => ({
        ...memory,
        children: getLinksOfType(memories, memoryIndex, memory.links, 'child'),
        parents: getLinksOfType(memories, memoryIndex, memory.links, 'parent'),
      }))
    );
  }, []);

  const sortedMemories = memories.sort();

  return (
    <>
      <Container>
        <Header>ReMemory</Header>
        <Body>
          <SearchWrapper>
            <Search
              id="SearchField"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Remove
              onClick={() => {
                setSearchQuery('');
                document.getElementById('SearchField').focus();
              }}
            >
              &times;
            </Remove>
          </SearchWrapper>
          <SearchResults>
            {sortedMemories &&
              sortedMemories.map(m => {
                return (
                  (m.name.toLowerCase().includes(q) ||
                    m.description.toLowerCase().includes(q) ||
                    m.tags.some(tag => tag.includes(q))) && (
                    <LI>
                      {m.parents && (
                        <Parents>
                          <Em>{m.name}</Em>
                          {m.parents.map(c => (
                            <Parent onClick={() => setSearchQuery(c.name)}>
                              {c.name}
                            </Parent>
                          ))}
                        </Parents>
                      )}
                      {!m.parents && <Em>{m.name}</Em>}
                      <Tags>
                        {m.tags.map(t => (
                          <Tag onClick={() => setSearchQuery(t)}>{t}</Tag>
                        ))}
                      </Tags>
                      {m.description}
                      {m.children && (
                        <Children>
                          {m.children.map(c => (
                            <Child onClick={() => setSearchQuery(c.name)}>
                              {c.name}
                            </Child>
                          ))}
                        </Children>
                      )}
                    </LI>
                  )
                );
              })}
          </SearchResults>
        </Body>
      </Container>
      <Sticky onClick={() => document.getElementById('SearchField').focus()}>
        <span>&#x2303;</span>
        <span>&#x2303;</span>
      </Sticky>
    </>
  );
};

const Container = styled.div`
  max-width: 90vw;
  margin-bottom: 3rem;
`;

const Header = styled.h2`
  color: ${colors.brightGrey || 'white'};
`;

const Body = styled.div`
  color: ${colors.brightGrey || 'white'};
`;

const Sticky = styled.div`
  border: 1px solid ${colors.darkGrey};
  color: ${colors.brightGrey};
  background-color: ${colors.darkerGrey};
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: space-between;
  font-size: larger;
  padding: 1rem 1rem 0.5rem;
  bottom: 0;
`;

const LI = styled.li`
  list-style: none;
  margin: 1rem 0;
  padding: 0;
`;

const SearchWrapper = styled.div`
  margin: 0 0.2rem;
  width: 100vw;
`;

const Search = styled.input`
  border: none;
  border-bottom: 1px solid ${colors.brightGrey};
  color: ${colors.brightGrey};
  background-color: inherit;
  padding: 0.1rem 0.5rem;
  width: 98%;
  max-width: 85vw;
`;

const Remove = styled.button`
  margin-left: -1.3rem;
  background-color: inherit;
  border: none;
  color: inherit;
`;

const SearchResults = styled.ul`
  margin: 0;
`;

const Tags = styled.div`
  padding: 0.2rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  div:nth-child(3) {
    margin-top: -0.01rem;
    border: 1px solid red;
  }
`;

const Tag = styled.span`
  border: 1px solid ${colors.brightGrey};
  padding: 0.1rem 0.5rem;
  margin: 0.2rem;
  opacity: 0.8;

  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const Children = styled(Tags)``;
const Child = styled(Tag)`
  opacity: 0.3;
`;
const Parents = styled(Tags)``;
const Parent = styled(Tag)`
  opacity: 0.3;
`;

const Em = styled.span`
  color: ${colors.orange};
`;
