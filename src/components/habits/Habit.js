import React, { useState } from 'react';
import styled from 'styled-components';

import { apiUrl } from '../../constants/urls';
import { colors } from '../../constants/colors';
import { formatDateTime } from '../../utils/helpers';
import { remove, update } from '../../utils/api';

export const Habit = ({ habit, addOccasion, deleteHabit, currentUser }) => {
  const { name, title, description: desc, rank, occasions } = habit;
  const [expandedView, setExpandedView] = useState(false);
  const [expandLatest, setExpandLatest] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [temporaryDescription, setTemporaryDescription] = useState(desc);
  const [description, setDescription] = useState(desc);

  return (
    <Container id={name}>
      <HabitWrapper>
        <Row onClick={() => setExpandedView(!expandedView)}>
          <TopInfoLeft>
            <Rank>{rank}</Rank>
            <TitleTimeWrapper>
              <Title>{title}</Title>
              <Time>{formatDateTime(occasions[0], true)}</Time>
            </TitleTimeWrapper>
          </TopInfoLeft>
          <TopInfoRight>
            <div>
              <Add
                onClick={e => {
                  e.stopPropagation();
                  addOccasion(name);
                }}
              >
                &#x2b;
              </Add>
              {expandedView && (
                <DeleteButton
                  onClick={e => {
                    e.preventDefault();
                    remove(
                      `${apiUrl}/habits/${habit._id}`,
                      currentUser.username
                    ).then(response => {
                      deleteHabit(habit._id);
                    });
                  }}
                >
                  &#x2715;
                </DeleteButton>
              )}
            </div>
          </TopInfoRight>
        </Row>
        {expandedView && (
          <ExpandedContent>
            {!editDescription && (
              <Description onClick={() => setEditDescription(true)}>
                {description}
              </Description>
            )}
            {editDescription && (
              <EditWrapper>
                <EditDescription
                  value={temporaryDescription}
                  onChange={e => setTemporaryDescription(e.target.value)}
                />
                <ButtonWrapper>
                  <EditButton
                    onClick={() => {
                      if (temporaryDescription === '') {
                        setTemporaryDescription('Enter description here...');
                      }
                      setDescription(
                        temporaryDescription === ''
                          ? 'Enter description here...'
                          : temporaryDescription
                      );
                      update(
                        `${apiUrl}/habits/${habit._id}`,
                        { ...habit, description: temporaryDescription },
                        currentUser.username
                      );
                      setEditDescription(false);
                    }}
                  >
                    Save
                  </EditButton>
                  <EditButton
                    onClick={() => {
                      setEditDescription(false);
                      setTemporaryDescription(description);
                    }}
                  >
                    Cancel
                  </EditButton>
                </ButtonWrapper>
              </EditWrapper>
            )}
            {occasions.length !== 0 && (
              <UL>
                {expandLatest ? (
                  occasions.map(
                    (occasion, index) =>
                      index < 10 && (
                        <LI
                          key={occasion + '-' + index}
                          onClick={e => {
                            e.stopPropagation();
                            setExpandLatest(!expandLatest);
                          }}
                        >
                          {formatDateTime(occasion)}
                        </LI>
                      )
                  )
                ) : (
                  <LI
                    onClick={e => {
                      e.stopPropagation();
                      setExpandLatest(!expandLatest);
                    }}
                  >
                    Show history
                  </LI>
                )}
              </UL>
            )}
          </ExpandedContent>
        )}
      </HabitWrapper>
    </Container>
  );
};

const Button = styled.button`
  background-color: ${colors.brightGrey};
  border: none;
  color: ${colors.white};
`;

const Container = styled.div`
  display: flex;
  padding: 0.6rem;
`;

const HabitWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  min-width: 16rem;
`;

const TopInfoLeft = styled.div`
  display: flex;
  align-items: center;
`;
const TopInfoRight = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

const Rank = styled.span`
  border: 1px solid ${colors.white};
  border-radius: 5rem;
  padding: 0.2rem 0.6rem;
  margin-right: 0.5rem;
  margin-top: -0.3rem;
`;

const TitleTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.label`
  color: ${colors.white};
  margin-right: 0.5rem;
  line-height: 1rem;
`;
const Time = styled.label`
  color: ${colors.orange};
  font-size: small;
`;

const Add = styled(Button)`
  padding: 0.2rem 0.8rem 0;
  border-radius: 0.2rem;
`;

const Description = styled.p`
  margin: 0.5rem 0;
`;

const EditWrapper = styled.div`
  display: flex;
  margin: 0.5rem 0;
  min-height: 8rem;
`;

const EditDescription = styled.textarea`
  border: 1px solid ${colors.brightGrey};
  padding: 0.5rem;
  background: inherit;
  color: ${colors.darkWhite};
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  min-height: 8rem;
`;
const EditButton = styled(Button)`
  height: 49%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UL = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
`;
const LI = styled.li`
  color: ${colors.orange};
  font-size: small;
  margin: 0;
  padding: 0;
`;

const ExpandedContent = styled.div`
  margin-top: 0.5rem;
  border-top: 1px solid #3b3b3b;
`;

const DeleteButton = styled.span`
  color: ${colors.white};
  border-radius: 1rem;
  margin-left: 0.5rem;
  padding: 0 0.3rem;
  :hover {
    color: ${colors.white};
  }
`;
