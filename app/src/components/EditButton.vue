<template>
    <button class="button is-dark" @click="toggleEditLayout()" v-if="!editLayout">
        <span class="icon"><i class="fa fa-fw fa-edit"></i></span>
        <span>Edit</span>
    </button>
    <button class="button is-danger" @click="cancelPositions()" v-if="editLayout">
        <span class="icon"><i class="fa fa-fw fa-xmark"></i></span>
        <span>Cancel</span>
    </button>
    <button class="button is-success" @click="savePositions()" v-if="editLayout">
        <span class="icon"><i class="fa fa-fw fa-check"></i></span>
        <span>Save</span>
    </button>
</template>

<script>
import { useToast } from "vue-toastification";
import { store } from "../store";

export default {
    name: "EditButton",
    emits: ["toggleEditLayout"],
    props: {
        toDelete: Array,
        editLayout: Boolean,
        dashboard: Object
    },
    data() {
        return {
            toast: useToast()
        }
    },
    methods: {
        toggleEditLayout() {
            this.$emit("toggleEditLayout", !this.editLayout);
        },
        async savePositions() {
            let positions = [];

            // Create positions array
            this.dashboard.forEach((group, index) => {
                positions.push({
                    id: group.id,
                    position: index,
                    items: group.items.map((item, index) => {
                        return {
                            id: item.id,
                            position: index
                        }
                    })
                })
            });

            // Save positions
            const result = await fetch('/api/position', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(positions)
            })

            // Delete services that are marked for deletion
            this.toDelete.forEach(async (id) => {
                console.log(id);
                await store.dispatch("deleteService", id);
            });

            // Refresh services
            await store.dispatch("getServices");


            if (result.status === 200) {
                // Show success message
                this.toast.success("Saved successfully");
                this.toggleEditLayout();
            } else {
                // Show error message
                this.toast.error("Error while saving positions");
            }
        },
        async cancelPositions() {
            await store.dispatch("getServices");
            this.toggleEditLayout();
        }
    },
};
</script>