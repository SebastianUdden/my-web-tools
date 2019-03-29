import React from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const ResizableTextarea = ({ value, setValue, rows, setRows }) => {
  const minRows = 1;
  const maxRows = 25;

  const handleChange = event => {
    const textareaLineHeight = 24;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }
    setValue(event.target.value);
    setRows(currentRows < maxRows ? currentRows : maxRows);
  };

  return (
    <Input
      id="ChatInput"
      placeholder="Message..."
      rows={rows}
      value={value}
      onChange={handleChange}
    />
  );
};

const Input = styled.textarea`
  width: 100%;
  min-width: 50vw;
  padding: 0.5rem;
  background-color: ${colors.darkerGrey};
  color: ${colors.white};
  border: none;
  border-bottom: 1px solid ${colors.white};
  outline: none;
  resize: none;
`;
