import { createApp } from 'vue';
import { setupStore } from './stores';
import { setupGlobalDirecitve } from './directives';
import { setupAntdIcons } from './icon-load';
import { setupRouter } from './router';
import App from './App.vue';
import './design/index.less';
// import './mock';

const app = createApp(App);

setupStore(app);
setupGlobalDirecitve(app);
setupRouter(app);
setupAntdIcons(app);
app.mount('#app');
