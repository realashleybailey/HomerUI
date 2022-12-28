<template>
    <section id="main-section" class="section">
        <div v-cloak class="container">
            <ConnectivityChecker @network-status-update="offline = $event" />

            <div v-if="!offline">

                <!-- Optional messages -->
                <Message :item="message" />

                <!-- Get Started Message -->
                <GetStarted v-if="configurationNeeded" />

                <!-- Horizontal layout -->
                <div v-if="!vLayout || filter" class="columns is-multiline">
                    <template v-for="(group, groupIndex) in dashboard">
                        <h2 v-if="group.name" class="column is-full group-title" :key="`header-${groupIndex}`">
                            <i v-if="group.icon" :class="['fa-fw', group.icon]"></i>
                            <div v-else-if="group.logo" class="group-logo media-left">
                                <figure class="image is-48x48">
                                    <img :src="group.logo" :alt="`${group.name} logo`" />
                                </figure>
                            </div>
                            {{ group.name }}
                        </h2>
                        <Service v-for="(item, index) in group.items" :key="`service-${groupIndex}-${index}`" :item="item" :proxy="proxy" :class="['column', `is-${12 / columns}`]" />
                    </template>
                </div>

                <!-- Vertical layout -->
                <div v-if="!filter && vLayout" class="columns is-multiline layout-vertical">
                    <div :class="['column', `is-${12 / columns}`]" v-for="(group, groupIndex) in dashboard" :key="groupIndex">
                        <h2 v-if="group.name" class="group-title">
                            <i v-if="group.icon" :class="['fa-fw', group.icon]"></i>
                            <div v-else-if="group.logo" class="group-logo media-left">
                                <figure class="image is-48x48">
                                    <img :src="group.logo" :alt="`${group.name} logo`" />
                                </figure>
                            </div>
                            {{ group.name }}
                        </h2>
                        <Service v-for="(item, index) in group.items" :key="index" :item="item" :proxy="proxy" :class="'service-vertical'" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { store } from "../store";
import Navbar from "../components/Navbar.vue";
import GetStarted from "../components/GetStarted.vue";
import ConnectivityChecker from "../components/ConnectivityChecker.vue";
import Service from "../components/Service.vue";
import Message from "../components/Message.vue";
import SearchInput from "../components/SearchInput.vue";
import SettingToggle from "../components/SettingToggle.vue";
import UserAccount from "../components/UserAccount.vue";
import DarkMode from "../components/DarkMode.vue";
import DynamicTheme from "../components/DynamicTheme.vue";

;

export default {
    name: "App",
    components: {
        Navbar,
        GetStarted,
        ConnectivityChecker,
        Service,
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
            offline: false,
            filter: "",
        };
    },
    computed: {
        configurationNeeded: function () {
            return (this.loaded && !this.dashboard);
        },
        connectivityChecker: function () {
            return store.getters.connectivityChecker;
        },
        message: function () {
            return store.getters.message;
        },
        vLayout: function () {
            return store.getters.vLayout;
        },
        columns: function () {
            return 3;
        },
        proxy: function () {
            return null;
        },
        dashboard: function () {
            const groups = store.getters.groups;
            const services = store.getters.services;

            // If there are no services, return an empty array
            if (!services || !services.length) {
                return null;
            }

            // If there are no groups, return an array with a single group
            if (!groups || !groups.length) {
                return [{ name: "", items: services }];
            }

            groups.forEach((group) => {
                group.items = services.filter((service) => service.group_id === group.id);
            });

            return groups;
        },
    },
    created: async function () {
        this.loaded = true;
    },
    methods: {
        matchesFilter: function (item) {
            const needle = this.filter?.toLowerCase();
            return (
                item.name.toLowerCase().includes(needle) ||
                (item.subtitle && item.subtitle.toLowerCase().includes(needle)) ||
                (item.tag && item.tag.toLowerCase().includes(needle)) ||
                (item.keywords && item.keywords.toLowerCase().includes(needle))
            );
        },
        navigateToFirstService: function (target) {
            try {
                const service = this.services[0].items[0];
                window.open(service.url, target || service.target || "_self");
            } catch (error) {
                console.warning("fail to open service");
            }
        },
        filterServices: function (filter) {
            console.log(filter);
            this.filter = filter;

            if (!filter) {
                this.services = this.config.services;
                return;
            }

            const searchResultItems = [];
            for (const group of this.config.services) {
                for (const item of group.items) {
                    if (this.matchesFilter(item)) {
                        searchResultItems.push(item);
                    }
                }
            }

            this.services = [
                {
                    name: filter,
                    icon: "fas fa-search",
                    items: searchResultItems,
                },
            ];
        },
        handleErrors: function (title, content) {
            return {
                message: {
                    title: title,
                    style: "is-danger",
                    content: content,
                },
            };
        },
        createStylesheet: function (css) {
            let style = document.createElement("style");
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
        },
    },
};
</script>