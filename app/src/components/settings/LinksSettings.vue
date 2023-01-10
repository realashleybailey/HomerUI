<template>
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
</template>

<script>
export default {
    name: "LinksSettings",
    props: {
        linksArray: Array,
    },
    emits: ["addLinkToggle", "editLinkToggle", "deleteLink"],
    methods: {
        addLinkToggle: function (value) {
            this.$emit("addLinkToggle", value);
        },
        editLinkToggle: function (link) {
            this.$emit("editLinkToggle", link);
        },
        deleteLink: function (id) {
            this.$emit("deleteLink", id);
        },
    }
};
</script>