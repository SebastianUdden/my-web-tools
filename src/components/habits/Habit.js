import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from '../../constants/colors';

export const Habit = ({ priority, name, description, occasions }) => {
  const [expandedView, setExpandedView] = useState(false);
  const [expandLatest, setExpandLatest] = useState([
    occasions[0].toLocaleDateString(),
  ]);

  return (
    <HabitWrapper onClick={() => setExpandedView(!expandedView)}>
      <Row>
        <Priority>{priority}</Priority>
        <TopInfo>
          <Name>{name}</Name>
          <Delete>&#x2715;</Delete>
        </TopInfo>
      </Row>
      <UL expandedView={expandedView}>
        {expandLatest.length < 2 && (
          <Latest
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setExpandLatest(
                occasions.map(
                  (occasion, index) =>
                    index < 10 && occasion.toLocaleDateString()
                )
              );
            }}
          >
            {expandLatest}
          </Latest>
        )}
        {expandLatest &&
          expandLatest.length > 2 &&
          expandLatest.map((latest, index) => (
            <Latest
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                setExpandLatest([occasions[0].toLocaleDateString()]);
              }}
            >
              {latest}
            </Latest>
          ))}
      </UL>
      {expandedView && (
        <>
          <Description>{description}</Description>
        </>
      )}
    </HabitWrapper>
  );
};

const HabitWrapper = styled.div`
  padding: 0.8rem 0.8rem 0.4rem;
  margin: 0.5rem auto;
  background-color: ${colors.darkGrey};
  cursor: pointer;
`;

const Description = styled.p``;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0 0 0.2rem;
  border-bottom: 1px solid white;
`;

const TopInfo = styled.div`
  min-width: 16rem;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

const Priority = styled.span`
  border: 1px solid ${colors.white};
  border-radius: 5rem;
  padding: 0.2rem 0.7rem;
  margin-right: 0.5rem;
  margin-top: -0.3rem;
  margin-bottom: 0.7rem;
`;

const Name = styled.label`
  color: ${colors.orange};
`;
const Latest = styled.li`
  margin: 0;
  color: ${colors.brightGrey};
`;
const Delete = styled.label``;

const UL = styled.ul`
  margin: ${p => (p.expandedView ? '1rem' : '0 1rem')};
`;
