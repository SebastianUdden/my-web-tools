import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Container,
  Body,
  Header,
  TabWrapper,
  Tab,
  saveTab,
} from '../shared/commonComponents';
import About from './About';
import { StockAPI } from './stock-api/StockAPI';
import { CryptoAPI } from './CryptoAPI';
import { Tools } from './tools/Tools';

const StockPickersMonthly = () => {
  const [tab, setTab] = useState(sessionStorage.getItem('spm-tab') || 'About');
  const tabs = ['About', 'Tools', 'StockAPI', 'CryptoAPI'];

  return (
    <SPMContainer>
      <Header onClick={() => setTab('About')}>Stock Pickers Monthly</Header>
      <TabWrapper>
        {tabs &&
          tabs.map(x => (
            <Tab
              key={x}
              selected={tab === x}
              onClick={() => saveTab('spm', x, setTab)}
            >
              {x}
            </Tab>
          ))}
      </TabWrapper>
      <Body>
        {tab === 'About' && <About />}
        {tab === 'Tools' && <Tools />}
        {tab === 'StockAPI' && <StockAPI />}
        {tab === 'CryptoAPI' && <CryptoAPI />}
      </Body>
    </SPMContainer>
  );
};

const SPMContainer = styled(Container)`
  width: 100%;
`;

export default StockPickersMonthly;
