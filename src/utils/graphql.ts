import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://143.198.117.145:9000/graphql',//process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
})
