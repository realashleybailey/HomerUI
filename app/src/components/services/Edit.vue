<template>
    <div class="card">
        <div class="buttons" style="position: absolute; right: -5px; top: -5px;">
            <button class="button is-small is-danger" @click="deleteService()" style="width: 25px; height: 25px; font-size: 1rem; padding: 0px; border-radius: 4px;">
                <i class="fas fa-xmark"></i>
            </button>
            <!-- <button class="button is-small" style="width: 30px; height: 30px; font-size: 1rem; padding: 0px;">
                <i class="fas fa-grip"></i>
            </button> -->
        </div>
        <div class="card-content p-0 pl-4" style="display: flex; align-items: center;">

            <div class="columns is-mobile">

                <div class="column pr-1" style="display: flex; align-items: center;">
                    <div style="display: flex; align-items: center;">
                        <figure class="image is-48x48">
                            <img :src="logo(item.logo)" :alt="`${item.name} logo`" />
                        </figure>
                    </div>
                </div>

                <div class="column">
                    <slot name="content">
                        <p class="title is-4">{{ item.name }}</p>
                        <p class="subtitle is-6">
                            {{ item.subtitle }}
                        </p>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../../store';

export default {
    name: "Edit",
    props: {
        item: Object,
    },
    methods: {
        logo: function (logo) {
            if (logo && logo.startsWith("http")) return logo;
            if (logo) return `/assets/tools/${logo}`;
            return '/assets/tools/homer.png';
        },
        deleteService: function () {
            this.$emit('deleteService', { id: this.item.id, groupId: this.item.group_id });
        }
    }
}
</script>