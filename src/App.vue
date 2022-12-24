<template>
  <div id="app" :class="[ `theme-default`, `page-default`, isDark ? 'is-dark' : 'is-light']">

    <DynamicTheme :themes="colors" />

    <div id="bighead">
      <section v-if="!headerDisabled" class="first-line">
        <div v-cloak class="container">
          <div class="logo">
            <a href="#">
              <img v-if="logo" :src="`${logo}`" alt="dashboard logo" />
            </a>
            <i v-if="icon" :class="icon"></i>
          </div>
          <div class="dashboard-title" :class="{ 'no-logo': !icon || !logo }">
            <span class="headline">{{ subtitle }}</span>
            <h1>{{ title }}</h1>
          </div>
        </div>
      </section>

      <Navbar :open="showMenu" :links="links" @navbar-toggle="showMenu = !showMenu">

        <!-- <SearchInput class="navbar-item is-inline-block-mobile" :hotkey="searchHotkey()"
          @input="filterServices($event.target?.value)" @search-focus="showMenu = true"
          @search-open="navigateToFirstService($event?.target?.value)" @search-cancel="filterServices()" /> -->

        <DarkMode @updated="isDark = $event" :defaultValue="this.defaults.colorTheme" />

        <SettingToggle name="vLayout" icon="fa-list" iconAlt="fa-columns" :defaultValue="this.defaults.layout == 'columns'" />

        <UserAccount @login="loginToggle()" icon="fa-user" iconAlt="fa-user" />

      </Navbar>
    </div>

    <div v-if="showLogin" id="modal-login" class="modal" :class="{ 'is-active': showLogin }">

      <div class="modal-background"></div>

      <div class="modal-card">

        <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
          <button class="delete" aria-label="close" @click="loginToggle()"></button>
        </header>

        <section class="modal-card-body">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input id="username" class="input" type="username" placeholder="Username">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input id="password" class="input" type="password" placeholder="Password">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <span v-if="loginError" class="help is-danger">{{ loginError }}</span>
          <div class="buttons is-right">
            <button class="button is-link" style="background-color: var(--highlight-secondary)" @click="performLogin()">Login</button>
          </div>
        </section>

      </div>
    </div>


    <router-view v-if="!offline"></router-view>

    <footer class="footer" v-if="footer && !footerDisabled">
      <div class="container">
        <div class="content has-text-centered" v-html="footer"></div>
      </div>
    </footer>
  </div>
</template>

<script>
import { parse } from "yaml";
import merge from "lodash.merge";
import store from "./store";
import VueJwtDecode from 'vue-jwt-decode'

import Navbar from "./components/Navbar.vue";
import GetStarted from "./components/GetStarted.vue";
import ConnectivityChecker from "./components/ConnectivityChecker.vue";
import Message from "./components/Message.vue";
import SearchInput from "./components/SearchInput.vue";
import SettingToggle from "./components/SettingToggle.vue";
import UserAccount from "./components/UserAccount.vue";
import DarkMode from "./components/DarkMode.vue";
import DynamicTheme from "./components/DynamicTheme.vue";

// import defaultConfig from "./assets/defaults.yml?raw";

export default {
  name: "App",
  components: {
    Navbar,
    GetStarted,
    ConnectivityChecker,
    Message,
    SearchInput,
    SettingToggle,
    UserAccount,
    DarkMode,
    DynamicTheme,
  },
  data: function () {
    return {
      loaded: false,
      currentPage: null,
      configNotFound: false,
      config: null,
      offline: false,
      filter: "",
      isDark: null,
      showMenu: false,
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
      return store.getters.headerDisabled;
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
      return store.getters.footerDisabled;
    },
  },
  created: async function () {
    this.loaded = true;

    // Load settings from api
    store.dispatch("getSettings");
  },
  methods: {
    async performLogin() {

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (!username || !password) return;

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();

        const jwtData = VueJwtDecode.decode(data.token);

        store.commit("setUser", jwtData.user);
        store.commit("setToken", data.token);


        this.loginToggle();
      } else {
        const data = await response.json();
        this.loginError = data.message;
      }
    },
    loginToggle() {
      this.showLogin = !this.showLogin;
    },
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