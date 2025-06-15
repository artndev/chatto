import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './styles/main.css'

const pinia = createPinia()
createApp(App).use(router).use(pinia).use(Antd).mount('#app')
