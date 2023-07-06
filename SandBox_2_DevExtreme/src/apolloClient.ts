import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core";


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})
//Creazione del client Apollo
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

//Se devo utilizzare il client in un componente Vue, devo importare il client e fornirlo al componente
// dunque il suo settaggio non può avvenire all'interno del main.ts perche da li si può esportare solamente l'applicazione
export default apolloClient;