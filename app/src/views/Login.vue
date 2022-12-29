<template>
    <div class="login container">
        <div class="login card">
            <div class="card-content" style="height: auto;">
                <div class="content">
                    <form @submit.prevent>
                        <p class="title">
                            Login
                        </p>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input id="username" class="input" type="username" placeholder="Username" autocomplete="username">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left">
                                <input id="password" class="input" type="password" placeholder="Password" autocomplete="current-password">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <span v-if="loginError" class="help is-danger">{{ loginError }}</span>
                        <div class="buttons is-right">
                            <button class="button is-link" style="background-color: var(--highlight-secondary)" @click="performLogin()">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* Container must be full height and center is content horizontally and vertically */
.login.container {
    /* Make the container full height and width */
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;

    /* Center the content */
    display: flex;
    align-items: center;
    justify-content: center;
}

.login.card {
    transform: none !important;
}

/* On Mobile */
@media only screen and (max-width: 768px) {
    .login.card {
        width: 90%;
    }
}

/* On Desktop */
@media only screen and (min-width: 769px) {
    .login.card {
        width: 50%;
    }
}
</style>

<script>
import { store } from "../store";
import { decode } from 'js-base64';

export default {
    name: "Login",
    data: function () {
        return {
            loginError: null,
        };
    },
    mounted: function () {
        // Get the message from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get('message');

        // Decode the message
        if (message) this.loginError = decode(message);

    },
    methods: {
        async performLogin() {
            // Get the username and password
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Set error message if login fails
            this.loginError = await store.dispatch("login", { username, password })
        },
    }
};
</script>