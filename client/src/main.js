import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import vuetify from './plugins/vuetify'; 
import store from './store'; 
import NavigationButtons from './components/NavigationButtons.vue';

const app = createApp(App);

app.component('NavigationButtons', NavigationButtons);

app.use(router); 
app.use(vuetify); 
app.use(store); 
app.mount('#app');
