<template>
    <div class="navbar-item has-dropdown is-hidden-touch" @mouseleave="value = true">
        <a class="navbar-link is-arrowless" @click="toggleSetting()">
            <span v-if="!loggedIn" class="pr-3 pl-3">Login</span>
            <span v-else class="pr-3">{{ name }}</span>
            <i :class="[value ? 'fa-regular' : 'fa-solid', value ? icon : secondaryIcon, !loggedIn ? 'pr-3' : '']"></i>
        </a>

        <div class="navbar-dropdown" :class="{ 'is-active': !value }">
            <a v-if="!loggedIn" class="navbar-item" @click="login()">
                Login
            </a>
            <div v-if="loggedIn">
                <router-link tag="a" class="navbar-item" to="/add-service">
                    <i class="fas fa-fw fa-plus mr-2"></i>
                    Add Service
                </router-link>
                <router-link tag="a" class="navbar-item" to="/edit-service">
                    <i class="fas fa-fw fa-pen-to-square mr-2"></i>
                    Edit Service
                </router-link>
                <router-link tag="a" class="navbar-item" to="/settings">
                    <i class="fas fa-fw fa-gear mr-2"></i>
                    Settings
                </router-link>
                <a class="navbar-item" @click="logout()">
                    <i class="fas fa-fw fa-sign-out-alt mr-2"></i>
                    Logout
                </a>
            </div>
            <hr class="navbar-divider">
            <div class="navbar-item has-text-white">
                Version 2.0.0
            </div>
        </div>
    </div>
</template>

<style>
.navbar-item.has-dropdown:hover .navbar-link {
    color: var(--text-header) !important;
    background-color: var(--highlight-hover) !important;
}

.navbar-link {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.navbar-dropdown.is-active {
    display: block !important;
}

#bighead .navbar-dropdown {
    color: var(--text-header);
    background-color: var(--highlight-secondary);
}
</style>

<script>
export default {
    name: "UserAccount",
    props: {
        icon: String,
        iconAlt: String,
    },
    data: function () {
        return {
            value: true,
            secondaryIcon: null
        };
    },
    computed: {
        loggedIn: function () {
            return this.$store.getters.isLoggedIn;
        },
        name: function () {
            return this.$store.getters.user.name;
        }
    },
    created: function () {
        this.secondaryIcon = this.iconAlt || this.icon;
        window.test = this.$store
    },
    watch: {
        '$route'(to, from) {
            this.value = true;
        }
    },
    methods: {
        toggleSetting: function () {
            this.value = !this.value;
        },
        login: function () {
            this.$router.push("/login");
        },
        logout: function () {
            this.$store.dispatch("logout");
            this.value = true;
        },
    }
};
</script>
  