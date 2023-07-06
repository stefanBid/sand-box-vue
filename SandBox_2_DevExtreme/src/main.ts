import { createApp, h, provide} from 'vue'
import './assets/tailwind.css'
import 'devextreme/dist/css/dx.light.css';
import './style.css'
import App from './App.vue'
import apolloClient from './apolloClient';
import { DefaultApolloClient } from '@vue/apollo-composable';


const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
});

app.mount('#app')