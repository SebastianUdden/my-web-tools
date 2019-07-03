import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LI, Tags, Tag, Em, MinimalButton } from '../shared/commonComponents';
import { Description } from './Description';

const Memory = ({
  memories,
  memory,
  searchQueries,
  setSearchQueries,
  setFocus,
  setUpdateMemory,
  showDetailedViewFor: detailedViewFor,
}) => {
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(detailedViewFor);
  const {
    _id,
    name,
    description,
    tags,
    parents: parentLinks,
    children: childrenLinks,
  } = memory;

  useEffect(() => {
    setShowDetailedView(detailedViewFor);
  }, [detailedViewFor]);

  const children = childrenLinks.map(
    c => memories.find(s => s._id === c.linkedId) || []
  );
  const parents = parentLinks.map(
    p => memories.find(s => s._id === p.linkedId) || []
  );

  const includesSearchQueries = elements => {
    return searchQueries.every(searchQuery =>
      elements.some(element =>
        element.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  return (
    includesSearchQueries([name, description, ...tags]) && (
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
                      descriptionSummary: false,
                    }
              );
            }}
          >
            {name}
            {showEditButtons && (
              <Edit
                onClick={() =>
                  setUpdateMemory({
                    _id,
                    name,
                    description,
                    tags,
                    parents: parentLinks,
                    children: childrenLinks,
                    count: 0,
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
                      setSearchQueries([...searchQueries, c.name]);
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
              {tags.map(t => (
                <Tag
                  key={t}
                  onClick={() => {
                    setFocus();
                    setSearchQueries([...searchQueries, t]);
                  }}
                >
                  {t}
                </Tag>
              ))}
            </Tags>
          )}
          {showDetailedView.description && (
            <Description description={description} summary={false} />
          )}
          {showDetailedView.descriptionSummary && (
            <Description description={description} summary={true} />
          )}
          {children && children.length !== 0 && showDetailedView.children && (
            <Children>
              {children.map(c => (
                <Child
                  key={c.name}
                  onClick={() => {
                    setFocus();
                    setSearchQueries([...searchQueries, c.name]);
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
