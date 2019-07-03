import React from 'react';
import styled from 'styled-components';
import Memory from './Memory';
import { AddButton } from '../shared/commonComponents';
import InputTag from '../shared/InputTag';

const Search = ({
  searchQueries,
  setSearchQueries,
  setFocus,
  memories,
  setUpdateMemory,
  showDetailedViewFor,
  sortAscending,
  setSortAscending,
}) => (
  <>
    <SearchWrapper>
      <TagWrapper>
        <InputTag
          id="SearchField"
          inputTags={searchQueries}
          setInputTags={setSearchQueries}
          memories={memories}
          validate={false}
        />
      </TagWrapper>
      <SearchOrder onClick={() => setSortAscending(!sortAscending)}>
        {sortAscending ? <>&darr;</> : <>&uarr;</>}
      </SearchOrder>
    </SearchWrapper>
    <SearchResults>
      {memories &&
        memories.map(m => (
          <Memory
            key={m.name}
            memories={memories}
            memory={m}
            searchQueries={searchQueries.filter(searchQuery => searchQuery)}
            setSearchQueries={setSearchQueries}
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
  display: flex;
  width: 100%;
`;
const SearchResults = styled.ul`
  margin: 0;
`;
const TagWrapper = styled.div`
  width: 100%;
`;
const SearchOrder = styled(AddButton)`
  font-size: large;
  margin-left: 0.1rem;
  margin-bottom: 0.5rem;
  max-height: 2.6rem;
`;

export default Search;
