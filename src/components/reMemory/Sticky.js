import React from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';

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

const StickyWrapper = styled.div`
  border: 1px solid ${colors.darkGrey};
  color: ${colors.brightGrey};
  background-color: ${colors.darkerGrey};
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: space-between;
  font-size: larger;
  padding: 0.5rem 1rem 0rem;
  bottom: 0;
`;

export default Sticky;
