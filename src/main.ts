import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import ViewUIPlus from 'view-ui-plus'
import VueLuckyCanvas from '@lucky-canvas/vue'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import animate from "animate.css";
import '../src/assets/css/main.less'
import '../src/assets/css/fonts.less'
import 'element-plus/theme-chalk/el-message.css';
import vueLazyLoad from "vue3-lazy"

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(animate).use(ViewUIPlus).use(pinia).use(VueLuckyCanvas).use(vueLazyLoad, {
    preLoad: 1,
    error: new URL('./assets/img/error.jpeg', import.meta.url).href,  //加载失败的显示
    loading: new URL('./assets/img/loading.jpeg', import.meta.url).href,       //加载中的显示
    attempt: 1
})
app.mount('#app')