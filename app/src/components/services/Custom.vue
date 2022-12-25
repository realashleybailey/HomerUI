<template>
    <div>
        <div class="card" :style="`background-color:${item.background};`" :class="item.class">
            <a :href="item.url" :target="item.target" rel="noreferrer">
                <div class="card-content p-0 pl-4" style="display: flex; align-items: center;">

                    <div class="columns is-mobile" :style="[item.tag ? 'margin-bottom: -15px;' : '']">

                        <div class="column pr-1" style="display: flex; align-items: center;">
                            <slot name="icon">
                                <div v-if="item.logo" style="display: flex; align-items: center;">
                                    <figure class="image is-48x48">
                                        <img :src="item.logo" :alt="`${item.name} logo`" />
                                    </figure>
                                </div>
                                <div v-if="item.icon" style="display: flex; align-items: center;">
                                    <figure class="image is-48x48">
                                        <i style="font-size: 35px" :class="['fa-fw', item.icon]"></i>
                                    </figure>
                                </div>
                            </slot>
                        </div>

                        <div class="column">
                            <slot name="content">
                                <p class="title is-4" :class="[livestats ? 'm-0 mb-1' : '']">{{ item.name }}</p>
                                <template v-if="livestats">
                                    <span v-html="livestats"></span>
                                </template>
                                <template v-else-if="item.subtitle">
                                    <p class="subtitle is-6">
                                        {{ item.subtitle }}
                                    </p>
                                </template>
                            </slot>
                        </div>
                    </div>
                    <div class="tag" :class="item.tagstyle" v-if="item.tag">
                        <strong class="tag-text">#{{ item.tag }}</strong>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
  
<script>
import service from "@/mixins/service.js";

export default {
    name: "Custom",
    mixins: [service],
    props: {
        item: Object,
    },
    data: () => {
        return {
            status: null,
            livestats: null,
            interval: null,
        };
    },
    mounted() {
        // this.queueJob();

        this.$socket.emit(`service-${this.item.id}`, { id: this.item.id })

        this.interval = setInterval(() => {
            this.$socket.emit(`service-${this.item.id}`, { id: this.item.id })
        }, 5000);

        this.sockets.subscribe(`service-${this.item.id}`, (data) => {
            if (data.html) this.livestats = data.html;
        });
    },
    methods: {
        queueJob() {
            this.$store.dispatch('queue/addJob', {
                id: this.item.id,
                handler: function () {
                    setTimeout(function () {
                        // this.interval = setInterval(() => {
                        this.$socket.emit(`service-${this.item.id}`, { id: this.item.id })
                        // }, 5000);
                        this.$store.dispatch('queue/startNextJob');
                    }.bind(this), 3000);
                }.bind(this)
            });
        }
    },
    beforeUnmount() {
        clearInterval(this.interval);
    },
    computed: {
        mediaClass: function () {
            return { media: true, "no-subtitle": !this.item.subtitle };
        },
    },
};
</script>
  
<style scoped lang="scss">
.media-left {
    .image {
        display: flex;
        align-items: center;
    }

    img {
        max-height: 100%;
    }
}

.status {
    font-size: 0.8rem;
    color: var(--text-title);

    &.enabled:before {
        background-color: #94e185;
        border-color: #78d965;
        box-shadow: 0px 0px 4px 1px #94e185;
    }

    &.disabled:before {
        background-color: #c9404d;
        border-color: #c42c3b;
        box-shadow: 0px 0px 4px 1px #c9404d;
    }

    &.unknown:before {
        background-color: #c9c740;
        border-color: #ccc935;
        box-shadow: 0px 0px 4px 1px #c9c740;
    }

    &:before {
        content: " ";
        display: inline-block;
        width: 7px;
        height: 7px;
        margin-right: 10px;
        border: 1px solid #000;
        border-radius: 7px;
    }
}
</style>
  