<template>
  <a @click.prevent="toggleSetting()" class="navbar-item is-inline-block-mobile">
    <span><i :class="['fas', 'fa-fw', value ? icon : secondaryIcon]"></i></span>
    <slot></slot>
  </a>
</template>

<script>
import { store } from "../store";

export default {
  name: "SettingToggle",
  props: {
    name: String,
    icon: String,
    iconAlt: String,
    defaultValue: Boolean,
  },
  data: function () {
    return {
      secondaryIcon: null,
      value: true,
    };
  },
  created: function () {
    this.secondaryIcon = this.iconAlt || this.icon;

    this.value = store.getters[this.name];

    this.$emit("updated", this.value);
  },
  methods: {
    toggleSetting: function () {
      this.value = !this.value;
      store.commit("setSetting", { name: this.name, value: this.value });
      this.$emit("updated", this.value);
    },
  },
};
</script>
