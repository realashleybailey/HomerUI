<template>
    <section id="main-section" class="section">
        <div class="container p-5 settings" v-if="hideMain">

            <article class="message is-warning">
                <div class="message-body">
                    <b>Tip: </b>
                    You can double click on any input to automatically fill it with the already configured value.
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

                    <!-- Header Title -->
                    <h2 class="group-title">
                        Dashboard Message
                    </h2>

                    <!-- Message Title Input -->
                    <div class="field">
                        <label class="label">Message Title</label>
                        <div class="control">
                            <input class="input" type="text" v-model="messageObject.title" :placeholder="message.title" @dblclick="messageObject.title = message.title">
                        </div>
                    </div>

                    <!-- Message HTML Input -->
                    <div class="field">
                        <label class="label">Message HTML</label>
                        <div class="control">
                            <textarea class="textarea" type="text" v-model="messageObject.content" :placeholder="message.content" @dblclick="messageObject.content = message.content"></textarea>
                        </div>
                    </div>


                    <div class="columns">
                        <div class="column">
                            <!-- Message Color Input -->
                            <div class="field">
                                <label class="label">Message Color</label>
                                <div class="control">
                                    <div class="select w-100">
                                        <select v-model="messageObject.style" class="w-100">
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
                            <!-- Message Disabled Checkbox -->
                            <div class="field">
                                <label class="label">Disable Message</label>
                                <label class="checkbox large-checkbox">
                                    <input type="checkbox" v-model="messageObject.disabled">
                                    {{ messageObject.disabled ? 'Message Disabled' : 'Message Enabled' }}
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="columns">
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
                                    <td style="vertical-align: middle;">
                                        <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">
                                            [URL: {{ link.url }}]
                                        </span>
                                    </td>
                                    <td style="display: flex; justify-content: end;">
                                        <button class="button is-link is-small mr-2" @click="editLinkToggle(link)">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="button is-danger is-small" @click="deleteLink(link)">
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


            <!-- <div v-if="addLink" id="modal-link" class="modal" :class="{ 'is-active': addLink }">

                <div class="modal-background" @click="addLinkToggle()"></div>

                <div class="modal-card">

                    <header class="modal-card-head">
                        <p class="modal-card-title">Add Link</p>
                        <button class="delete" aria-label="close" @click="addLinkToggle()"></button>
                    </header>

                    <section class="modal-card-body">
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
                    </section>

                </div>
            </div>



            <div v-if="editLink" id="modal-link" class="modal" :class="{ 'is-active': editLink }">

                <div class="modal-background" @click="editLinkToggle()"></div>

                <div class="modal-card">

                    <header class="modal-card-head">
                        <p class="modal-card-title">Edit Link</p>
                        <button class="delete" aria-label="close" @click="editLinkToggle()"></button>
                    </header>

                    <section class="modal-card-body">
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
                    </section>

                </div>
            </div> -->

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

            messageObject: { title: null, content: null, style: 'is-dark' },
            linksArray: store.getters.links,

            footerHTML: null,
            footerDisabled: !!store.getters.footerDisabled,

            addLink: false,
            editLink: false,

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
            return !(this.addLink || this.editLink);
        },
    },
    methods: {
        onScroll(e) {
            this.windowTop = e.target.scrollTop;
        },
        backMain: function () {
            this.addLink = false;
            this.editLink = false;
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
        deleteLink: function (link) {
            store.dispatch('deleteLink', link);
            this.linksArray = this.linksArray.filter(links => links.id !== link.id)

            this.toast("Link deleted!", { type: "success", duration: 3000 });
        },
        pushAddedLink: function () {

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

            store.dispatch('addLink', link);
            this.addLinkToggle();

            this.toast("Link added!", { type: "success", duration: 3000 });
        },
        pushEditedLink: function () {

            const linkName = this.editLink.name;
            const linkUrl = this.editLink.url;
            const linkIcon = this.editLink.icon;
            const linkTarget = this.editLink.target;

            console.log(linkName, linkUrl, linkIcon, linkTarget);
        },
    },
};
</script>