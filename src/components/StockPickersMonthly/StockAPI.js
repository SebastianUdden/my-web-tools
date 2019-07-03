import React from 'react';
import { P, Button } from '../shared/commonComponents';
import { get } from '../../utils/api';

export const StockAPI = () => {
  return (
    <>
      <h2>StockAPI</h2>
      <P>Trial of Alpha Vantage</P>
      <Button onClick={() => getSymbol('microsoft')}>Get symbol</Button>
      <Button onClick={() => getData('MSFT')} marginLeft>
        Get data
      </Button>
    </>
  );
};

const getSymbol = keyword => {
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${
    process.env.STOCK_API_KEY
  }`;
  get(url).then(response => {
    console.log('Response: ', response);
  });
};

const getData = symbol => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${
    process.env.STOCK_API_KEY
  }`;
  get(url).then(response => {
    console.log('Response: ', response);
  });
};
