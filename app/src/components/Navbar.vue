<template>
  <div v-cloak v-if="links" class="container-fluid">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">

        <div class="navbar-brand">

          <a class="navbar-item is-hidden-desktop" v-if="loggedIn">
            Hello, {{ name }}
          </a>

          <a role="button" aria-label="menu" aria-expanded="false" class="navbar-burger" :class="{ 'is-active': showMenu }" @click="open = !open">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu" :class="{ 'is-active': showMenu }">

          <div class="navbar-start">

            <app-link class="navbar-item" v-for="(link, key) in links" :to="link.url" :target="link.target || '_self'">
              <i v-if="link.icon" :class="['fas fa-fw', link.icon, { 'mr-2': link.name }]"></i>
              {{ link.name }}
            </app-link>

            <hr class="navbar-divider" style="display: block; margin-left: 13px; margin-right: 13px">

            <router-link class="navbar-item is-hidden-desktop" :to="'/login'" v-if="!loggedIn">
              <i class="fas fa-fw fa-user mr-2"></i>
              Login
            </router-link>

            <router-link class="navbar-item is-hidden-desktop" :to="'/add-service'" v-if="loggedIn">
              <i class="fas fa-fw fa-plus mr-2"></i>
              Add Service
            </router-link>

            <router-link class="navbar-item is-hidden-desktop" :to="'/edit-service'" v-if="loggedIn">
              <i class="fas fa-fw fa-pen-to-square mr-2"></i>
              Edit Service
            </router-link>

            <router-link class="navbar-item is-hidden-desktop" :to="'/settings'" v-if="loggedIn">
              <i class="fas fa-fw fa-gear mr-2"></i>
              Settings
            </router-link>

            <router-link class="navbar-item is-hidden-desktop" :to="'/settings'" v-if="loggedIn">
              <i class="fas fa-fw fa-user mr-2"></i>
              {{ name }}
            </router-link>


          </div>

          <div class="navbar-end">

            <DarkMode @updated="isDarkToggle($event)" :defaultValue="this.defaults.colorTheme" class="mr-2" />
            <SettingToggle name="vLayout" icon="fa-list" iconAlt="fa-columns" :defaultValue="this.defaults.layout == 'columns'" class="is-hidden-touch mr-2" />
            <UserAccount icon="fa-user" iconAlt="fa-user" />

            <a class="navbar-item is-inline-block-mobile mr-2 is-hidden-desktop" @click="logout()" v-if="loggedIn">
              <i class="fas fa-fw fa-sign-out-alt"></i>
            </a>

          </div>

        </div>
      </div>
    </nav>
  </div>
</template>

<script>
;

import SettingToggle from "./SettingToggle.vue";
import UserAccount from "./UserAccount.vue";
import DarkMode from "./DarkMode.vue";

import { store } from "../store";

export default {
  name: "Navbar",
  props: {
    links: Array,
  },
  components: {
    SettingToggle,
    UserAccount,
    DarkMode,
  },
  data: function () {
    return {
      isDark: null,
      open: false,
    };
  },
  computed: {
    loggedIn: function () {
      return store.getters.isLoggedIn;
    },
    showMenu: function () {
      return this.open && this.isSmallScreen();
    },
    defaults: function () {
      return store.getters.defaults;
    },
    name: function () {
      return store.getters.user.name;
    }
  },
  watch: {
    '$route'(to, from) {
      this.open = false;
    }
  },
  methods: {
    isSmallScreen: function () {
      return window.matchMedia("screen and (max-width: 1023px)").matches;
    },
    isDarkToggle: function (value) {
      this.$emit("is-dark", value);
    },
    logout: function () {
      store.dispatch("logout");
    },
  },
};
</script>
