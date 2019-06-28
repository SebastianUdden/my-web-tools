import React from 'react';
import styled from 'styled-components';
import Memory from './Memory';
import { Tags, Tag } from './commonComponents';
import InputTag from './InputTag';

const Search = ({
  searchQueries,
  setSearchQueries,
  setFocus,
  memories,
  setUpdateMemory,
  showDetailedViewFor,
}) => (
  <>
    <SearchWrapper>
      <InputTag
        id="SearchField"
        inputTags={searchQueries}
        setInputTags={setSearchQueries}
        memories={memories}
      />
      <Tags>
        {searchQueries &&
          searchQueries
            .filter(searchQuery => searchQuery)
            .map(searchQuery => (
              <Tag
                key={searchQuery}
                onClick={() =>
                  setSearchQueries(
                    searchQueries.filter(sq => sq !== searchQuery)
                  )
                }
              >
                {searchQuery} &times;
              </Tag>
            ))}
      </Tags>
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
`;
const SearchResults = styled.ul`
  margin: 0;
`;

export default Search;
