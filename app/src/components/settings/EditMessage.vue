<template>

    <!-- Message Title Input -->
    <div class="field">
        <label class="label">Message Title</label>
        <div class="control">
            <input class="input" type="text" v-model="message.title">
        </div>
    </div>

    <!-- Message HTML Input -->
    <div class="field">
        <label class="label">Message HTML</label>
        <div class="control">
            <textarea class="textarea" type="text" v-model="message.content"></textarea>
        </div>
    </div>


    <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Message Color</label>
                <div class="control">
                    <div class="select w-100">
                        <select v-model="message.style" class="w-100">
                            <option>is-dark</option>
                            <option>is-primary</option>
                            <option>is-link</option>
                            <option>is-info</option>
                            <option>is-success</option>
                            <option>is-warning</option>
                            <option>is-danger</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">Disable Message</label>
                <label class="checkbox large-checkbox">
                    <input type="checkbox" v-model="message.disabled">
                    {{ message.disabled ? 'Message Disabled' : 'Message Enabled' }}
                </label>
            </div>
        </div>
    </div>

    <div class="buttons is-right">
        <button class="button is-link" style="background-color: var(--highlight-secondary)" @click="pushEditedMessage()">Edit Message</button>
    </div>
</template>

<script>
export default {
    name: "EditMessage",
    props: {
        message: Object,
    },
    emits: ["editMessage"],
    methods: {
        pushEditedMessage() {
            this.$emit("editMessage", this.message);
        },
    },
};
</script>