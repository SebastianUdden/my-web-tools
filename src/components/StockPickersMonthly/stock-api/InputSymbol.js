import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  P,
  FlexWrapper,
  Input,
  AddButton,
} from '../../shared/commonComponents';
import { get } from '../../../utils/api';
import Suggestions from '../../shared/Suggestions';
import { useDebounce } from '../../../hooks/useDebounce';

export const InputSymbol = ({ id, setSelectedStock, placeholder }) => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(input, 500);

  const addTag = () => {
    console.log('results: ', results);
    console.log('input: ', input);
    if (
      !results.filter(m => m.name.toLowerCase() === input.toLowerCase()).length
    )
      return;
    const formatedInput = input && input.split('-')[0].trim();
    const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${formatedInput}&apikey=${
      process.env.STOCK_API_KEY
    }`;
    get(stockUrl).then(response => {
      const stock = results.find(r => r._id === formatedInput);
      console.log('res: ', response);
      setSelectedStock({
        ...stock,
        timeSeriesDaily: response['Time Series (Daily)'],
      });
    });
  };

  useEffect(() => {
    if (debouncedSearchTerm && !debouncedSearchTerm.includes('-')) {
      setIsSearching(true);
      const symbolUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${
        process.env.STOCK_API_KEY
      }`;
      get(symbolUrl).then(response => {
        console.log('Response: ', response);
        const formattedResult = response.bestMatches.map(r => ({
          _id: r['1. symbol'],
          name: `${r['1. symbol']} - ${r['2. name']}`,
          type: r['3. type'],
          region: r['4. region'],
          marketOpen: r['5. marketOpen'],
          marketClose: r['6. marketClose'],
          timezone: r['7. timezone'],
          currency: r['8. currency'],
          matchScore: r['9. matchScore'],
        }));
        setIsSearching(false);
        setResults(formattedResult);
      });
    } else {
      !debouncedSearchTerm.includes('-') && setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <FlexWrapper>
        <SearchInput
          id={id}
          list={`${id}suggestions`}
          value={input}
          onChange={e => {
            setShowSuggestions(true);
            setInput(e.target.value);
          }}
          placeholder={placeholder}
          autoComplete="off"
        />
        <AddButton
          onClick={() => {
            addTag();
            document.getElementById(id).focus();
          }}
        >
          +
        </AddButton>{' '}
      </FlexWrapper>
      <FlexWrapper>
        {input.length > 0 && showSuggestions && (
          <Suggestions
            id={`${id}suggestions`}
            addTag={addTag}
            inputTag={input}
            setInputTag={setInput}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            results={results}
          />
        )}
      </FlexWrapper>
      {isSearching && <P>Searching for stocks...</P>}
    </>
  );
};

const SearchInput = styled(Input)`
  width: 85%;
  margin-bottom: 0;
`;
