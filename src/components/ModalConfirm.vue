<script setup lang="ts">

/* PROPS */
defineProps<{
    show: boolean
}>();

/* EMITS */
const emits = defineEmits<{
    (e: 'close'): void
    (e: 'logout'): void
}>();

/* FUNCTIONS */
// funzione per emettere gli eventi di chiusura tramite X LABEL
const onClose = (): void => {
    emits('close');
}
const onConfirmLogout = (): void => {
    emits('logout');
}
</script>


<template>
    <div v-if="show">
        <div class="modal-backdrop custom-backdrop" />
        <div class="modal" tabindex="-1" role="dialog" aria-modal="true">
            <div class="modal-dialog">
                <div class="modal-content text-black">
                    <div class="modal-header">
                        <h5 class="modal-title">Vuoi davvero uscire?</h5>
                        <button type="button" class="btn-close" @click="onClose"></button>
                    </div>
                    <div class="modal-body">
                        <p>Sei sicuro di voler disconnetterti dal tuo account?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary opacity-50" @click="onClose">Chiudi</button>
                        <button type="button" class="btn btn-custom-primary" @click="onConfirmLogout">Conferma</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
.btn-custom-primary {
    background-color: $color-primary-500;
    color: $color-white;
    border: none;

    &:hover {
        color: $color-white;
        background-color: $color-primary-600;
    }
}
</style>
