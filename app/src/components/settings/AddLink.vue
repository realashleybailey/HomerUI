<template>
    <div class="field">
        <p class="control has-icons-left has-icons-right">
            <input v-model="link.name" class="input" type="text" placeholder="Name">
            <span class="icon is-small is-left">
                <i class="fas fa-font"></i>
            </span>
        </p>
    </div>
    <div class="field">
        <p class="control has-icons-left">
            <input v-model="link.url" class="input" type="text" placeholder="URL">
            <span class="icon is-small is-left">
                <i class="fas fa-link"></i>
            </span>
        </p>
    </div>
    <div class="field">
        <p class="control has-icons-left has-icons-right">
            <input v-model="link.icon" class="input" type="text" placeholder="Font Awesome Icon">
            <span class="icon is-small is-left">
                <i class="fas fa-icons"></i>
            </span>
            <span class="icon is-small is-right">
                <i class="fas" :class="[link.icon]"></i>
            </span>
        </p>
    </div>
    <div class="field">
        <!-- Dropdown to select how the link should be opened -->
        <div class="select">
            <select v-model="link.target">
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

<script>
export default {
    name: "AddLink",
    props: {
        link: Object,
    },
    emits: ["addLink"],
    methods: {
        pushAddedLink: function () {
            this.$emit("addLink", this.link);
        },
    }
};
</script>