import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { apiUrl } from '../../constants/urls';
import { create, update, remove } from '../../utils/api';
import { uuidv4 } from '../../utils/helpers';
import { Input, Button } from './commonComponents';
import InputTag from './InputTag';

const getLinkConfiguration = (type, link) => ({
  _id: uuidv4(),
  type: 'Link',
  name: type,
  linkedId: link._id,
  linkedName: link.name,
});

const MemoryInput = ({
  toggleRefresh,
  setToggleRefresh,
  updateMemory,
  setUpdateMemory,
  memories,
  currentUser,
  setShowMemoryInput,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [inputName, setInputName] = useState(
    updateMemory ? updateMemory.name : ''
  );
  const [inputDescription, setInputDescription] = useState(
    updateMemory ? updateMemory.description : ''
  );
  const [inputTags, setInputTags] = useState(
    updateMemory ? updateMemory.tags : []
  );
  const [inputChildren, setInputChildren] = useState(
    memories && updateMemory
      ? updateMemory.children.map(c =>
          memories.find(m => m._id === c.linkedId).name.toLowerCase()
        )
      : []
  );
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

  useEffect(() => {
    console.log('InputParents: ', inputParents);
  }, [inputParents]);

  useEffect(() => {
    console.log('InputChildren: ', inputChildren);
  }, [inputChildren]);

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
        <InputTag
          id="TagInput"
          inputTags={inputTags}
          setInputTags={setInputTags}
          memories={memories}
          validate={false}
        />
      </InputArea>
      {updateMemory && (
        <>
          <InputArea>
            <Label>Children</Label>
            <InputTag
              id="ChildrenInput"
              inputTags={inputChildren}
              setInputTags={setInputChildren}
              memories={memories}
              validate={true}
            />
          </InputArea>
          <InputArea>
            <Label>Parents</Label>
            <InputTag
              id="ParentInput"
              inputTags={inputParents}
              setInputTags={setInputParents}
              memories={memories}
              validate={true}
            />
          </InputArea>
        </>
      )}
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
                  return link && getLinkConfiguration('child', updateMemory);
                }),
                parents: inputParents.map(p => {
                  const link = memories.find(
                    m => p.toLowerCase() === m.name.toLowerCase()
                  );
                  return link && getLinkConfiguration('parent', updateMemory);
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
                    return link && getLinkConfiguration('child', link);
                  }),
                  parents: inputParents.map(p => {
                    const link = memories.find(
                      m => p.toLowerCase() === m.name.toLowerCase()
                    );
                    return link && getLinkConfiguration('parent', link);
                  }),
                },
                currentUser.username
              ).then(memory => {
                if (
                  memory.children !== updateMemory.children &&
                  memory.children.length < updateMemory.children.length
                ) {
                  // Remove parent of child if removing child
                  const removedChildren = updateMemory.children.filter(
                    child =>
                      !memory.children
                        .map(c => c.linkedId)
                        .includes(child.linkedId)
                  );
                  removedChildren &&
                    removedChildren.map(removedChild => {
                      memories.forEach(m => {
                        if (
                          m._id === removedChild.linkedId &&
                          m.parents.some(p => p.linkedId === memory._id)
                        ) {
                          update(
                            `${apiUrl}/memories/${m._id}`,
                            {
                              ...m,
                              parents: m.parents.filter(
                                p => p.linkedId !== memory._id
                              ),
                            },
                            currentUser.username
                          ).then(response => {
                            setUpdateMemory(undefined);
                            setToggleRefresh(!toggleRefresh);
                          });
                        }
                      });
                    });
                } else if (
                  memory.children !== updateMemory.children &&
                  memory.children.length > updateMemory.children.length
                ) {
                  // Add parent of child if adding child
                  memory.children.forEach(child => {
                    memories.forEach(m => {
                      if (
                        m._id === child.linkedId &&
                        !m.parents.some(
                          parent => parent.linkedId === memory._id
                        )
                      ) {
                        update(
                          `${apiUrl}/memories/${m._id}`,
                          {
                            ...m,
                            parents: [
                              ...m.parents,
                              getLinkConfiguration('parent', updateMemory),
                            ],
                          },
                          currentUser.username
                        ).then(response => {
                          setUpdateMemory(undefined);
                          setToggleRefresh(!toggleRefresh);
                        });
                      }
                    });
                  });
                }

                if (
                  memory.parents !== updateMemory.parents &&
                  memory.parents.length < updateMemory.parents.length
                ) {
                  // Remove child of parent if removing parent
                  const removedParents = updateMemory.parents.filter(
                    parent =>
                      !memory.parents
                        .map(c => c.linkedId)
                        .includes(parent.linkedId)
                  );
                  removedParents &&
                    removedParents.map(removedParent => {
                      memories.forEach(m => {
                        if (
                          m._id === removedParent.linkedId &&
                          m.children.some(p => p.linkedId === memory._id)
                        ) {
                          update(
                            `${apiUrl}/memories/${m._id}`,
                            {
                              ...m,
                              children: m.children.filter(
                                c => c.linkedId !== memory._id
                              ),
                            },
                            currentUser.username
                          ).then(response => {
                            setUpdateMemory(undefined);
                            setToggleRefresh(!toggleRefresh);
                          });
                        }
                      });
                    });
                } else if (
                  memory.parents !== updateMemory.parents &&
                  memory.parents.length > updateMemory.parents.length
                ) {
                  // Add child of parent if adding parent
                  memory.parents.forEach(child => {
                    memories.forEach(m => {
                      if (
                        m._id === child.linkedId &&
                        !m.children.some(child => child.linkedId === memory._id)
                      ) {
                        update(
                          `${apiUrl}/memories/${m._id}`,
                          {
                            ...m,
                            children: [
                              ...m.children,
                              getLinkConfiguration('child', updateMemory),
                            ],
                          },
                          currentUser.username
                        ).then(response => {
                          setUpdateMemory(undefined);
                          setToggleRefresh(!toggleRefresh);
                        });
                      }
                    });
                  });
                }
                setUpdateMemory(undefined);
                setToggleRefresh(!toggleRefresh);
              });
            }}
          >
            Update memory
          </FormButton>
          {!showConfirmDelete && (
            <DeleteButton
              onClick={() => {
                setShowConfirmDelete(!showConfirmDelete);
              }}
            >
              Delete memory
            </DeleteButton>
          )}
          {showConfirmDelete && (
            <>
              <DeleteButton
                confirmDelete
                onClick={() => {
                  setShowConfirmDelete(!showConfirmDelete);
                  remove(
                    `${apiUrl}/memories/${updateMemory._id}`,
                    currentUser.username
                  ).then(response => {
                    console.log('Successfully removed: ', response);
                    setUpdateMemory(undefined);
                    setToggleRefresh(!toggleRefresh);
                  });
                }}
              >
                Confirm DELETE of {updateMemory.name}
              </DeleteButton>
              <FormButton onClick={() => setShowConfirmDelete(false)}>
                Cancel
              </FormButton>
            </>
          )}
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
const FormButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;
const DeleteButton = styled(FormButton)`
  background: maroon;
  border: ${p => (p.confirmDelete ? '1px solid white' : 'none')};
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
