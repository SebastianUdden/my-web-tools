import React, { useState } from 'react';
import {
  Container,
  Body,
  Header,
  TabWrapper,
  Tab,
  saveTab,
} from '../shared/commonComponents';
import { About } from './About';
import { StockAPI } from './StockAPI';
import { CryptoAPI } from './CryptoAPI';
import { Tools } from './tools/Tools';

export const StockPickersMonthly = () => {
  const [tab, setTab] = useState(sessionStorage.getItem('spm-tab') || 'About');
  const tabs = ['About', 'Tools', 'StockAPI', 'CryptoAPI'];

  return (
    <Container>
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
    </Container>
  );
};
