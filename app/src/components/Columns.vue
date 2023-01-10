<template>
    <div class="columns" :class="{ 'is-multiline': multiline }">
        <div class="column" v-for="component in components" :key="component.name" :class="columnsClass">
            <component :is="component" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Columns",
    props: {
        columns: {
            type: Number,
            default: 0,
        },
        multiline: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            components: [],
        };
    },
    created() {
        if (this.columns < 0 || this.columns > 12) throw new Error("Columns must be between 1 and 12");
        this.components = this.$slots.default();
    },
    computed: {
        columnsClass() {
            return (this.columns === 0 ? "" : `is-${this.calculatedColumns}`)
        },
        calculatedColumns() {
            return 12 / this.columns;
        },
    },
};
</script>