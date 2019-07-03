import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../constants/colors';

const Header = ({
  siteTitle,
  currentUser,
  setCurrentUser,
  setLoginSuccessful,
}) => (
  <header
    style={{
      background: colors.black,
    }}
  >
    <Wrapper>
      <Heading>
        <Link
          to="/"
          onClick={() => {
            sessionStorage.setItem('tab', 'Welcome');
            document.location.reload();
          }}
          style={{
            color: colors.white,
            textDecoration: `none`,
          }}
        >
          {siteTitle}{' '}
        </Link>
        {currentUser && <User>{currentUser.username}</User>}
        <SignOut
          onClick={() => {
            sessionStorage.clear();
            setCurrentUser(undefined);
            setLoginSuccessful(false);
          }}
        >
          Sign Out
        </SignOut>
      </Heading>
    </Wrapper>
  </header>
);

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960;
  padding: 0.3rem 0.5rem;
`;
const Heading = styled.h1`
  margin: 0;
  font-size: medium;
  display: flex;
  justify-content: space-between;
`;
const User = styled.span`
  color: white;
`;
const SignOut = styled.span`
  color: white;
`;

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
