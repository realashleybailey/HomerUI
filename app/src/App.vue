<template>
  <div id="app" :class="[ `theme-default`, `page-default`, isDark ? 'is-dark' : 'is-light']">

    <DynamicTheme :themes="colors" />

    <div id="bighead">
      <Header :title="title" :subtitle="subtitle" :logo="logo" :icon="icon" :headerDisabled="headerDisabled" />
      <Navbar :links="links" />
    </div>

    <router-view v-if="!offline"></router-view>

    <Footer :footer="footer" :footerDisabled="footerDisabled" />

  </div>
</template>

<script>

import { store } from './store/';
import QueueController from './components/QueueController.vue';

import Header from "./components/Header.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

import GetStarted from "./components/GetStarted.vue";
import ConnectivityChecker from "./components/ConnectivityChecker.vue";

import Message from "./components/Message.vue";
import SearchInput from "./components/SearchInput.vue";

import DynamicTheme from "./components/DynamicTheme.vue";

export default {
  name: "App",
  components: {
    Header,
    Navbar,
    Footer,
    GetStarted,
    ConnectivityChecker,
    Message,
    SearchInput,
    DynamicTheme,
    QueueController
  },
  data: function () {
    return {
      loaded: false,
      currentPage: null,
      configNotFound: false,
      config: null,
      offline: false,
      filter: "",
      showLogin: false,
      loginError: null,
    };
  },
  computed: {
    configurationNeeded: function () {
      return (this.loaded && !this.services) || this.configNotFound;
    },
    links: function () {
      return store.getters.links;
    },
    colors: function () {
      return store.getters.colors;
    },
    headerDisabled: function () {
      return !!store.getters.headerDisabled;
    },
    logo: function () {
      return store.getters.logo;
    },
    icon: function () {
      return store.getters.icon;
    },
    title: function () {
      return store.getters.title;
    },
    subtitle: function () {
      return store.getters.subtitle;
    },
    defaults: function () {
      return store.getters.defaults;
    },
    footer: function () {
      return store.getters.footer;
    },
    footerDisabled: function () {
      return !!store.getters.footerDisabled;
    },
    isDark: function () {
      return store.getters.isDark;
    },
  },
  created: async function () {
    this.loaded = true;
    window.that = this;
    window.store = store;
    // Load settings from api
    store.dispatch("getSettings");
    store.dispatch("getServices");
    store.dispatch("getGroups");
    store.dispatch("getSupportedApps");
    // store.dispatch("loadServices");
    // store.dispatch("loadGroups");
    // store.dispatch("loadSupportedApps");
  },
  methods: {
    searchHotkey() {
      if (this.config.hotkey && this.config.hotkey.search) {
        return this.config.hotkey.search;
      }
    },
  },
  watch: {
    "$store.state.token": {
      handler: function (token) {
        store.dispatch("checkToken", token);
      },
      deep: true,
    },
  },
};
</script>