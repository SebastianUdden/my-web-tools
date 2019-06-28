import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';

const Suggestions = ({
  results,
  inputTag,
  setInputTag,
  addTag,
  setShowSuggestions,
}) => {
  const options = results.map(r => (
    <option key={r._id} value={r.name}>
      {r.name}
    </option>
  ));
  return (
    <>
      {results.length > 0 && (
        <SelectChild
          id="SelectChild"
          tabIndex="0"
          size={results.length < 10 ? results.length : 10}
          value={inputTag}
          onChange={e => {
            setInputTag(e.target.value);
            setShowSuggestions(false);
            addTag(e.target.value);
          }}
        >
          {options}
        </SelectChild>
      )}
    </>
  );
};

const Select = styled.select`
  padding: 0.3rem;
  border: 1px solid ${colors.darkGrey};
  background-color: inherit;
  color: inherit;
`;
const SelectChild = styled(Select)`
  width: 85%;
  border-radius: 0;
`;

export default Suggestions;
