<script setup lang="ts">
import { ref } from 'vue';
import { useOrdersStore } from '@/stores/orders';
import { useCartStore } from '@/stores/cart';


/* PINIA STORE orders and cart */
const ordersStore = useOrdersStore();
const cartStore = useCartStore();

/* REF */
const isLoading = ref<boolean>(false);

/* FUNCTION HANDLE PAYMENT */
const handlePayment = async () => {
    isLoading.value = true;
    await cartStore.syncCart(); // sincronizzo il carrello dell'utente prima di procedere al checkout
    await ordersStore.createStripeCheckoutSession(); // creo la sessione di checkout su stripe
    isLoading.value = false;
}
</script>


<template>
    <button class="btn btn-one w-100" :disabled="isLoading" @click="handlePayment">
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
        {{ isLoading ? 'Processing...' : 'Proceed to check out' }}
    </button>
</template>


<style scoped lang="scss"></style>