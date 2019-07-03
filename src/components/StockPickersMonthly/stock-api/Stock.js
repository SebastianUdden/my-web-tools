import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../constants/colors';

export const Stock = ({ stock }) => {
  return (
    <Container>
      <h3>{stock.name}</h3>
      <ul>
        {Object.keys(stock).map(
          (key, index) =>
            index > 1 && (
              <li key={key}>
                {key}:{' '}
                {typeof stock[key] === 'object' ? (
                  <ul>
                    {Object.keys(stock[key]).map(x => (
                      <li key={x}>
                        {x}:{' '}
                        {typeof stock[key][x] === 'object' ? (
                          <ul>
                            {Object.keys(stock[key][x]).map(y => (
                              <li key={y}>
                                {y}: {stock[key][x][y]}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          stock[key][x]
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  stock[key]
                )}
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
