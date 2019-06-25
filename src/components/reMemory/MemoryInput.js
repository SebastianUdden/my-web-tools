import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { apiUrl } from '../../constants/urls';
import { create, update, remove } from '../../utils/api';
import { uuidv4 } from '../../utils/helpers';
import { Input, Button, Tags, Tag } from './commonComponents';

const MemoryInput = ({
  updateMemory,
  setUpdateMemory,
  memoryLinks,
  memories,
  currentUser,
  setShowMemoryInput,
  toggleRefresh,
  setToggleRefresh,
}) => {
  const [inputName, setInputName] = useState(
    updateMemory ? updateMemory.name : ''
  );
  const [inputDescription, setInputDescription] = useState(
    updateMemory ? updateMemory.description : ''
  );
  const [inputTag, setInputTag] = useState('');
  const [inputTags, setInputTags] = useState(
    updateMemory ? updateMemory.tags : []
  );
  const [inputChild, setInputChild] = useState(
    memoryLinks && memoryLinks[0] && memoryLinks[0].name
  );
  const [inputChildren, setInputChildren] = useState(
    memories && updateMemory
      ? updateMemory.children.map(c =>
          memories.find(m => m._id === c.linkedId).name.toLowerCase()
        )
      : []
  );
  const [inputParent, setInputParent] = useState('');
  const [inputParents, setInputParents] = useState(
    memories && updateMemory
      ? updateMemory.parents.map(p =>
          memories.find(m => m._id === p.linkedId).name.toLowerCase()
        )
      : []
  );

  useEffect(() => {
    document.getElementById('InputName').focus();
  }, []);

  return (
    <>
      <InputArea>
        <Label>Name</Label>
        <Input
          id="InputName"
          value={inputName}
          onChange={e => setInputName(e.target.value)}
        />
      </InputArea>
      <InputArea>
        <Label>Description</Label>
        <TextArea
          id="InputDescription"
          value={inputDescription}
          onChange={e => setInputDescription(e.target.value)}
        />
      </InputArea>
      <InputArea>
        <Label>Tags</Label>
        <AddInputWrapper>
          <TagInput
            id="TagInput"
            value={inputTag}
            onChange={e => setInputTag(e.target.value)}
          />
          <AddButton
            onClick={() => {
              inputTag &&
                !inputTags.find(tag => tag === inputTag.toLowerCase()) &&
                setInputTags([...inputTags, inputTag.toLowerCase()]);
              setInputTag('');
              document.getElementById('TagInput').focus();
            }}
          >
            +
          </AddButton>
        </AddInputWrapper>
        <Tags>
          {inputTags &&
            inputTags.map(tag => (
              <Tag
                key={tag}
                onClick={e => {
                  setInputTags(
                    inputTags.filter(
                      tag =>
                        tag !==
                        e.target.innerText.substring(
                          0,
                          e.target.innerText.length - 2
                        )
                    )
                  );
                  document.getElementById('TagInput').focus();
                }}
              >
                {tag} &times;
              </Tag>
            ))}
        </Tags>
      </InputArea>
      <InputArea>
        <Label>Children</Label>
        <AddInputWrapper>
          <SelectChild
            id="SelectChild"
            value={inputChild}
            onChange={e => {
              setInputChild(e.target.value);
            }}
          >
            {memoryLinks
              .filter(
                ml => !inputChildren.some(c => c === ml.name.toLowerCase())
              )
              .map(ml => (
                <option key={ml.name} value={ml.name}>
                  {ml.name}
                </option>
              ))}
          </SelectChild>
          <AddButton
            onClick={() => {
              inputChild &&
                !inputChildren.find(
                  child => child === inputChild.toLowerCase()
                ) &&
                setInputChildren([...inputChildren, inputChild.toLowerCase()]);

              setInputChild(
                memoryLinks.find(
                  l =>
                    !inputChildren.find(child => child === l.name.toLowerCase())
                )
                  ? memoryLinks.find(
                      l =>
                        !inputChildren.find(
                          child => child === l.name.toLowerCase()
                        )
                    ).name
                  : memoryLinks[0].name
              );
              setInputParents(
                inputParents.filter(
                  parent => parent !== inputChild.toLowerCase()
                )
              );
              document.getElementById('SelectChild').focus();
            }}
          >
            +
          </AddButton>
        </AddInputWrapper>
        <Tags>
          {inputChildren &&
            inputChildren.map(child => (
              <Tag
                key={child}
                onClick={e => {
                  setInputChildren(
                    inputChildren.filter(
                      child =>
                        child !==
                        e.target.innerText.substring(
                          0,
                          e.target.innerText.length - 2
                        )
                    )
                  );
                  setInputChild(
                    inputChildren.find(child => child !== inputChild)
                  );
                  document.getElementById('SelectChild').focus();
                }}
              >
                {child} &times;
              </Tag>
            ))}
        </Tags>
      </InputArea>
      <InputArea>
        <Label>Parents</Label>
        <AddInputWrapper>
          <SelectParent
            id="SelectParent"
            value={inputParent}
            onChange={e => {
              setInputParent(e.target.value);
            }}
          >
            {memoryLinks
              .filter(
                ml => !inputParents.some(p => p === ml.name.toLowerCase())
              )
              .map(ml => (
                <option key={ml.name} value={ml.name}>
                  {ml.name}
                </option>
              ))}
          </SelectParent>
          <AddButton
            onClick={() => {
              inputParent &&
                !inputParents.find(
                  parent => parent === inputParent.toLowerCase()
                ) &&
                setInputParents([...inputParents, inputParent.toLowerCase()]);

              setInputParent(
                memoryLinks.find(
                  l =>
                    !inputParents.find(
                      parent => parent === l.name.toLowerCase()
                    )
                )
                  ? memoryLinks.find(
                      l =>
                        !inputParents.find(
                          parent => parent === l.name.toLowerCase()
                        )
                    ).name
                  : memoryLinks[0].name
              );
              setInputChildren(
                inputChildren.filter(
                  child => child !== inputParent.toLowerCase()
                )
              );

              document.getElementById('SelectParent').focus();
            }}
          >
            +
          </AddButton>
        </AddInputWrapper>
        <Tags>
          {inputParents &&
            inputParents.map(parent => (
              <Tag
                key={parent}
                onClick={e => {
                  setInputParents(
                    inputParents.filter(
                      parent =>
                        parent !==
                        e.target.innerText.substring(
                          0,
                          e.target.innerText.length - 2
                        )
                    )
                  );
                  setInputParent(
                    inputParents.find(parent => parent !== inputParent)
                  );
                  document.getElementById('SelectParent').focus();
                }}
              >
                {parent} &times;
              </Tag>
            ))}
        </Tags>
      </InputArea>
      {!updateMemory && (
        <FormButton
          onClick={() => {
            create(
              `${apiUrl}/memories`,
              {
                type: 'Memory',
                name: inputName,
                description: inputDescription,
                tags: inputTags,
                children: inputChildren.map(c => {
                  const link = memories.find(
                    m => c.toLowerCase() === m.name.toLowerCase()
                  );
                  return (
                    link && {
                      _id: uuidv4(),
                      type: 'Link',
                      name: 'child',
                      linkedId: link._id,
                      linkedName: link.name,
                    }
                  );
                }),
                parents: inputParents.map(p => {
                  const link = memories.find(
                    m => p.toLowerCase() === m.name.toLowerCase()
                  );
                  return (
                    link && {
                      _id: uuidv4(),
                      type: 'Link',
                      name: 'parent',
                      linkedId: link._id,
                      linkedName: link.name,
                    }
                  );
                }),
              },
              currentUser.username
            ).then(response => {
              console.log('Successfully created: ', response);
              setShowMemoryInput(false);
              setToggleRefresh(!toggleRefresh);
            });
          }}
        >
          Save memory
        </FormButton>
      )}
      {updateMemory && (
        <>
          <FormButton
            onClick={() => {
              update(
                `${apiUrl}/memories/${updateMemory._id}`,
                {
                  type: 'Memory',
                  name: inputName,
                  description: inputDescription,
                  tags: inputTags,
                  children: inputChildren.map(c => {
                    const link = memories.find(
                      m => c.toLowerCase() === m.name.toLowerCase()
                    );
                    return (
                      link && {
                        _id: uuidv4(),
                        type: 'Link',
                        name: 'child',
                        linkedId: link._id,
                        linkedName: link.name,
                      }
                    );
                  }),
                  parents: inputParents.map(p => {
                    const link = memories.find(
                      m => p.toLowerCase() === m.name.toLowerCase()
                    );
                    return (
                      link && {
                        _id: uuidv4(),
                        type: 'Link',
                        name: 'parent',
                        linkedId: link._id,
                        linkedName: link.name,
                      }
                    );
                  }),
                },
                currentUser.username
              ).then(response => {
                console.log('Successfully updated: ', response);
                setUpdateMemory(undefined);
              });
            }}
          >
            Update memory
          </FormButton>
          <DeleteButton
            onClick={() => {
              remove(
                `${apiUrl}/memories/${updateMemory._id}`,
                currentUser.username
              ).then(response => {
                console.log('Successfully removed: ', response);
                setUpdateMemory(undefined);
              });
            }}
          >
            Delete memory
          </DeleteButton>
        </>
      )}
    </>
  );
};

const TextArea = styled.textarea`
  border: 1px solid ${colors.darkGrey};
  padding: 0.5rem;
  background-color: inherit;
  color: inherit;
  resize: none;
  min-height: 8rem;
`;
const Label = styled.label`
  color: ${colors.orange};
  margin-bottom: 0.3rem;
`;
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;
const AddInputWrapper = styled.div`
  display: flex;
`;
const TagInput = styled(Input)`
  width: 85%;
  margin-bottom: 0;
`;
const AddButton = styled(Button)`
  width: 15%;
  font-size: x-large;
`;
const FormButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;
const DeleteButton = styled(FormButton)`
  border: none;
  background: maroon;
  color: ${colors.white};
`;
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
const SelectParent = styled(Select)`
  width: 85%;
  border-radius: 0;
`;

export default MemoryInput;
