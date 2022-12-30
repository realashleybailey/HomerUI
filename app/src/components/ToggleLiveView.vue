<template>
    <button class="button is-dark" @click="toggleLiveView()">
        <span class="icon"><i :class="['fa', 'fa-fw', 'fa-bell' + (liveStatsDisabled ? '-slash' : '')]"></i></span>
        <span>Live View</span>
    </button>
</template>

<script>
import { store } from '../store';

export default {
    name: "ToggleLiveView",
    emits: ["toggleLiveView"],
    props: {
        liveStatsDisabled: Boolean,
    },
    methods: {
        toggleLiveView() {
            this.$emit("toggleLiveView", !this.liveStatsDisabled);
            store.commit("setLiveStatsDisabled", !this.liveStatsDisabled);
        },
    },
};
</script>