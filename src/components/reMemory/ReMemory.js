import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { apiUrl } from '../../constants/urls';
import { get } from '../../utils/api';
import MemoryInput from './MemoryInput';
import Sticky from './Sticky';
import Search from './Search';
import Settings from './Settings';

export const ReMemory = ({ currentUser }) => {
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [showMemoryInput, setShowMemoryInput] = useState(true);
  const [showSettings, setShowSettings] = useState(true);
  const [showDetailedViewFor, setShowDetailedViewFor] = useState({
    tags: false,
    parents: false,
    children: false,
    description: false,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [memories, setMemories] = useState([]);
  const [memoryLinks, setMemoryLinks] = useState([]);
  const [updateMemory, setUpdateMemory] = useState(undefined);
  const [sortType, setSortType] = useState('name');
  const [sortAscending, setSortAscending] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    get(`${apiUrl}/memories`, currentUser.username).then(memories => {
      setMemories(memories);
      setMemoryLinks(
        memories.map(memory => ({ name: memory.name, _id: memory._id }))
      );
    });
  }, [toggleRefresh]);

  useEffect(() => {
    if (updateMemory) {
      setShowMemoryInput(true);
    } else {
      setShowMemoryInput(false);
      setToggleRefresh(!toggleRefresh);
    }
  }, [updateMemory]);

  const sortedMemories = memories.sort((a, b) => {
    let sortA = a[sortType];
    let sortB = b[sortType];

    if (
      (Array.isArray(a[sortType]) && a[sortType].length === 0) ||
      (Array.isArray(b[sortType]) && b[sortType].length === 0)
    ) {
      return 0;
    }

    if (Array.isArray(a[sortType])) {
      sortA = a[sortType][0];
    } else {
      sortA = a[sortType];
    }
    if (Array.isArray(b[sortType])) {
      sortB = b[sortType][0];
    } else {
      sortB = b[sortType];
    }
    if (sortA.toLowerCase() < sortB.toLowerCase()) {
      return sortAscending ? -1 : 1;
    }
    if (sortA.toLowerCase() > sortB.toLowerCase()) {
      return sortAscending ? 1 : -1;
    }
    return 0;
  });

  const setFocus = elementId => {
    document.getElementById(elementId).focus();
    document.getElementById(elementId).blur();
  };

  return (
    <>
      <Container>
        <Header onClick={() => setShowMemoryInput(!showMemoryInput)}>
          ReMemory{' '}
          {showMemoryInput ? (
            <SearchIcon>&#9906;</SearchIcon>
          ) : (
            <>
              <AddIcon>+</AddIcon>
              <SettingsIcon
                onClick={e => {
                  e.stopPropagation();
                  setShowSettings(!showSettings);
                }}
              >
                &#x2699;
              </SettingsIcon>
            </>
          )}
        </Header>
        <Body>
          {showMemoryInput && (
            <MemoryInput
              updateMemory={updateMemory}
              setUpdateMemory={setUpdateMemory}
              memoryLinks={memoryLinks}
              memories={memories}
              currentUser={currentUser}
              setShowMemoryInput={setShowMemoryInput}
              toggleRefresh={toggleRefresh}
              setToggleRefresh={setToggleRefresh}
            />
          )}
          {!showMemoryInput && (
            <>
              {showSettings && (
                <Settings
                  showDetailedViewFor={showDetailedViewFor}
                  setShowDetailedViewFor={setShowDetailedViewFor}
                  sortType={sortType}
                  setSortType={setSortType}
                  sortAscending={sortAscending}
                  setSortAscending={setSortAscending}
                />
              )}
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setFocus={() => setFocus('SearchField')}
                memories={sortedMemories}
                setUpdateMemory={setUpdateMemory}
                showDetailedViewFor={showDetailedViewFor}
              />
            </>
          )}
        </Body>
      </Container>
      {!showMemoryInput && (
        <Sticky
          toggleRefresh={toggleRefresh}
          setToggleRefresh={setToggleRefresh}
        />
      )}
    </>
  );
};

const Container = styled.div`
  max-width: 90vw;
  margin-top: 0.3rem;
  margin-bottom: 3rem;
  width: 100vw;
`;

const Header = styled.h2`
  color: ${colors.brightGrey || 'white'};
  display: flex;
  margin-bottom: 0.8rem;

  :hover {
    cursor: pointer;
  }
`;

const Body = styled.div`
  color: ${colors.brightGrey || 'white'};
`;

const SearchIcon = styled.div`
  margin-left: 0.6rem;
  -webkit-transform: translate(0%) rotate(45deg);
  -moz-transform: translate(0%) rotate(45deg);
  -o-transform: translate(0%) rotate(45deg);
  transform: translate(0%) rotate(45deg);
  color: ${colors.darkWhite};
`;
const Icon = styled.span`
  margin-left: 0.6rem;
  color: ${colors.darkWhite};
`;
const AddIcon = styled(Icon)``;
const SettingsIcon = styled(Icon)`
  display: flex;
  align-items: center;
  padding-top: 0.07rem;
  font-size: small;
`;
