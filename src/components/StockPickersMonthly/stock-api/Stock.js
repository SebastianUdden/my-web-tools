import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../constants/colors';
import Chart from '../../shared/Chart';
import { P } from '../../shared/commonComponents';

const getTimeSeriesDaily = tsds =>
  Object.keys(tsds)
    .map(tsd => ({
      time: tsd,
      value: Math.floor(tsds[tsd]['2. high'] * 100) / 100,
    }))
    .reverse();

const getTimeSeriesCryptoCurrencyDaily = tsds =>
  Object.keys(tsds)
    .map(tsd => ({
      time: tsd,
      value: Math.floor(tsds[tsd]['2b. high (USD)'] * 100) / 100,
    }))
    .reverse();

export const Stock = ({ stock }) => {
  if (!stock) return <></>;
  const tsds =
    stock && stock.timeSeriesDaily
      ? getTimeSeriesDaily(stock.timeSeriesDaily)
      : stock.timeSeriesCryptoCurrencyDaily
      ? getTimeSeriesCryptoCurrencyDaily(stock.timeSeriesCryptoCurrencyDaily)
      : [];
  const [selectedPoint, setSelectedPoint] = useState(
    tsds ? tsds.length - 1 : 0
  );

  return (
    <Container>
      <H3>
        {stock.symbol} - {stock.name}
      </H3>
      {tsds.length !== 0 && (
        <Chart
          id={'stock-chart'}
          positions={tsds}
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
        />
      )}
      {stock && stock.timeSeriesDaily && (
        <SelectedTimeSeriesValue
          selected={
            stock.timeSeriesDaily[
              Object.keys(stock.timeSeriesDaily).filter(
                (tsd, i) => i === selectedPoint
              )
            ]
          }
        />
      )}
      <ul>
        {Object.keys(stock).map(
          (key, index) =>
            index > 1 &&
            !key.includes('timeSeries') && (
              <li key={key}>
                {key}: {typeof stock[key] !== 'object' && stock[key]}
              </li>
            )
        )}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 0.5rem;
  padding: 0.4rem 0.3rem;
  border: 1px solid ${colors.darkGrey};
`;

const Wrapper = styled(Container)`
  padding: 1rem 1rem 0.5rem;
  margin-bottom: 0.5rem;
`;

const Span = styled.span`
  color: ${colors.orange};
`;

const H3 = styled.h3`
  margin-bottom: 0.3rem;
`;

const SelectedTimeSeriesValue = ({ selected }) => (
  <Wrapper>
    {Object.keys(selected).map(s => (
      <P key={s}>
        {s.substring(2, s.length)}: <Span>{selected[s]}</Span>
      </P>
    ))}
  </Wrapper>
);
