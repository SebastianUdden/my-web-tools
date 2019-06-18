import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { apiUrl } from '../../constants/urls';
import { create, get, update, remove } from '../../utils/api';
import { uuidv4 } from '../../utils/helpers';

export const ReMemory = ({ users, currentUser }) => {
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [showMemoryInput, setShowMemoryInput] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [memories, setMemories] = useState([]);
  const [memoryLinks, setMemoryLinks] = useState([]);
  const [updateMemory, setUpdateMemory] = useState(undefined);
  const [sortType, setSortType] = useState('name');
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    get(`${apiUrl}/memories`, currentUser.username).then(memories => {
      // const memoryIndex = memories.map(m => m._id);
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
    if (a[sortType].toLowerCase() < b[sortType].toLowerCase()) {
      return sortAscending ? -1 : 1;
    }
    if (a[sortType].toLowerCase() > b[sortType].toLowerCase()) {
      return sortAscending ? 1 : 1;
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
            <AddIcon>+</AddIcon>
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
            <Search
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setFocus={() => setFocus('SearchField')}
              memories={sortedMemories}
              setUpdateMemory={setUpdateMemory}
            />
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

const Search = ({
  searchQuery,
  setFocus,
  setSearchQuery,
  memories,
  setUpdateMemory,
}) => (
  <>
    <SearchWrapper>
      <SearchInput
        id="SearchField"
        type="text"
        value={searchQuery}
        onChange={e => {
          setSearchQuery(e.target.value);
        }}
      />
      <Remove
        onClick={() => {
          setSearchQuery('');
          setFocus();
        }}
      >
        &times;
      </Remove>
    </SearchWrapper>
    <SearchResults>
      {memories &&
        memories.map(m => (
          <Memory
            key={m.name}
            memories={memories}
            memory={m}
            query={searchQuery.toLowerCase()}
            setSearchQuery={setSearchQuery}
            setFocus={setFocus}
            setUpdateMemory={setUpdateMemory}
          />
        ))}
    </SearchResults>
  </>
);

const Memory = ({
  memories,
  memory: m,
  query: q,
  setFocus,
  setSearchQuery,
  setUpdateMemory,
}) => {
  const [showEditButtons, setShowEditButtons] = useState(false);
  const children = m.children.map(
    c => memories.find(s => s._id === c.linkedId) || []
  );
  const parents = m.parents.map(
    p => memories.find(s => s._id === p.linkedId) || []
  );
  return (
    (m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.tags.some(tag => tag.includes(q))) && (
      <LI>
        {parents && parents.length !== 0 && (
          <Parents>
            <Name onClick={() => setShowEditButtons(!showEditButtons)}>
              {m.name}
              {showEditButtons && (
                <>
                  <Edit
                    onClick={() =>
                      setUpdateMemory({
                        _id: m._id,
                        name: m.name,
                        description: m.description,
                        tags: m.tags,
                        parents: m.parents,
                        children: m.children,
                      })
                    }
                  >
                    &#x270E;
                  </Edit>
                </>
              )}
            </Name>
            {parents.map(c => (
              <Parent
                key={c.name}
                onClick={() => {
                  setFocus();
                  setSearchQuery(c.name);
                }}
              >
                {c.name}
              </Parent>
            ))}
          </Parents>
        )}
        {!parents ||
          (parents.length === 0 && (
            <Em onClick={() => setShowEditButtons(!showEditButtons)}>
              {m.name}
              {showEditButtons && (
                <>
                  <Edit
                    onClick={() =>
                      setUpdateMemory({
                        _id: m._id,
                        name: m.name,
                        description: m.description,
                        tags: m.tags,
                        parents: m.parents,
                        children: m.children,
                      })
                    }
                  >
                    &#x270E;
                  </Edit>
                </>
              )}
            </Em>
          ))}
        <Tags>
          {m.tags.map(t => (
            <Tag
              key={t}
              onClick={() => {
                setFocus();
                setSearchQuery(t);
              }}
            >
              {t}
            </Tag>
          ))}
        </Tags>
        {m.description}
        {children && children.length !== 0 && (
          <Children>
            {children.map(c => (
              <Child
                key={c.name}
                onClick={() => {
                  setFocus();
                  setSearchQuery(c.name);
                }}
              >
                {c.name}
              </Child>
            ))}
          </Children>
        )}
      </LI>
    )
  );
};

const Sticky = ({ toggleRefresh, setToggleRefresh }) => (
  <StickyWrapper
    onClick={() => {
      document.getElementById('SearchField').focus();
      setToggleRefresh(!toggleRefresh);
    }}
  >
    <span>&#x2303;</span>
    <span>&#x2303;</span>
  </StickyWrapper>
);

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

const StickyWrapper = styled.div`
  border: 1px solid ${colors.darkGrey};
  color: ${colors.brightGrey};
  background-color: ${colors.darkerGrey};
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: space-between;
  font-size: larger;
  padding: 1rem 1rem 0.5rem;
  bottom: 0;
`;

const LI = styled.li`
  list-style: none;
  margin: 1rem 0;
  padding: 0;
`;

const SearchWrapper = styled.div`
  margin: 0rem;
`;

const SearchInput = styled.input`
  border: 1px solid ${colors.darkGrey};
  color: ${colors.brightGrey};
  background-color: inherit;
  padding: 0.5rem;
  width: 100%;
  max-width: 90vw;
`;

const EditButton = styled.button`
  background-color: inherit;
  border: none;
  color: inherit;
`;

const SearchResults = styled.ul`
  margin: 0;
`;

const Tags = styled.div`
  padding: 0.2rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  div:nth-child(3) {
    margin-top: -0.01rem;
    border: 1px solid red;
  }
`;

const Tag = styled.span`
  border: 1px solid ${colors.darkGrey};
  padding: 0.1rem 0.5rem;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
  opacity: 0.9;

  text-transform: lowercase;

  :hover {
    cursor: pointer;
    border: 1px solid ${colors.brightGrey};
    opacity: 1;
  }
`;

const Children = styled(Tags)``;
const Child = styled(Tag)`
  opacity: 0.5;
`;
const Parents = styled(Tags)``;
const Parent = styled(Tag)`
  opacity: 0.5;
`;

const Em = styled.span`
  color: ${colors.orange};
`;

const Button = styled.button`
  background-color: ${p => (p.selected ? colors.brightGrey : colors.darkGrey)};
  color: ${colors.darkWhite};
  padding: 0.5rem;
  border: 1px solid ${colors.darkGrey};
`;
const Input = styled.input`
  padding: 0.3rem;
  border: 1px solid ${colors.darkGrey};
  background-color: inherit;
  color: inherit;
`;
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

const SearchIcon = styled.div`
  margin-left: 0.6rem;
  -webkit-transform: translate(0%) rotate(45deg);
  -moz-transform: translate(0%) rotate(45deg);
  -o-transform: translate(0%) rotate(45deg);
  transform: translate(0%) rotate(45deg);
  color: ${colors.darkWhite};
`;
const AddIcon = styled.span`
  margin-left: 0.6rem;
  color: ${colors.darkWhite};
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
const Name = styled(Em)`
  margin-right: 0.5rem;
`;
const Remove = styled(EditButton)`
  margin-left: -2.3rem;
`;
const Edit = styled(EditButton)`
  margin-left: 0.5rem;
`;
