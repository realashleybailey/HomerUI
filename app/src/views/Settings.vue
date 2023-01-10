<template>
    <section id="main-section" class="section">

        <div class="container p-5 settings" v-if="hideMain">

            <!-- Helpful Tip -->
            <article class="message is-warning">
                <div class="message-body">
                    <i><b>Tip: </b>You can double click on any input to automatically fill it with it's placeholder value.</i>
                </div>
            </article>

            <!-- First Row -->
            <div class="columns">

                <div class="column">
                    <HeaderSettings :title="title" :subtitle="subtitle" :logo="logo" :header="header.enabled" @update:title="header.title = $event" @update:subtitle="header.subtitle = $event" @update:logo="header.logo = $event" @update:enabled="header.enabled = $event" />
                </div>

                <div class="column">
                    <LinksSettings :linksArray="linksArray" @addLinkToggle="addLinkToggle" @editLinkToggle="editLinkToggle" @deleteLink="deleteLink" />
                </div>

            </div>

            <!-- Second Row -->
            <div class="columns">

                <div class="column">
                    <MessagesSettings :messagesArray="messagesArray" @addMessageToggle="addMessageToggle" @editMessageToggle="editMessageToggle" @deleteMessage="deleteMessage" />
                </div>

            </div>


            <!-- Third Row -->
            <div class="columns">

                <div class="column">
                    TODO: Add more settings
                </div>

                <div class="column">
                    <FooterSettings :content="footerHTML" :enabled="footer.enabled" @update:content="footer.content = $event" @update:enabled="footer.enabled = $event" />
                </div>

            </div>

            <div class="buttons is-right">
                <button class="button is-link" style="background-color: var(--highlight-secondary)" @click="saveSettings()">
                    Save Settings
                </button>
            </div>

        </div>

        <div class="container p-5 settings" v-else>

            <div class="buttons is-left">
                <button class="button is-small is-link" style="background-color: var(--highlight-secondary)" @click="backMain()">Back</button>
            </div>

            <AddLink v-if="addLink" :link="addLink" @addLink="pushAddedLink" />
            <EditLink v-if="editLink" :link="editLink" @editLink="pushEditedLink" />

            <AddMessage v-if="addMessage" :message="addMessage" @addMessage="pushAddedMessage" />
            <EditMessage v-if="editMessage" :message="editMessage" @editMessage="pushEditedMessage" />

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

import HeaderSettings from "../components/settings/HeaderSettings.vue";
import LinksSettings from "../components/settings/LinksSettings.vue";
import MessagesSettings from "../components/settings/MessagesSettings.vue";
import FooterSettings from "../components/settings/FooterSettings.vue";

import AddLink from "../components/settings/AddLink.vue";
import EditLink from "../components/settings/EditLink.vue";

import AddMessage from "../components/settings/AddMessage.vue";
import EditMessage from "../components/settings/EditMessage.vue";

export default {
    name: "App",
    components: {
        HeaderSettings,
        LinksSettings,
        MessagesSettings,
        FooterSettings,

        AddLink,
        EditLink,

        AddMessage,
        EditMessage,
    },
    data: function () {
        return {
            toast: useToast(),

            header: {
                title: null,
                subtitle: null,
                logo: null,
                enabled: !!store.getters.headerDisabled,
            },

            footer: {
                content: null,
                enabled: !!store.getters.footerDisabled,
            },

            linksArray: store.getters.links,
            messagesArray: store.getters.messages,


            addLink: false,
            editLink: false,

            addMessage: false,
            editMessage: false,
        }
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
        footerHTML: function () {
            return store.getters.footer;
        },
        hideMain: function () {
            return !(this.addLink || this.editLink || this.addMessage || this.editMessage);
        },
    },
    methods: {
        backMain: function () {
            this.addLink = false;
            this.editLink = false;
            this.addMessage = false;
            this.editMessage = false;
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