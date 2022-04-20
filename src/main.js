import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../assets/scss/main.scss";

Vue.config.productionTip = false;
// MOB_DEBUG=true npm run test - Enables mobile debugging
// (sending console output to the webpack terminal)
if (MOB_DEBUG) {
  console.log = debug;
  console.error = debug;
  console.warn = debug;
}

new Vue({
  el: "#app",
  render: (h) => h(App),
  store,
  router,
});

function debug(...argv) {
  fetch("/debug?argv=" + JSON.stringify(argv));
}
