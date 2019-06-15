import React, { useState } from 'react';
import styled from 'styled-components';

import { apiUrl } from '../../constants/urls';
import { colors } from '../../constants/colors';
import { formatDateTime } from '../../utils/helpers';
import { remove, update } from '../../utils/api';

export const Habit = ({ habit, addOccasion, deleteHabit, currentUser }) => {
  const { name, title, description: desc, rank, occasions: occ } = habit;
  const [occasions, setOccasions] = useState(occ);
  const [expandedView, setExpandedView] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [temporaryDescription, setTemporaryDescription] = useState(desc);
  const [description, setDescription] = useState(desc);
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState('');

  const onUpdateOccasion = (id, note) => {
    occasions &&
      setOccasions(
        occasions.map(o => {
          if (o._id === id) {
            return { ...o, note: note };
          } else {
            return o;
          }
        })
      );
    update(
      `${apiUrl}/habits/${habit._id}`,
      {
        ...habit,
        occasions: occasions
          ? occasions.map(o => {
              if (o._id === id) {
                return { ...o, note: note };
              } else {
                return o;
              }
            })
          : [],
      },
      currentUser.username
    );
  };
  const onDeleteOccasion = id => {
    occasions && setOccasions(occasions.filter(o => o._id !== id));
    update(
      `${apiUrl}/habits/${habit._id}`,
      {
        ...habit,
        occasions: occasions ? occasions.filter(o => o._id !== id) : [],
      },
      currentUser.username
    );
  };

  return (
    <Container id={name}>
      <HabitWrapper>
        <Row onClick={() => setExpandedView(!expandedView)}>
          <TopInfoLeft>
            <Rank>{rank}</Rank>
            <TitleTimeWrapper>
              <Title>{title}</Title>
              <Time>
                {occasions.length !== 0 &&
                  formatDateTime(occasions[0].time, true)}
              </Time>
            </TitleTimeWrapper>
          </TopInfoLeft>
          <TopInfoRight>
            <div>
              {!showNote && (
                <Add
                  onClick={e => {
                    e.stopPropagation();
                    setShowNote(true);
                  }}
                >
                  &#x2b;
                </Add>
              )}
              {showNote && (
                <>
                  <Add
                    onClick={e => {
                      e.stopPropagation();
                      addOccasion(name, note);
                      setShowNote(false);
                    }}
                  >
                    &#10003;
                  </Add>
                  <Add
                    onClick={e => {
                      e.stopPropagation();
                      setShowNote(false);
                    }}
                  >
                    &#x2715;
                  </Add>
                </>
              )}
              {expandedView && (
                <Delete
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
                </Delete>
              )}
            </div>
          </TopInfoRight>
        </Row>
        {showNote && (
          <Row>
            <ExpandedContent style={{ width: '100%' }}>
              <LargeNoteInput onChange={e => setNote(e.target.value)} />
            </ExpandedContent>
          </Row>
        )}
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
                {showHistory ? (
                  <>
                    {occasions.map(
                      (occasion, index) =>
                        index < 10 && (
                          <Occasion
                            occasion={occasion}
                            index={index}
                            onUpdateOccasion={onUpdateOccasion}
                            onDeleteOccasion={onDeleteOccasion}
                          />
                        )
                    )}
                    <LI
                      onClick={e => {
                        e.stopPropagation();
                        setShowHistory(false);
                      }}
                    >
                      <SlimButton>Hide history</SlimButton>
                    </LI>
                  </>
                ) : (
                  <LI
                    onClick={e => {
                      e.stopPropagation();
                      setShowHistory(true);
                    }}
                  >
                    <SlimButton>Show history</SlimButton>
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
  margin-left: 0.5rem;
  padding: 0.2rem 0.8rem 0;
  border-radius: 0.2rem;
  opacity: 0.8;

  :hover {
    cursor: pointer;
    opacity: 1;
  }
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
  font-size: small;
  margin: 0;
  padding: 0;
`;

const Em = styled.span`
  color: ${colors.orange};
`;

const SlimButton = styled.span`
  :hover {
    color: ${colors.orange};
  }
`;

const ExpandedContent = styled.div`
  margin-top: 0.5rem;
  border-top: 1px solid #3b3b3b;
`;

const Delete = styled(Add)`
  background-color: #a40000;
`;

const DeleteSymbol = styled(Add)`
  background-color: inherit;
  padding: 0;
  margin: 0;
  margin-left: 0.5rem;
`;

const NoteInput = styled.input`
  background-color: inherit;
  outline: none;
  border: none;
  border-bottom: 1px solid ${colors.orange};
  color: ${colors.orange};
`;

const LargeNoteInput = styled(NoteInput)`
  width: 100%;
`;

const Occasion = ({ occasion, index, onUpdateOccasion, onDeleteOccasion }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [note, setNote] = useState(occasion.note);

  return (
    <LI
      key={occasion.time + '-' + index}
      onClick={e => {
        e.stopPropagation();
        setShowEdit(!showEdit);
        showEdit && onUpdateOccasion(occasion._id, note);
      }}
    >
      <Em>
        {formatDateTime(occasion.time)}
        {occasion.note && ':'}
      </Em>{' '}
      {!showEdit && occasion.note}
      {showEdit && (
        <>
          <NoteInput
            value={note}
            onClick={e => e.stopPropagation()}
            onChange={e => setNote(e.target.value)}
          />
          <DeleteSymbol
            onClick={e => {
              e.stopPropagation();
              onDeleteOccasion(occasion._id);
            }}
          >
            &#x2715;
          </DeleteSymbol>
        </>
      )}
    </LI>
  );
};
