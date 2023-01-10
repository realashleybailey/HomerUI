import { createApp, h } from "vue";

import App from "./App.vue";
import Toast from "vue-toastification";
import AppLink from './components/AppLink.vue';
import VueSocketIO from 'vue-3-socket.io'

import { store } from "./store";
import router from "./router";

import "vue-toastification/dist/index.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "./assets/app.scss";
import 'animate.css';

const loadApp = async () => {

  const app = createApp(App);

  app.use(new VueSocketIO({
    debug: process.env.NODE_ENV === "development",
    connection: window.location.origin,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
    options: {
      path: "/ws"
    }
  }))


  app.use(store)
  app.use(router)
  app.use(Toast, {
    position: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? "top-center" : "bottom-right",
    pauseOnHover: false,
    pauseOnFocusLoss: false,
  })

  store.dispatch("checkToken", store.getters.token);

  app.component("AppLink", AppLink);

  app.component("DynamicStyle", (_props, context) => {
    return h("style", {}, context.slots);
  });

  await store.dispatch("getStatus");

  if (!store.getters.configurationNeeded) {
    store.dispatch("getSettings");
    store.dispatch("getServices");
    store.dispatch("getGroups");
    store.dispatch("getLinks");
    store.dispatch("getMessages");
    store.dispatch("getSupportedApps");
  }

  app.mount("#app-mount");
}

loadApp();