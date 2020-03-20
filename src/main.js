import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import SmartTable from "vuejs-smart-table";
import NavblueUI from "@navblue/navblue-ui";
import "@navblue/navblue-ui-style";

Vue.use(SmartTable);
Vue.use(NavblueUI);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
