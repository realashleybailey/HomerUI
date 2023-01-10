<template>
    <!-- Header Title -->
    <h2 class="group-title">
        Dashboard Messages
    </h2>

    <div class="field">

        <label class="label">Add Messages</label>

        <div class="message mt-3" v-if="messagesArray.length <= 0">
            <div class="message-body has-text-centered">
                No messages have been added yet.
            </div>
        </div>

        <table class="table is-fullwidth is-striped" v-if="messagesArray.length > 0">
            <tbody>
                <tr v-for="message in messagesArray">
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
                        <button class="button is-danger is-small" @click="deleteMessage(message.id)">
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
</template>

<script>
export default {
    name: "MessagesSettings",
    props: {
        messagesArray: Array,
    },
    emits: ["addMessageToggle", "editMessageToggle", "deleteMessage"],
    methods: {
        addMessageToggle: function (value) {
            this.$emit("addMessageToggle", value);
        },
        editMessageToggle: function (message) {
            this.$emit("editMessageToggle", message);
        },
        deleteMessage: function (id) {
            this.$emit("deleteMessage", id);
        },
    },
};
</script>