import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Stock } from './Stock';
import { InputSymbol } from './InputSymbol';
import { Error } from '../../shared/commonComponents';

export const InvestmentAPI = () => {
  const [selectedStock, setSelectedStock] = useState(undefined);
  const [apiOverload, setApiOverload] = useState(undefined);

  useEffect(() => {
    console.log('Overload: ', apiOverload);
  }, [apiOverload]);

  return (
    <>
      <H2>Investment API</H2>
      <InputSymbol
        id="stock-symbol"
        placeholder="Input stock or currency symbol ..."
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
        setApiOverload={setApiOverload}
      />
      {selectedStock && !apiOverload && <Stock stock={selectedStock} />}
      {apiOverload && <Error>{apiOverload['Note']}</Error>}
    </>
  );
};

const H2 = styled.h2`
  margin-bottom: 0.5rem;
`;
