import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'

const pinia = createPinia()
createApp(App).use(pinia).use(Antd).mount('#app')
