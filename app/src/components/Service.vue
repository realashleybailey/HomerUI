<template>
  <component :is="component" :item="item" :live="live" :enabled="enabled" @deleteService="deleteService"></component>
</template>

<script>
import { defineAsyncComponent } from "vue";
import Generic from "./services/Generic.vue";

export default {
  name: "Service",
  props: {
    item: Object,
    live: Boolean,
    typeOverride: {
      type: String,
      default: undefined,
      required: false,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    component() {
      const type = this.typeOverride || this.item.type || "Generic";
      if (type === "Generic") {
        return Generic;
      }
      return defineAsyncComponent(() => import(`./services/${type}.vue`));
    },
  },
  methods: {
    deleteService(value) {
      this.$emit("delete", value);
    },
  },
};
</script>
