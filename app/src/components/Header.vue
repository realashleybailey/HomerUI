<template>
    <section v-if="!headerDisabled" class="first-line">
        <div v-cloak class="container">
            <div class="logo">
                <router-link to="/">
                    <img v-if="logo" :src="`${logo}`" alt="dashboard logo" />
                </router-link>
                <i v-if="icon" :class="icon"></i>
            </div>
            <div class="dashboard-title" :class="{ 'no-logo': !icon || !logo }" @click="goHome()">
                <span class="headline">{{ subtitle }}</span>
                <h1>{{ title }}</h1>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: {
            type: String,
            default: 'Dashboard'
        },
        subtitle: {
            type: String,
            default: 'Subtitle'
        },
        logo: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        headerDisabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        goHome() {
            this.$router.push({ name: 'Home' });
        }
    }
}
</script>