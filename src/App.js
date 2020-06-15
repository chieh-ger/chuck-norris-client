// Libraries
import React, { useState } from 'react';
import Client from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
// Components
import Categories from './components/Categories';
import Jokes from './components/Jokes';
import Store from './store';
import { StyledH1 } from './components/styled-components';

const CLIENT = new Client({
  uri: 'https://graphql-chuck-norris.herokuapp.com/'
});
export default function App() {
  return (
    <Provider store={Store}>
      <ApolloProvider client={CLIENT}>
        <div className="container">
          <StyledH1>SovTech Assessment</StyledH1>
          <p>Below is the list of available Chuck Norris joke categories to select from.</p>
          <Categories/>
          <Jokes/>
        </div>
      </ApolloProvider>
    </Provider>
  );
}
