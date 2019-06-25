import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FlexWrapper, Input, AddButton } from './commonComponents';

const InputTag = ({ id, inputTags, setInputTags }) => {
  const [inputTag, setInputTag] = useState('');

  const addTag = () => {
    inputTag &&
      !inputTags
        .slice(0, inputTags.length - 1)
        .find(tag => tag === inputTag.toLowerCase()) &&
      setInputTags([...inputTags, inputTag.trim().toLowerCase()]);
    setInputTag('');
  };

  useEffect(() => {
    if (inputTag.endsWith(' ')) {
      addTag();
    }
  }, [inputTag]);

  return (
    <FlexWrapper>
      <TagInput
        id={id}
        value={inputTag}
        onChange={e => setInputTag(e.target.value)}
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
  );
};

const TagInput = styled(Input)`
  width: 85%;
  margin-bottom: 0;
`;

export default InputTag;
