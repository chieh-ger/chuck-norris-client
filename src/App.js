// Libraries
import React, { useState } from 'react';
import Client from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
// Components
import Categories from './components/Categories';
import Jokes from './components/Jokes';
import Store from './store';
// Stylesheets
import './App.css';

const CLIENT = new Client({
  uri: 'http://localhost:3100/graphql'
});
export default function App() {
  // States
  const [category, updateCategory] = useState('');

  const setCategory = (categoryName) => {
    updateCategory(categoryName);
  }

  return (
    <Provider store={Store}>
      <ApolloProvider client={CLIENT}>
        <div className="container">
          <h1 style={{padding: '20px'}}>SovTech Assessment</h1>
          <p>Below is the list of available Chuck Norris joke categories to select from.</p>
          <Categories setCategory={selectedCategory => setCategory(selectedCategory)}/>
          <Jokes category={category}/>
        </div>
      </ApolloProvider>
    </Provider>
  );
}
