import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const Em = styled.span`
  color: ${colors.orange};
`;
export const Button = styled.button`
  background-color: ${p => (p.selected ? colors.brightGrey : colors.darkGrey)};
  color: ${colors.darkWhite};
  padding: 0.5rem;
  border: 1px solid ${colors.darkGrey};
`;
export const MinimalButton = styled.button`
  background-color: inherit;
  border: none;
  color: inherit;
`;
export const AddButton = styled(Button)`
  width: 15%;
  font-size: x-large;
`;
export const Input = styled.input`
  padding: 0.3rem;
  border: 1px solid ${colors.darkGrey};
  background-color: inherit;
  color: inherit;
`;
export const Tags = styled.div`
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
export const Tag = styled.span`
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
export const LI = styled.li`
  list-style: none;
  margin: ${p => (p.showDetailedView ? '1rem' : 0)} 0;
  padding: 0;
`;
export const FlexWrapper = styled.div`
  display: flex;
`;
