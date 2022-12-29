<template>
    <div class="columns is-multiline layout-vertical h-100 p-6">
        <div class="column is-full">
            <img src="/assets/tools/homer.png" style="height: 5rem;" />
        </div>

        <div class="column is-full">
            <h1 style="font-size: 2rem;">Your Account</h1>
        </div>
        <div class="column is-full p-3"></div>
        <div class="column is-full">
            <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
                <div class="fieldWidth">
                    <div class="field">
                        <label class="label">Username</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Username" />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" type="password" placeholder="Password" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-full p-6"></div>

        <div class="buttons" style="position: absolute; bottom: 0; right: 0px; margin: 0px 20px 14px 0px;">
            <button class="button is-link" @click="backPage()">Back</button>
            <button class="button is-link" @click="nextPage()">Create Account</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "OnBoard",
    methods: {
        backPage() {
            this.$emit("previousPage");
        },
        nextPage() {
            this.$emit("nextPage");
        }
    },
};
</script>