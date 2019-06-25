import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LI, Tags, Tag, Em, MinimalButton } from './commonComponents';

const Memory = ({
  memories,
  memory: m,
  query: q,
  setFocus,
  setSearchQuery,
  setUpdateMemory,
  showDetailedViewFor: detailedViewFor,
}) => {
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(detailedViewFor);

  useEffect(() => {
    setShowDetailedView(detailedViewFor);
  }, [detailedViewFor]);

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
      <LI showDetailedView={showDetailedView}>
        <Parents>
          <Name
            onClick={() => {
              setShowEditButtons(!showEditButtons);
              setShowDetailedView(
                showEditButtons
                  ? detailedViewFor
                  : {
                      tags: true,
                      parents: true,
                      children: true,
                      description: true,
                    }
              );
            }}
          >
            {m.name}
            {showEditButtons && (
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
            )}
          </Name>
          {parents &&
            parents.length !== 0 &&
            showDetailedView.parents &&
            parents.map(
              c =>
                c.name && (
                  <Parent
                    key={c.name}
                    onClick={() => {
                      setFocus();
                      setSearchQuery(c.name);
                    }}
                  >
                    {c.name}
                  </Parent>
                )
            )}
        </Parents>
        <>
          {showDetailedView.tags && (
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
          )}
          {showDetailedView.description && m.description}
          {children && children.length !== 0 && showDetailedView.children && (
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
        </>
      </LI>
    )
  );
};

const Children = styled(Tags)``;
const Child = styled(Tag)`
  opacity: 0.5;
`;
const Parents = styled(Tags)``;
const Parent = styled(Tag)`
  opacity: 0.5;
`;
const Name = styled(Em)`
  margin-right: 0.5rem;
`;
const Edit = styled(MinimalButton)`
  margin-left: 0.5rem;
`;

export default Memory;
