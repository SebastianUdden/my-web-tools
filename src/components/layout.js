/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import './layout.css';

const Layout = ({ children }) => (
  <>
    <div
      style={{
        margin: `0 auto`,
        padding: `0 0.2rem 1.45rem`,
        paddingTop: 0,
      }}
    >
      <main>{children}</main>
      <footer />
    </div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
