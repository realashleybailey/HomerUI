<template>
    <!-- Footer Title -->
    <h2 class="group-title">
        Footer Settings
    </h2>

    <!-- Footer Input -->
    <div class="field">
        <label class="label">Footer HTML</label>
        <div class="control">
            <textarea class="textarea" type="text" v-model="footerHTML" :placeholder="content" @dblclick="footerHTML = content"></textarea>
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
</template>

<script>
export default {
    name: "FooterSettings",
    props: {
        content: String,
        enabled: Boolean,
    },
    emits: ["update:content", "update:enabled"],
    data: function () {
        return {
            footerHTML: '',
            footerDisabled: this.footerEnabled,
        };
    },
    watch: {
        footerHTML: function (val) {
            this.$emit("update:content", val);
        },
        footerDisabled: function (val) {
            this.$emit("update:enabled", !val);
        },
    },
};
</script>