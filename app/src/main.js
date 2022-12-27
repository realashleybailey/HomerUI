import { createApp, h } from "vue";

import App from "./App.vue";
import Toast from "vue-toastification";
import AppLink from './components/AppLink.vue';
import VueSocketIO from 'vue-3-socket.io'

import store from "./store";
import router from "./router";

import "vue-toastification/dist/index.css";
// import "bulma-extensions/src/js/index.js";

import "@fortawesome/fontawesome-free/css/all.css";
import "./assets/app.scss";

const app = createApp(App);

app.use(new VueSocketIO({
  debug: false,
  connection: window.location.origin,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: "/ws" }
}))

app.use(store)
app.use(router)
app.use(Toast, {
  position: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? "top-center" : "bottom-right",
})

store.dispatch("checkToken", store.getters.token);

app.component("AppLink", AppLink);

app.component("DynamicStyle", (_props, context) => {
  return h("style", {}, context.slots);
});


app.mount("#app-mount");
