import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { colors } from '../constants/colors';

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: colors.black,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: colors.white,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
        {/* <span
          style={{
            color: colors.white,
            textDecoration: `none`,
          }}
          onClick={() => {
            localStorage.clear();
          }}
        >
          Sign out
        </span> */}
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
