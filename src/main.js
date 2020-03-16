import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import SmartTable from "vuejs-smart-table";

Vue.use(SmartTable);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
