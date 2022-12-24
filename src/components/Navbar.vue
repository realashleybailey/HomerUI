<template>
  <div v-cloak v-if="links" class="container-fluid">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a role="button" aria-label="menu" aria-expanded="false" class="navbar-burger"
            :class="{ 'is-active': showMenu }" v-on:click="$emit('navbar-toggle')">
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

          </div>
          <div class="navbar-end">
            <slot></slot>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    links: Array,
  },
  computed: {
    showMenu: function () {
      return this.open && this.isSmallScreen();
    },
  },
  methods: {
    isSmallScreen: function () {
      return window.matchMedia("screen and (max-width: 1023px)").matches;
    },
  },
};
</script>
