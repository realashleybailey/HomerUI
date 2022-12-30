<template>
    <section class="section">
        <div class="container">

            <Multiselect v-model="value" :searchable="true" placeholder="Select or Search for service" label="name" :groups="true" :options="supportedApps" @clear="clearValue()">
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

            <article v-if="value == null">
                <div class="m-6 has-text-centered py-6">
                    <p class="is-size-5 mb-0">No service selected!</p>
                    <p>Please select a service from the dropdown above.</p>
                </div>
            </article>

            <div v-if="value" class="mt-5">
                <div class="card has-text-light-dark" style="transform: none;" v-if="value.type !== 'website'">
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

                    <div class="columns has-text-light-dark is-multiline">

                        <div class="column is-half">
                            <div class="field">
                                <label class="label has-text-light-dark">Service Name *</label>
                                <div class="control has-icons-right">
                                    <input class="input" type="text" v-model="form.name" :class="[v$.form.name.$error ? 'is-danger' : '']">
                                    <span class="icon is-small is-right" v-if="v$.form.name.$error">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </span>
                                </div>
                                <p v-for="error in v$.form.name.$errors" :key="error.$uid" class="help is-danger">{{ error.$message }}</p>
                            </div>
                        </div>


                        <div class="column is-half">
                            <label class="label has-text-light-dark">Service URL *</label>
                            <div class="field has-addons mb-0">
                                <div class="control">
                                    <div class="select">
                                        <select v-model="form.protocol">
                                            <option value="http://">http://</option>
                                            <option value="https://" selected>https://</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control has-icons-right" style="width: 100%;">
                                    <input class="input" type="text" v-model="form.url" :class="[v$.form.url.$error ? 'is-danger' : '']">
                                    <span class="icon is-small is-right" v-if="v$.form.url.$error">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </span>
                                </div>
                            </div>
                            <p v-for="error in v$.form.url.$errors" :key="error.$uid" class="help is-danger">{{ error.$message }}</p>
                        </div>


                        <div class="column is-half">
                            <div class="field">
                                <label class="label has-text-light-dark">Service Icon</label>
                                <div class="control has-icons-left">
                                    <span class="icon is-small is-left">
                                        <img :src="`/assets/tools/${form.logo}`" onerror="this.src = '/assets/tools/homer.png';" style="width: 20px; height: 20px;">
                                    </span>
                                    <input class="input" type="text" v-model="form.logo">
                                </div>
                            </div>
                        </div>

                        <div class="column is-half">
                            <div class="field">
                                <label class="label has-text-light-dark">Service Group *</label>
                                <div class="control">
                                    <div class="select" style="width: 100%;">
                                        <select style="width: 100%;" v-model="form.groupId">
                                            <option v-for="group in groups" :value="group.id">{{ group.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <template v-if="fields">
                        <div class="divider">
                            <div class="divider-text has-text-light-dark">Service API (Optional)</div>
                        </div>
                        <div class="pb-4 is-flex is-justify-content-end	">
                            <div class="field">
                                <input id="toggleAPI" name="toggleAPI" type="checkbox" class="switch is-rounded is-info" v-model="form.enhanced">
                                <label for="toggleAPI" class="label has-text-light-dark"></label>
                            </div>
                        </div>
                        <div class="columns has-text-light-dark is-multiline">
                            <div class="column is-half" v-for="field in fields">
                                <div class="field">
                                    <label class="label has-text-light-dark">{{ field.header }} {{ field.required ? '*' : '' }}</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="form[field.name]" :placeholder="field.placeholder" :class="[v$.form[field.name].$error ? 'is-danger' : '']">
                                    </div>
                                    <p v-for="error in v$.form[field.name].$errors" :key="error.$uid" class="help is-danger">{{ error.$message }}</p>
                                </div>
                            </div>
                        </div>
                    </template>

                    <div class="buttons is-right">
                        <button v-if="fields" class="button is-link is-warning" @click="testAPI()">Test API</button>
                        <button class="button is-link" style="background-color: var(--highlight-secondary)" @click="addService()">Add Service</button>
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

.multiselect-search {
    color: white;
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
    --ms-font-color: var(--text);
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

    --ms-group-label-font-size: 1rem;
    --ms-group-label-bg: var(--card-shadow);
    --ms-group-label-color: var(--text);

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

    --ms-group-label-font-size: 1rem;
    --ms-group-label-bg: var(--card-shadow);
    --ms-group-label-color: var(--text);

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

.is-danger.textarea,
.is-danger.input,
.is-danger.field {
    border-color: hsl(348deg, 86%, 61%) !important;
}

/* .multiselect-single-label {
    color: #555d67;
} */
</style>

<script>
import { store } from '../store';

import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers, requiredIf } from '@vuelidate/validators'
import { useToast } from "vue-toastification";
import Multiselect from '@vueform/multiselect';

const isURL = helpers.withMessage('Must be a valid URL', helpers.withParams(
    { type: 'url' },
    (value) => {
        if (!value) return true;
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value);
    }))

export default {
    name: 'App',
    components: { Multiselect },
    data() {
        return {
            toast: useToast(),
            v$: useVuelidate(),
            value: null,
            fields: null,

            form: {
                groupId: null,
                name: null,
                icon: null,
                url: null,
            },

            serviceImgHeight: 0,
        }
    },
    validations() {
        return {
            form: {
                groupId: {
                    required,
                    minLength: minLength(1),
                },
                name: {
                    required,
                    minLength: minLength(1),
                },
                logo: {
                    required,
                    minLength: minLength(1),
                },
                url: {
                    required,
                    isURL: isURL
                },

                username: {
                    required: requiredIf(function () {
                        return this.form.enhanced && !!this.fields.find(field => field.name === 'username')
                    }),
                },

                password: {
                    required: requiredIf(function () {
                        return this.form.enhanced && !!this.fields.find(field => field.name === 'password')
                    }),
                },

                endpoint: {
                    isURL: helpers.withMessage('Must be a valid URL', helpers.withParams(
                        { type: 'url' },
                        (value) => {
                            if (!value || !this.form.enhanced) return true;
                            return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value);
                        }))
                },
            }
        }
    },
    computed: {
        logo: function () {
            return store.getters.logo;
        },
        supportedApps: function () {

            const apps = store.getters.supportedApps.map(app => {
                return {
                    value: app,
                    name: app.name,
                    icon: app.icon,
                }
            });

            const others = [
                {
                    value: {
                        icon: "web.png",
                        type: "website",
                    },
                    name: "Website (Custom)",
                    icon: "web.png",
                }
            ]

            return [{ label: " Other Options", options: others }, { label: "Apps", options: apps }]
        },
        groups: function () {
            return store.getters.groups;
        }
    },
    async mounted() {
        window.testing = this;
    },
    watch: {
        value: function (value) {
            console.log(value);
            this.fields = null;
            this.form = [];
            if (value === null) return;
            this.updateFields(value);

            this.form.name = value.name;
            this.form.protocol = "https://"
            this.form.logo = value.icon;
            this.form.groupId = 1;
        },
        form: function (value) {
            console.log(value);
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

            console.log(this.form);

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
        addService() {

            this.v$.$validate();

            if (this.v$.$error) {
                this.toast.error('Please fill out all required fields correctly');
                return;
            };

            let service = {
                groupId: this.form.groupId,
                name: this.form.name,
                subtitle: 'This is a test',
                appid: this.value.appid,
                icon: '',
                logo: this.form.logo,
                url: this.form.protocol + this.form.url,
                endpoint: this.form.endpoint || this.form.protocol + this.form.url,
                license: this.value.license,
                description: this.value.description,
                enhanced: this.form.enhanced || false,
                type: this.form.type || 'Custom',
                tag: this.form.tag || this.form.name
            }

            store.dispatch('createService', service);
            store.dispatch("getServices");

            this.clearValue();
        },
        customLabel({ title }) {
            return `${title}`
        },
        cleanUrl(url) {
            return url.replace(/(^\w+:|^)\/\//, '').replace('www.', '');
        },
        clearValue() {
            this.value = null;
        },
    }
}
</script>