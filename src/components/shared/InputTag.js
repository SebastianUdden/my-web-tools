import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Tags, Tag, FlexWrapper, AddButton } from './commonComponents';
import Suggestions from './Suggestions';

const InputTag = ({ id, inputTags, setInputTags, memories, validate }) => {
  const [inputTag, setInputTag] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const addTag = () => {
    if (
      validate &&
      !memories.filter(m => m.name.toLowerCase() === inputTag.toLowerCase())
        .length
    )
      return;
    const tagFormatted = inputTag && inputTag.replace(/"/g, '');
    !inputTags
      .slice(0, inputTags.length - 1)
      .find(tag => tag === tagFormatted.toLowerCase()) &&
      setInputTags([...inputTags, tagFormatted.trim().toLowerCase()]);
    setInputTag('');
  };

  useEffect(() => {
    if (!inputTag.includes('"')) {
      if (inputTag.endsWith(' ')) {
        addTag();
      }
    }
  }, [inputTag]);

  return (
    <>
      <FlexWrapper>
        <TagInput
          id={id}
          list={`${id}suggestions`}
          value={inputTag}
          onChange={e => {
            setShowSuggestions(true);
            setInputTag(e.target.value);
          }}
          autoComplete="off"
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
            id={`${id}suggestions`}
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
      <Tags>
        {inputTags &&
          inputTags.map(tag => (
            <Tag
              key={tag}
              onClick={e => {
                setInputTags(
                  inputTags.filter(
                    tag =>
                      tag.toLowerCase() !==
                      e.target.innerText
                        .substring(0, e.target.innerText.length - 2)
                        .toLowerCase()
                  )
                );
                document.getElementById(id).focus();
              }}
            >
              {tag} &times;
            </Tag>
          ))}
      </Tags>
    </>
  );
};

const TagInput = styled(Input)`
  width: 85%;
  margin-bottom: 0;
`;

export default InputTag;
