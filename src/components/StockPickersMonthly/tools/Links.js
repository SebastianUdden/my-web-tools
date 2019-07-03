import React from 'react';
import { Link, P } from '../../shared/commonComponents';
export const Links = () => (
  <>
    <P>A collection of helpful links.</P>
    <ul>
      <li>
        Most promising API,
        <ListLink link="https://www.alphavantage.co" name="Alpha Vantage" />
      </li>
      <li>
        Example implementation of Alpha Vantage
        <ListLink
          link="https://medium.com/@Keithweaver_/using-a-stock-market-api-4ce65b7c67ac"
          name="here"
        />
      </li>
      <li>
        Possible organisational
        <ListLink
          link="https://rikatillsammans.se/investera-pengar-privat-eller-via-sitt-aktiebolag/"
          name="solution"
        />
        for SMP.
      </li>
      <li>
        ISK
        <ListLink
          link="https://www.skatteverket.se/privat/etjansterochblanketter/svarpavanligafragor/investeringssparkonto.4.71004e4c133e23bf6db80001071.html"
          name="information"
        />
      </li>
    </ul>
  </>
);

const ListLink = ({ link, name, margins = true }) => (
  <Link
    marginLeft={margins}
    marginRight={margins}
    href={link}
    target="_blank"
    rel="noopener noreferer"
  >
    {name}
  </Link>
);
