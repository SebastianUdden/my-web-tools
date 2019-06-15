# my-web-tools

## Dependencies

my-web-tools-api

## Deployment

npm run deploy

## Adding a new tab (ex. tabName)

1. Create a folder named tabName under components
2. Create a file called TabName.js and paste this code:

```js
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const TabName = () => {
  return (
    <div>
      <Header>Tab Name</Header>
      <Body>Tab Name</Body>
    </div>
  );
};

const Header = styled.h2`
  color: ${colors.brightGrey || 'white'};
`;
const Body = styled.div`
  color: ${colors.brightGrey || 'white'};
`;
```

3. Add TabName to the tabs variable

```js
const tabs = ['Users', 'Chat', 'Habits', 'TabName'];
```

4. Paste this code inside the MainWrapper of main.js

```js
{
  tab === 'TabName' && <TabName />;
}
```
