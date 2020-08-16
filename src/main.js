// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
import '@/assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CKEditor from '@ckeditor/ckeditor5-vue';
import QRCode from 'qrcodejs2';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Clipboard from 'v-clipboard'

Vue.use(mavonEditor)
Vue.use( CKEditor );
Vue.use(ElementUI);
Vue.use(Clipboard)
import axios from 'axios'
Vue.prototype.$qrCode = QRCode;
const Axios = axios.create({
  //请求接口
  baseURL:"/apis",
  //超时设置
  timeout:8000,
  //请求头设置
  headers: {
        "accept": "application/json",
        'Content-Type': 'application/json;charset=UTF-8',
  }
})
Vue.prototype.$http = Axios


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
