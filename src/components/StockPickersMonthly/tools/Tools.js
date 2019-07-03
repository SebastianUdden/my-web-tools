import React, { useState } from 'react';
import { TabWrapper, Tab, saveTab } from '../../shared/commonComponents';
import { Links } from './Links';
import { ValueGraph } from './ValueGraph';
export const Tools = () => {
  const [tab, setTab] = useState(
    sessionStorage.getItem('tools-tab') || 'Links'
  );
  const tabs = ['Links', 'ValueGraph'];
  return (
    <>
      <TabWrapper>
        {tabs &&
          tabs.map(x => (
            <Tab
              key={x}
              selected={tab === x}
              onClick={() => saveTab('tools', x, setTab)}
            >
              {x}
            </Tab>
          ))}
      </TabWrapper>
      {tab === 'Links' && <Links />}
      {tab === 'ValueGraph' && <ValueGraph />}
    </>
  );
};
