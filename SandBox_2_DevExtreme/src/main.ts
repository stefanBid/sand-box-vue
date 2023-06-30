import { createApp, h, provide} from 'vue'
import './assets/tailwind.css'
import 'devextreme/dist/css/dx.light.css';
import './style.css'
import App from './App.vue'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})
//Creazione del client Apollo
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
});

//Se voglio utilizzare le query in un componente (all'interno di una funzione), devo fornire il client Apollo
export default apolloClient;
app.mount('#app')
