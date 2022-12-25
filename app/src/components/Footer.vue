<template>
    <footer class="footer" v-if="footer && !footerDisabled">
        <div class="container">
            <div class="content has-text-centered" v-html="footer"></div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    props: {
        footer: {
            type: String,
            default: ''
        },
        footerDisabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>