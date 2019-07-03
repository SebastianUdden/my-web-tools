import React from 'react';
import styled from 'styled-components';
import { Link } from '../shared/commonComponents';

export const Description = ({ description, summary }) => {
  const linkRegexp = /\[(.+)\]\(([^ ]+?)( "(.+)")?\)/gm;
  const desc =
    summary && description.length > 79
      ? `${description.substring(0, 80)}...`
      : description;
  const splitDesc = desc.split(linkRegexp).filter(d => d);
  return (
    <Wrapper summary={summary}>
      {splitDesc.map((d, i) => {
        if (d.startsWith('http')) {
          return (
            <Link href={d} rel="noopener noreferer" target="_blank">
              {splitDesc[i - 1]}
            </Link>
          );
        } else if (splitDesc[i + 1] && splitDesc[i + 1].startsWith('http')) {
          return;
        } else {
          return <span>{d}</span>;
        }
      })}
    </Wrapper>
  );
};

const Wrapper = styled.p`
  white-space: ${p => (p.summary ? 'inherit' : 'pre-wrap')};
`;
