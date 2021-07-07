import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from './utils/graphql';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>

  </React.StrictMode>,
  document.getElementById('root')
);


