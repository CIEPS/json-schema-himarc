import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import App from './App.vue';

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  render: function (h) { return h(App); }
}).$mount('#app');
