<template>
    <div class="columns is-multiline layout-vertical h-100 p-6">
        <div class="column is-full">
            <img src="/assets/tools/homer.png" style="height: 10rem;" class="pb-3" />
            <h1 style="font-size: 4rem;">HomerUI</h1>
        </div>

        <div class="column is-full p-6">
            <button class="button is-link is-large mb-5" @click="nextPage()">Get Started</button>
            <br>
            <span>If you should not be here<br></span>
            <a @click="somethingWrong()" class="is-link">Click Here</a>
        </div>
    </div>
</template>

<script>
import { store } from '../store';

export default {
    name: "OnBoard",
    methods: {
        nextPage() {
            this.$emit("nextPage");
        },
        somethingWrong() {
            store.commit("setConfigurationNeeded", false);
            document.body.style.overflow = 'auto';
        }
    },
};
</script>