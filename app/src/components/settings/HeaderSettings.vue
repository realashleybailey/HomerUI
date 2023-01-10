<template>
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
            <input type="checkbox" v-model="enabled">
            {{ enabled ? 'Header Disabled' : 'Header Enabled' }}
        </label>
    </div>
</template>

<script>
export default {
    name: "HeaderSettings",
    props: {
        title: String,
        subtitle: String,
        logo: String,
        header: Boolean,
    },
    emits: ["update:title", "update:subtitle", "update:logo", "update:enabled"],
    data: function () {
        return {
            titleText: '',
            subtitleText: '',
            logoURL: '',
            enabled: this.header,
        };
    },
    watch: {
        titleText: function (val) {
            this.$emit("update:title", val);
        },
        subtitleText: function (val) {
            this.$emit("update:subtitle", val);
        },
        logoURL: function (val) {
            this.$emit("update:logo", val);
        },
        enabled: function (val) {
            this.$emit("update:enabled", val);
        },
    },
};
</script>