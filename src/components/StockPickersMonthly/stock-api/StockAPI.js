import React, { useState } from 'react';
import styled from 'styled-components';
import { Stock } from './Stock';
import { InputSymbol } from './InputSymbol';

export const StockAPI = () => {
  const [selectedStock, setSelectedStock] = useState(undefined);

  return (
    <>
      <H2>StockAPI</H2>
      <InputSymbol
        id="stock-symbol"
        placeholder="Input stock symbol..."
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
      />
      {selectedStock && <Stock stock={selectedStock} />}
    </>
  );
};

const H2 = styled.h2`
  margin-bottom: 0.5rem;
`;
