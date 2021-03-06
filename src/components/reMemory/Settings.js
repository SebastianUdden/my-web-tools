import React from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { Button } from '../shared/commonComponents';

const Settings = ({
  showDetailedViewFor,
  setShowDetailedViewFor,
  sortType,
  setSortType,
}) => {
  const sortTypes = [
    { name: 'name', title: 'Name' },
    { name: 'tags', title: 'Tag' },
    { name: 'description', title: 'Desc.' },
  ];
  const showDetailedView = {
    tags: 'Tag',
    parents: 'Parent',
    children: 'Child',
    description: 'Desc',
  };

  return (
    <>
      <SearchSettings>
        <Symbol>&#x22CE;</Symbol>{' '}
        {Object.keys(showDetailedViewFor).map(
          (view, index) =>
            index !== Object.keys(showDetailedViewFor).length - 1 && (
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
                {showDetailedView[view]}
              </Setting>
            )
        )}
      </SearchSettings>
      <SearchSettings>
        <Symbol>&#x2195;</Symbol>{' '}
        {sortTypes &&
          sortTypes.map(st => (
            <Setting
              key={st}
              selectedSetting={st.name === sortType}
              onClick={() => setSortType(st.name)}
            >
              {st.title}
            </Setting>
          ))}
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
  width: 100%;
`;
const Symbol = styled.span`
  margin-right: 0.5rem;
  color: ${colors.orange};
  font-size: x-large;
`;

export default Settings;
