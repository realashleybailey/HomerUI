<template>
    <section class="section">
        <div class="container">

            <Multiselect v-model="value" :searchable="true" placeholder="Select or Search for service" label="name" :options="options">
                <template v-slot:singlelabel="{ value }">
                    <div class="multiselect-single-label">
                        <img class="is-icon" :src="`/assets/tools/${value.icon}`" :onerror="`this.onerror=null; this.src='${logo}'`">
                        {{ value.name }}
                    </div>
                </template>

                <template v-slot:option="{ option }">
                    <img class="is-icon" :src="`/assets/tools/${option.icon}`" :onerror="`this.onerror=null; this.src='${logo}'`">
                    {{ option.name }}
                </template>
            </Multiselect>

            <div v-if="value" class="mt-5">
                <div class="card has-text-light-dark" style="transform: none;">
                    <div class="card-content" style="height: auto;">
                        <div class="columns">


                            <div class="column is-one-fifth p-5">
                                <div ref="serviceImg">
                                    <img :src="`/assets/tools/${value.icon}`" :onerror="`this.onerror=null; this.src='${logo}'`" style="width: 100%; height: 100%; object-fit: contain; aspect-ratio: 1/1;">
                                </div>
                            </div>

                            <div class="column pt-4">
                                <div ref="serviceContent">
                                    <h1 class="title-text">{{ value.name }}</h1>
                                    <p class="info-text-p">{{ value.description }}</p>
                                    <div class="icon-text pt-2">
                                        <span class="icon">
                                            <i class="fas fa-link"></i>
                                        </span>
                                        <span><a :href="value.website" target="_blank">{{ cleanUrl(value.website) }}</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span class="tag is-normal">{{ value.license }}</span>
                </div>

                <h2 class="group-title mb-0 mt-6"> Service Details </h2>

                <div class="mt-4">

                    <div class="columns has-text-light-dark">
                        <div class="column">
                            <div class="field">
                                <label class="label has-text-light-dark">Service Name *</label>
                                <div class="control">
                                    <input class="input" type="text" :value="value.name">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label has-text-light-dark">Service URL *</label>
                                <div class="control">
                                    <input class="input" type="text">
                                </div>
                            </div>
                        </div>
                    </div>

                    <template v-if="fields">
                        <div class="divider">
                            <div class="divider-text has-text-light-dark">Service API (Optional)</div>
                        </div>
                        <div class="columns has-text-light-dark is-multiline">
                            <div class="column is-half" v-for="field in fields">
                                <div class="field">
                                    <label class="label has-text-light-dark">{{ field.header }} {{ field.required ? '*' : '' }}</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="form[field.name]" :placeholder="field.placeholder">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

                    <div class="buttons is-right">
                        <button v-if="fields" class="button is-link is-warning" @click="testAPI()">Test API</button>
                        <button class="button is-link" style="background-color: var(--highlight-secondary)">Add Service</button>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<style lang="scss">
.divider.no-text:not(.is-left):before {
    margin-right: 0px;
}

.divider.no-text:not(.is-right):after {
    margin-left: 0px;
}

.is-dark {
    .has-text-light-dark {
        color: hsl(0, 0%, 96%);
    }

    .multiselect-search {
        caret-color: hsl(0, 0%, 96%);
    }
}

.is-light {
    .has-text-light-dark {
        color: hsl(0, 0%, 21%)
    }

    .multiselect-search {
        caret-color: hsl(0, 0%, 21%);
    }
}

.is-icon {
    width: 40px;
    height: 40px;
    margin-right: 15px;
}

.info-text-p {
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.is-dark {
    --ms-font-size: 1.3rem;
    --ms-line-height: 1.375;
    --ms-bg: var(--card-background);
    --ms-border-width: 0px;
    --ms-border-width-active: 0px;
    --ms-radius: 4px;
    --ms-ring-width: 1px;
    --ms-ring-color: var(--card-background);
    --ms-placeholder-color: #9CA3AF;
    --ms-max-height: 25rem;

    --ms-dropdown-bg: var(--card-background);
    --ms-dropdown-border-color: var(--card-shadow);
    --ms-dropdown-border-width: 1px;
    --ms-dropdown-radius: 4px;

    --ms-option-font-size: 1rem;

    --ms-option-bg-pointed: #383737;
    --ms-option-color-pointed: #FFFFFF;

    --ms-option-bg-selected: #3c3a3a;
    --ms-option-color-selected: #FFFFFF;

    --ms-option-bg-selected-pointed: #383737;
    --ms-option-color-selected-pointed: #FFFFFF;

    --ms-option-py: 0.5rem;
    --ms-option-px: 0.75rem;

    --ms-empty-color: #4B5563;
}

.is-light {

    --ms-font-size: 1.3rem;
    --ms-line-height: 1.375;
    --ms-border-width: 0px;
    --ms-border-width-active: 0px;
    --ms-ring-width: 1px;
    --ms-max-height: 25rem;
    --ms-dropdown-border-width: 1px;
    --ms-dropdown-radius: 4px;
    --ms-option-font-size: 1rem;

    --ms-bg: #FFFFFF;
    --ms-border-color: #D1D5DB;
    --ms-border-color-active: #D1D5DB;
    --ms-radius: 4px;
    --ms-ring-color: #10B98130;
    --ms-placeholder-color: #9CA3AF;

    --ms-dropdown-bg: #FFFFFF;
    --ms-dropdown-border-color: #D1D5DB;
    --ms-dropdown-border-width: 1px;
    --ms-dropdown-radius: 4px;

    --ms-option-font-size: 1rem;

    --ms-option-bg-pointed: var(--highlight-secondary);
    --ms-option-color-pointed: #FFFFFF;

    --ms-option-bg-selected: var(--highlight-secondary);
    --ms-option-color-selected: #FFFFFF;

    --ms-option-bg-selected-pointed: var(--highlight-primary);
    --ms-option-color-selected-pointed: #FFFFFF;

    --ms-option-py: 0.5rem;
    --ms-option-px: 0.75rem;

    --ms-empty-color: #4B5563;
}

/* .multiselect-option {
    background: var(--text-subtitle) !important;
    color: #555d67;
} */

/* .multiselect-option.is-pointed {
    background: var(--text) !important;
} */

.multiselect-wrapper {
    height: 60px;
    box-shadow: 0 2px 15px 0 var(--card-shadow);
}

/* .multiselect-single-label {
    color: #555d67;
} */
</style>
<script>
import Multiselect from '@vueform/multiselect'
import store from '../store';

export default {
    name: 'App',
    components: { Multiselect },
    data() {
        return {
            value: null,
            options: [],
            fields: null,
            form: [],

            serviceImgHeight: 0,
        }
    },
    computed: {
        logo: function () {
            return store.getters.logo;
        }
    },
    async created() {
        const data = await fetch('/api/supportedapps');
        const apps = (await data.json()).apps;

        this.options = apps.map(app => {
            return {
                value: app,
                name: app.name,
                icon: app.icon,
            }
        });

        window.test = this
    },
    watch: {
        value: function (value) {
            this.fields = null;
            this.updateFields(value);
        }
    },
    methods: {
        async updateFields(value) {
            if (value === null) return;

            if (value.enhanced) {
                const nameClean = value.name.replace(/[^a-zA-Z]/g, '');
                const data = await fetch(`/api/supportedapps/config/${nameClean}`);

                if (data.status === 200) {
                    this.fields = (await data.json()).fields;
                }
            }
        },
        testAPI() {
            // Loop through the this.fields and check that all required fields are in this.form
            // if they are not alert error
            for (const element of this.fields) {
                const field = element;
                if (field.required && !this.form[field.name]) {
                    field.name = field.name.charAt(0).toUpperCase() + field.name.slice(1);
                    alert(`Missing required field: ${field.name}`);
                    return;
                }
            }

            alert('Success!');
        },
        customLabel({ title }) {
            return `${title}`
        },
        cleanUrl(url) {
            return url.replace(/(^\w+:|^)\/\//, '').replace('www.', '');
        }
    }
}
</script>