import React from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { Button } from './commonComponents';

const Settings = ({
  showDetailedViewFor,
  setShowDetailedViewFor,
  sortType,
  setSortType,
  sortAscending,
  setSortAscending,
}) => {
  const sortTypes = ['name', 'tags', 'description'];

  return (
    <>
      <SearchSettings>
        <Symbol>&#x22CE;</Symbol>{' '}
        {Object.keys(showDetailedViewFor).map(view => (
          <Setting
            key={view}
            selectedSetting={showDetailedViewFor[view]}
            onClick={() => {
              setShowDetailedViewFor({
                ...showDetailedViewFor,
                [view]: !showDetailedViewFor[view],
              });
            }}
          >
            {view}
          </Setting>
        ))}
      </SearchSettings>
      <SearchSettings>
        <Symbol>&#x2195;</Symbol>{' '}
        {sortTypes &&
          sortTypes.map(st => (
            <Setting
              key={st}
              selectedSetting={st === sortType}
              onClick={() => setSortType(st)}
            >
              {st}
            </Setting>
          ))}
        <Setting
          selectedSetting
          onClick={() => setSortAscending(!sortAscending)}
        >
          {sortAscending ? <>&darr;</> : <>&uarr;</>}
        </Setting>
      </SearchSettings>
    </>
  );
};

const SearchSettings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-bottom: 0.5rem;
`;
const Setting = styled(Button)`
  background-color: ${p => (p.selectedSetting ? 'none' : 'inherit')};
  border: ${p => (p.selectedSetting ? 'none' : 'inherit')};
  margin-right: 0.2rem;
  min-width: 2.5rem;
`;
const Symbol = styled.span`
  margin-right: 0.5rem;
  color: ${colors.orange};
  font-size: x-large;
`;

export default Settings;
