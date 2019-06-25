import React from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import Memory from './Memory';
import { MinimalButton } from './commonComponents';

const Search = ({
  searchQuery,
  setFocus,
  setSearchQuery,
  memories,
  setUpdateMemory,
  showDetailedViewFor,
}) => (
  <>
    <SearchWrapper>
      <SearchInput
        id="SearchField"
        type="text"
        value={searchQuery}
        onChange={e => {
          setSearchQuery(e.target.value);
        }}
      />
      <Remove
        onClick={() => {
          setSearchQuery('');
          setFocus();
        }}
      >
        &times;
      </Remove>
    </SearchWrapper>
    <SearchResults>
      {memories &&
        memories.map(m => (
          <Memory
            key={m.name}
            memories={memories}
            memory={m}
            query={searchQuery.toLowerCase()}
            setSearchQuery={setSearchQuery}
            setFocus={setFocus}
            setUpdateMemory={setUpdateMemory}
            showDetailedViewFor={showDetailedViewFor}
          />
        ))}
    </SearchResults>
  </>
);

const SearchWrapper = styled.div`
  margin: 0 0 0.5rem;
`;
const SearchInput = styled.input`
  border: 1px solid ${colors.darkGrey};
  color: ${colors.brightGrey};
  background-color: inherit;
  padding: 0.5rem;
  width: 95%;
  max-width: 90vw;
`;
const SearchResults = styled.ul`
  margin: 0;
`;
const Remove = styled(MinimalButton)`
  margin-left: -2.3rem;
`;

export default Search;
