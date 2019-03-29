import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Main } from '../components/main';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Main />
  </Layout>
);

export default IndexPage;
