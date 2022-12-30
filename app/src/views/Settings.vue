<template>
    <section id="main-section" class="section">
        <div class="container p-5 settings" v-if="hideMain">

            <article class="message is-warning">
                <div class="message-body">
                    <i><b>Tip: </b>You can double click on any input to automatically fill it with it's placeholder value.</i>
                </div>
            </article>

            <div class="columns">
                <div class="column">

                    <!-- Header Title -->
                    <h2 class="group-title">
                        Header Settings
                    </h2>

                    <!-- Title Input -->
                    <div class="field">
                        <label class="label">Title</label>
                        <div class="control">
                            <input class="input" type="text" v-model="titleText" :placeholder="title" @dblclick="titleText = title">
                        </div>
                    </div>

                    <!-- Subtitle Input -->
                    <div class="field">
                        <label class="label">Subtitle</label>
                        <div class="control">
                            <input class="input" type="text" v-model="subtitleText" :placeholder="subtitle" @dblclick="subtitleText = subtitle">
                        </div>
                    </div>

                    <!-- Logo Input -->
                    <div class="field">
                        <label class="label">Logo URL</label>
                        <div class="control">
                            <input class="input" type="text" v-model="logoURL" :placeholder="logo" @dblclick="logoURL = logo">
                        </div>
                    </div>

                    <!-- Header Display Checkbox -->
                    <div class="field">
                        <label class="label">Disable Header</label>
                        <label class="checkbox large-checkbox">
                            <input type="checkbox" v-model="headerDisabled">
                            {{ headerDisabled ? 'Header Disabled' : 'Header Enabled' }}
                        </label>
                    </div>
                </div>

                <div class="column">

                    <!-- Footer Title -->
                    <h2 class="group-title">
                        Link Settings
                    </h2>

                    <!-- Footer Input -->
                    <div class="field">
                        <label class="label">Add Links</label>

                        <div class="message" v-if="linksArray.length === 0">
                            <div class="message-body has-text-centered">
                                No links have been added yet.
                            </div>
                        </div>

                        <table class="table is-fullwidth is-striped">
                            <tbody>
                                <tr v-for="link in linksArray">
                                    <td style="vertical-align: middle; width: 1%">{{ link.name }}</td>
                                    <td style="vertical-align: middle; max-width: 10vw;">
                                        <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            [URL: {{ link.url }}]
                                        </div>
                                    </td>
                                    <td style="display: flex; justify-content: end;">
                                        <button class="button is-link is-small mr-2" @click="editLinkToggle(link)" :disabled="!link.id">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="button is-danger is-small" @click="deleteLink(link.id)" :disabled="!link.id">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="buttons is-right">
                            <button class="button is-link" style="background-color: var(--highlight-secondary)" @click="addLinkToggle(true)">
                                Add Link
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            <div class="columns">

                <div class="column">

                    <!-- Header Title -->
                    <h2 class="group-title">
                        Dashboard Messages
                    </h2>

                    <div class="field">

                        <label class="label">Add Messages</label>

                        <div class="message" v-if="linksArray.length === 0">
                            <div class="message-body has-text-centered">
                                No messages have been added yet.
                            </div>
                        </div>

                        <table class="table is-fullwidth is-striped">
                            <tbody>
                                <tr v-for="message in messageArray">
                                    <td style="vertical-align: middle; width: 1%">{{ message.title }}</td>
                                    <td style="vertical-align: middle; max-width: 10vw;">
                                        <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            {{ message.content }}
                                        </div>
                                    </td>

                                    <td style="display: flex; justify-content: end;">
                                        <button class="button is-link is-small mr-2" @click="editMessageToggle(message)">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="button is-danger is-small" @click="deleteMessage(message)">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="buttons is-right">
                            <button class="button is-link" style="background-color: var(--highlight-secondary)" @click="addMessageToggle(true)">
                                Add Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="columns">

                <div class="column">
                    Second column
                </div>

                <div class="column">

                    <!-- Footer Title -->
                    <h2 class="group-title">
                        Footer Settings
                    </h2>

                    <!-- Footer Input -->
                    <div class="field">
                        <label class="label">Footer HTML</label>
                        <div class="control">
                            <textarea class="textarea" type="text" v-model="footerHTML" :placeholder="footer" @dblclick="footerHTML = footer"></textarea>
                        </div>
                    </div>

                    <!-- Footer Disabled Checkbox -->
                    <div class="field">
                        <label class="label">Disable Footer</label>
                        <label class="checkbox large-checkbox">
                            <input type="checkbox" v-model="footerDisabled">
                            {{ footerDisabled ? 'Footer Disabled' : 'Footer Enabled' }}
                        </label>
                    </div>
                </div>
            </div>

            <div class="buttons is-right">
                <button class="button is-link" style="background-color: var(--highlight-secondary)" @click="saveSettings()">
                    Save Settings
                </button>
            </div>

        </div>
        <div class="container p-5 settings" v-if="!hideMain">
            <div class="buttons is-left">
                <button class="button is-small is-link" style="background-color: var(--highlight-secondary)" @click="backMain()">Back</button>
            </div>
            <template v-if="addLink">
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input v-model="addLink.name" class="input" type="text" placeholder="Name">
                        <span class="icon is-small is-left">
                            <i class="fas fa-font"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="addLink.url" class="input" type="text" placeholder="URL">
                        <span class="icon is-small is-left">
                            <i class="fas fa-link"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input v-model="addLink.icon" class="input" type="text" placeholder="Font Awesome Icon">
                        <span class="icon is-small is-left">
                            <i class="fas fa-icons"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas" :class="[addLink.icon]"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <!-- Dropdown to select how the link should be opened -->
                    <div class="select">
                        <select v-model="addLink.target">
                            <option value="_self">Open in same tab
                            </option>
                            <option value="_blank">Open in new tab
                            </option>
                        </select>
                    </div>
                </div>
                <div class="buttons is-right">
                    <button class="button is-link" style="background-color: var(--highlight-secondary)" @click="pushAddedLink()">Add Link</button>
                </div>
            </template>
            <template v-if="editLink">
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input v-model="editLink.name" class="input" type="text" placeholder="Name">
                        <span class="icon is-small is-left">
                            <i class="fas fa-font"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="editLink.url" class="input" type="text" placeholder="URL">
                        <span class="icon is-small is-left">
                            <i class="fas fa-link"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input v-model="editLink.icon" class="input" type="text" placeholder="Font Awesome Icon">
                        <span class="icon is-small is-left">
                            <i class="fas fa-icons"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas" :class="[editLink.icon]"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <!-- Dropdown to select how the link should be opened -->
                    <div class="select">
                        <select v-model="editLink.target">
                            <option value="_self">Open in same tab
                            </option>
                            <option value="_blank">Open in new tab
                            </option>
                        </select>
                    </div>
                </div>
                <div class="buttons is-right">
                    <button class="button is-link" style="background-color: var(--highlight-secondary)" @click="pushEditedLink()">Edit Link</button>
                </div>
            </template>
            <template v-if="addMessage">

                <!-- Message Title Input -->
                <div class="field">
                    <label class="label">Message Title</label>
                    <div class="control">
                        <input class="input" type="text" v-model="addMessage.title">
                    </div>
                </div>

                <!-- Message HTML Input -->
                <div class="field">
                    <label class="label">Message HTML</label>
                    <div class="control">
                        <textarea class="textarea" type="text" v-model="addMessage.content"></textarea>
                    </div>
                </div>


                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">Message Color</label>
                            <div class="control">
                                <div class="select w-100">
                                    <select v-model="addMessage.style" class="w-100">
                                        <option>is-dark</option>
                                        <option>is-primary</option>
                                        <option>is-link</option>
                                        <option>is-info</option>
                                        <option>is-success</option>
                                        <option>is-warning</option>
                                        <option>is-danger</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">Disable Message</label>
                            <label class="checkbox large-checkbox">
                                <input type="checkbox" v-model="addMessage.disabled">
                                {{ addMessage.disabled ? 'Message Disabled' : 'Message Enabled' }}
                            </label>
                        </div>
                    </div>
                </div>

                <div class="buttons is-right">
                    <button class="button is-link" style="background-color: var(--highlight-secondary)" @click="pushAddedMessage()">Add Message</button>
                </div>

            </template>
            <template v-if="editMessage">

                <!-- Message Title Input -->
                <div class="field">
                    <label class="label">Message Title</label>
                    <div class="control">
                        <input class="input" type="text" v-model="editMessage.title">
                    </div>
                </div>

                <!-- Message HTML Input -->
                <div class="field">
                    <label class="label">Message HTML</label>
                    <div class="control">
                        <textarea class="textarea" type="text" v-model="editMessage.content"></textarea>
                    </div>
                </div>


                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">Message Color</label>
                            <div class="control">
                                <div class="select w-100">
                                    <select v-model="editMessage.style" class="w-100">
                                        <option>is-dark</option>
                                        <option>is-primary</option>
                                        <option>is-link</option>
                                        <option>is-info</option>
                                        <option>is-success</option>
                                        <option>is-warning</option>
                                        <option>is-danger</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">Disable Message</label>
                            <label class="checkbox large-checkbox">
                                <input type="checkbox" v-model="editMessage.disabled">
                                {{ editMessage.disabled ? 'Message Disabled' : 'Message Enabled' }}
                            </label>
                        </div>
                    </div>
                </div>

                <div class="buttons is-right">
                    <button class="button is-link" style="background-color: var(--highlight-secondary)" @click="pushEditedMessage()">Edit Message</button>
                </div>

            </template>
        </div>
    </section>
</template>

<style lang="scss">
.settings {
    .label {
        color: var(--text-primary);
    }

    .large-checkbox {

        font-size: larger;
        padding: 6px;

        input[type=checkbox] {
            -ms-transform: scale(2);
            -moz-transform: scale(2);
            -webkit-transform: scale(2);
            -o-transform: scale(2);
            transform: scale(2);
            margin-right: 10px;
        }
    }

}
</style>

<script>
import { store } from "../store";
import { useToast } from "vue-toastification";

export default {
    name: "App",
    data: function () {
        return {
            toast: useToast(),

            titleText: null,
            subtitleText: null,
            logoURL: null,

            headerDisabled: !!store.getters.headerDisabled,

            messageArray: store.getters.messages,
            linksArray: store.getters.links,

            footerHTML: null,
            footerDisabled: !!store.getters.footerDisabled,

            addLink: false,
            editLink: false,

            addMessage: false,
            editMessage: false,

            windowTop: 0,
        }
    },
    mounted: function () {
        window.addEventListener("scroll", this.onScroll, true);
    },
    computed: {
        title: function () {
            return store.getters.title;
        },
        subtitle: function () {
            return store.getters.subtitle;
        },
        logo: function () {
            return store.getters.logo;
        },
        message: function () {
            return store.getters.message;
        },
        footer: function () {
            return store.getters.footer;
        },
        hideMain: function () {
            return !(this.addLink || this.editLink || this.addMessage || this.editMessage);
        },
    },
    methods: {
        onScroll(e) {
            this.windowTop = e.target.scrollTop;
        },
        backMain: function () {
            this.addLink = false;
            this.editLink = false;
            this.addMessage = false;
            this.editMessage = false;
            window.scrollTo(0, this.windowTop);
        },
        saveSettings: function () {
            store.dispatch('saveSettings', {
                title: this.titleText,
                subtitle: this.subtitleText,
                logo: this.logoURL,
                headerDisabled: this.headerDisabled,
                message: this.messageObject,
                footer: this.footerHTML,
                footerDisabled: this.footerDisabled,
            });

            this.toast("Settings saved!", { type: "success", duration: 3000 });
        },

        addLinkToggle: function (link) {
            if (link) {
                const newLink = {
                    name: '',
                    url: '',
                    icon: '',
                    target: '_self',
                };

                this.addLink = newLink;
            } else {
                this.addLink = false;
            }
        },
        editLinkToggle: function (link) {
            if (link) {
                const newLink = {
                    name: link.name,
                    url: link.url,
                    icon: link.icon,
                    target: link.target,
                };

                this.editLink = newLink;
            } else {
                this.editLink = false;
            }
        },

        pushAddedLink: async function () {

            const linkName = this.addLink.name;
            const linkUrl = this.addLink.url;
            const linkIcon = this.addLink.icon;
            const linkTarget = this.addLink.target;

            const link = {
                name: linkName,
                url: linkUrl,
                icon: linkIcon,
                target: linkTarget,
            };

            this.linksArray = store.getters.links;

            const result = await store.dispatch('createLink', link);

            if (!result) {
                this.toast("Something went wrong!", { type: "error", duration: 3000 });
            }

            this.addLinkToggle();
            this.toast("Link added!", { type: "success", duration: 3000 });
        },
        pushEditedLink: async function () {

            const linkName = this.editLink.name;
            const linkUrl = this.editLink.url;
            const linkIcon = this.editLink.icon;
            const linkTarget = this.editLink.target;

            store.dispatch('editLink', {
                name: linkName,
                url: linkUrl,
                icon: linkIcon,
                target: linkTarget,
            });
        },
        deleteLink: async function (id) {
            const result = await store.dispatch('deleteLink', id);

            if (!result) {
                this.toast("Error deleting link!", { type: "error", duration: 3000 });
                return;
            }

            this.linksArray = this.linksArray.filter(links => links.id !== id)
            this.toast("Link deleted!", { type: "success", duration: 3000 });
        },

        addMessageToggle: function (message) {
            if (message) {
                const newMessage = {
                    title: '',
                    content: '',
                    style: 'is-dark',
                    disabled: false,
                };

                this.addMessage = newMessage;
            } else {
                this.addMessage = false;
            }
        },
        editMessageToggle: function (message) {
            if (message) {
                const newMessage = {
                    title: message.title,
                    content: message.content,
                    style: message.style,
                    disabled: message.disabled,
                };

                this.editMessage = newMessage;
            } else {
                this.editMessage = false;
            }
        },
        deleteMessage: function (message) {
            // store.dispatch('deleteMessage', message);
            this.messageArray = this.messageArray.filter(messages => messages.id !== message.id)

            this.toast("Message deleted!", { type: "success", duration: 3000 });
        },

        pushAddedMessage: function () {

            const messageTitle = this.addMessage.title;
            const messageContent = this.addMessage.content;
            const messageStyle = this.addMessage.style;
            const messageDisabled = this.addMessage.disabled;

            const message = {
                title: messageTitle,
                content: messageContent,
                style: messageStyle,
                disabled: messageDisabled,
            };

            this.messageArray = store.getters.messages;

            store.dispatch('addMessage', message);
            this.addMessageToggle();

            this.toast("Message added!", { type: "success", duration: 3000 });
        },
        pushEditedMessage: function () {

            const messageTitle = this.editMessage.title;
            const messageContent = this.editMessage.content;
            const messageStyle = this.editMessage.style;
            const messageDisabled = this.editMessage.disabled;

            console.log(messageTitle, messageContent, messageStyle, messageDisabled);
        },
    },
};
</script>