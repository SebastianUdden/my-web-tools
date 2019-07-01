import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';

const Suggestions = ({
  id,
  results,
  inputTag,
  setInputTag,
  addTag,
  setShowSuggestions,
}) => {
  const options = results.map((r, index) => (
    <option key={r._id} value={r.name} tabIndex={index}>
      {r.name}
    </option>
  ));
  return (
    <>
      {results.length > 0 && (
        <SuggestionsList
          id={id}
          size={results.length < 10 ? results.length : 10}
          value={inputTag}
          onChange={e => {
            setInputTag(e.target.value);
            setShowSuggestions(false);
            addTag(e.target.value);
          }}
        >
          {options}
        </SuggestionsList>
      )}
    </>
  );
};

const SuggestionsList = styled.datalist`
  padding: 0.3rem;
  border: 1px solid ${colors.darkGrey};
  background-color: ${colors.darkerGrey};
  z-index: 1;
  opacity: 1;
  color: inherit;
  position: fixed;
  width: 85%;
  border-radius: 0;
`;

export default Suggestions;
