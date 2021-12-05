import Vue from 'vue';
import App from './App';
import store from './store';
import uView from 'uview-ui';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/zh-cn';
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale('zh-cn');
Vue.use(uView);
Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  ...App,
  store,
});
app.$mount();
