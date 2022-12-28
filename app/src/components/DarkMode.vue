<template>
  <a @click="toggleTheme()" aria-label="Toggle dark mode" class="navbar-item is-inline-block-mobile">
    <i :class="`${faClasses[mode]}`" class="fa-fw" :title="`${titles[mode]}`"></i>
  </a>
</template>

<script>
import { store } from '../store';

export default {
  name: "Darkmode",
  props: {
    defaultValue: String,
  },
  data: function () {
    return {
      isDark: null,
      faClasses: ["fas fa-adjust", "fas fa-circle", "far fa-circle"],
      titles: ["Auto-switch", "Light theme", "Dark theme"],
      mode: null,
    };
  },
  created: function () {
    this.mode = store.getters.colorTheme;

    this.isDark = this.getIsDark();
    this.$emit("updated", this.isDark);
    store.commit("setDark", this.isDark);
  },
  methods: {
    toggleTheme: function () {
      this.mode = (this.mode + 1) % 3;
      switch (this.mode) {
        // Default behavior
        case 0:
          store.commit("setColorTheme", 0);
          break;
        // Force light theme
        case 1:
          store.commit("setColorTheme", 1);
          break;
        // Force dark theme
        case 2:
          store.commit("setColorTheme", 2);
          break;
        default:
          // Should be unreachable
          break;
      }

      this.isDark = this.getIsDark();
      this.$emit("updated", this.isDark);
      store.commit("setDark", this.isDark);
    },
    getIsDark: function () {
      const values = [matchMedia("(prefers-color-scheme: dark)").matches, false, true];
      return values[this.mode];
    },
  },
};
</script>
