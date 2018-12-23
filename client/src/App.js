import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <h1 className="header">Reading List</h1>
      <BookList />
      <AddBookForm />
    </div>
  </ApolloProvider>
);

export default App;
