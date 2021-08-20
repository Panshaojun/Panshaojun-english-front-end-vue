import { createApp } from 'vue'
import router from './router'
import store, { key } from './store';
import App from './App.vue'
//引入 ant-design
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
createApp(App).use(store, key).use(router).use(Antd).mount('#app')
