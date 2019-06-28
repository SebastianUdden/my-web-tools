import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FlexWrapper, Input, AddButton } from './commonComponents';
import Suggestions from './Suggestions';

const InputTag = ({ id, inputTags, setInputTags, memories }) => {
  const [inputTag, setInputTag] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const addTag = t => {
    if (t) {
      !inputTags
        .slice(0, inputTags.length - 1)
        .find(tag => tag === t.toLowerCase()) &&
        setInputTags([...inputTags, t.trim().toLowerCase()]);
    } else {
      inputTag &&
        !inputTags
          .slice(0, inputTags.length - 1)
          .find(tag => tag === inputTag.toLowerCase()) &&
        setInputTags([...inputTags, inputTag.trim().toLowerCase()]);
    }
    setInputTag('');
  };

  useEffect(() => {
    if (inputTag.endsWith(' ')) {
      addTag();
    }
  }, [inputTag]);

  return (
    <>
      <FlexWrapper>
        <TagInput
          id={id}
          value={inputTag}
          onChange={e => {
            setShowSuggestions(true);
            setInputTag(e.target.value);
          }}
          autocomplete="off"
        />
        <AddButton
          onClick={() => {
            addTag();
            document.getElementById(id).focus();
          }}
        >
          +
        </AddButton>
      </FlexWrapper>
      <FlexWrapper>
        {inputTag.length > 0 && showSuggestions && (
          <Suggestions
            addTag={addTag}
            inputTag={inputTag}
            setInputTag={setInputTag}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            results={memories.filter(m =>
              m.name.toLowerCase().includes(inputTag.toLowerCase())
            )}
          />
        )}
      </FlexWrapper>
    </>
  );
};

const TagInput = styled(Input)`
  width: 85%;
  margin-bottom: 0;
`;

export default InputTag;
