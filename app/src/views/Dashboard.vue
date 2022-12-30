<template>
    <section id="main-section" class="section">
        <div v-cloak class="container">
            <ConnectivityChecker @network-status-update="offline = $event" />

            <template v-if="!offline">

                <!-- Optional messages -->
                <Message v-for="message in messages" :key="message.id" :item="message" />

                <!-- Get Started Message -->
                <GetStarted v-if="configurationNeeded" />

                <!-- Edit Button -->
                <ButtonBar v-if="isLoggedIn">
                    <ToggleLiveView :liveStatsDisabled="liveStatsDisabled" @toggleLiveView="toggleLiveView" v-if="!editLayout" />
                    <EditButton :toDelete="toDelete" :editLayout="editLayout" :dashboard="dashboard" @toggleEditLayout="toggleEditLayout" />
                </ButtonBar>


                <!-- <transition name="fade" mode="in-out"> -->
                <div v-if="editLayout">
                    <div v-if="!vLayout || filter">
                        <template v-for="(group, groupIndex) in dashboard">
                            <div class="columns is-multiline">
                                <h2 v-if="group.name" class="column is-full group-title" :key="`header-${groupIndex}`">
                                    <i v-if="group.icon" :class="['fa-fw', group.icon]"></i>
                                    <div v-else-if="group.logo" class="group-logo media-left">
                                        <figure class="image is-48x48">
                                            <img :src="group.logo" :alt="`${group.name} logo`" />
                                        </figure>
                                    </div>
                                    {{ group.name }}
                                </h2>
                            </div>
                            <draggable v-model="group.items" group="first" @start="drag=true" @end="drag=false" item-key="id" class="columns is-multiline">
                                <template #item="{element}">
                                    <div :class="['column', `is-${12 / columns}`]">
                                        <Service :item="element" typeOverride="Edit" @deleteService="deleteService" />
                                    </div>
                                </template>
                            </draggable>
                        </template>
                    </div>


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
                            <draggable v-model="group.items" group="first" @start="drag=true" @end="drag=false" item-key="id">
                                <template #item="{element}">
                                    <div class="service-vertical">
                                        <Service :item="element" typeOverride="Edit" @deleteService="deleteService" />
                                    </div>
                                </template>
                            </draggable>
                        </div>
                    </div>
                </div>

                <div v-else>
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
                            <Service v-for="(item, index) in group.items" :key="`service-${groupIndex}-${index}`" :item="item" :class="['column', `is-${12 / columns}`]" :live="!liveStatsDisabled" />
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
                            <Service v-for="(item, index) in group.items" :key="`service-${groupIndex}-${index}`" :item="item" :class="'service-vertical'" :live="!liveStatsDisabled" />
                        </div>
                    </div>
                </div>
                <!-- </transition> -->

            </template>
        </div>
    </section>
</template>

<script>
import { store } from "../store";

import ButtonBar from "../components/ButtonBar.vue";
import ToggleLiveView from "../components/ToggleLiveView.vue";
import EditButton from "../components/EditButton.vue";
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

import draggable from "vuedraggable";

export default {
    name: "App",
    components: {
        ButtonBar,
        ToggleLiveView,
        EditButton,
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
        draggable
    },
    data: function () {
        return {
            loaded: false,
            offline: false,
            filter: "",
            editLayout: false,
            enabled: true,
            drag: false,
            dashboard: null,
            toDelete: [],
            liveStatsDisabled: (store.getters.isLoggedIn) ? store.getters.liveStatsDisabled : false
        };
    },
    computed: {
        configurationNeeded: function () {
            return (this.loaded && !this.dashboard);
        },
        connectivityChecker: function () {
            return store.getters.connectivityChecker;
        },
        messages: function () {
            return store.getters.messages;
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
        isLoggedIn: function () {
            return store.getters.isLoggedIn;
        },
    },
    created: async function () {
        this.loaded = true;
    },
    mounted: function () {
        console.log("App mounted");
        this.loadDashboard();
    },
    methods: {
        logo: function (logo) {
            if (logo && logo.startsWith("http")) return logo;
            if (logo) return `/assets/tools/${logo}`;
            return '/assets/tools/homer.png';
        },
        loadDashboard: function () {
            const groups = store.getters.groups;
            const services = store.getters.services;

            console.log("loadDashboard", groups, services);

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

            this.dashboard = groups;
        },
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
        deleteService: function ({ id, groupId }) {
            // Remove service where id matches from store
            this.toDelete.push(id);

            // Remove service where id matches from group.items
            const group = this.dashboard.find((group) => group.id === groupId);
            group.items = group.items.filter((item) => item.id !== id);
        },
        toggleLiveView: function (value) {
            this.liveStatsDisabled = value;
        },
        toggleEditLayout: function (value) {
            if (!value) this.loadDashboard();
            this.editLayout = value;
            this.toDelete = [];
        },
    },
};
</script>