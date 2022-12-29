<template>
    <transition name="fade" mode="in-out">
        <div class="onboard" v-if="isShown">
            <div class="onboard-bg"></div>
            <div class="onboard-content">
                <div class="card has-text-light-dark">
                    <transition name="fade" mode="out-in">
                        <component :is="currentView[page]" @nextPage="nextPage()" @previousPage="previousPage()"></component>
                    </transition>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import GetStarted from "./GetStarted.vue";
import Account from "./Account.vue";
import Done from "./Done.vue";
import { store } from "../store";
import { markRaw } from "vue";

export default {
    name: "OnBoard",
    props: {
        isShown: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            currentView: [markRaw(GetStarted), markRaw(Account), markRaw(Done)],
            page: 0,
        };
    },
    mounted() {
        if (this.isShown) document.body.style.overflow = 'hidden';
    },
    methods: {
        nextPage() {
            this.page++;
        },
        previousPage() {
            this.page--;
        },
    },
    watch: {
        page() {
            if (this.page > this.currentView.length - 1) {
                store.commit("setConfigurationNeeded", false);
                document.body.style.overflow = 'auto';
            }
        },
    },
};
</script>

<style lang="scss">
.fade-enter-active {
    transition: opacity 0.3s ease;
}

.fade-enter {
    transition: opacity 0.3s ease;
}

.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-leave-to,
.fade-enter-from {
    // transform: translateX(10px);
    opacity: 0;
}

@-webkit-keyframes zoomInEffect {
    from {
        opacity: 0;
        -webkit-transform: scale3d(0.9, 0.9, 0.9);
        transform: scale3d(0.9, 0.9, 0.9);
    }

    100% {
        opacity: 1;
    }
}

@keyframes zoomInEffect {
    from {
        opacity: 0;
        -webkit-transform: scale3d(0.9, 0.9, 0.9);
        transform: scale3d(0.9, 0.9, 0.9);
    }

    100% {
        opacity: 1;
    }
}

.onboard {
    position: fixed;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 99;
}

.onboard-bg {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 99;

    background-color: var(--background);
}

.onboard-content {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;

    animation: fadeIn 1s ease-in-out, zoomInEffect 1s ease-in-out;
}

// On Mobile
@media only screen and (max-width: 768px) {
    .onboard-content {
        min-height: -webkit-fill-available;
    }

    .onboard-content .card {
        height: 75vh !important;
    }
}

.onboard-content .card {
    width: 90%;
    height: 55vh;
    transform: none !important;
    padding: 0px;

    min-width: 400px;
    overflow: hidden;
}

.onboard-content .fieldWidth {
    width: 50vw;
}

// Mobile
@media only screen and (max-width: 768px) {
    .onboard-content .fieldWidth {
        width: 100%;
    }
}

// .onboard .card .centered {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     text-align: center;
//     height: 100%;
//     width: 100%;
// }

.onboard-content .card .columns {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0px;
}

.onboard-content .card .columns .column {
    width: 100%;
}

.onboard-content .card .columns.centered .column {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.onboard-content .label {
    text-align: start;
    color: var(--text);
}
</style>