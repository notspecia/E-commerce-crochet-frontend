<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useOrdersStore } from '@/stores/orders';
import OrderCard from '@/components/OrderCard.vue';
import Loader from '@/components/Loader.vue';
import GoBack from '@/components/GoBack.vue';


/* ROUTER */
const router = useRouter();

/* PINIA STORES orders and user */
const ordersStore = useOrdersStore();
const userStore = useUserStore();

/* ONMOUNTED */
onMounted(() => {
    // controllo se l'utente è loggato, altrimenti reindirizzo alla homepage
    if (!userStore.isLoggedIn) {
        router.push('/');
    } else {
        // fetch ordini utente loggato
        ordersStore.fetchOrders();
    }
});
</script>


<template>
    <section class="py-5">
        <h2 class="mb-5 header">I tuoi ordini</h2>
        <!-- go to previous route -->
        <GoBack />

        <!-- caricamento ordini loader -->
        <Loader v-if="ordersStore.stateOrders.isLoading" />
        <!-- gestione errori di fetch caricamento -->
        <p v-else-if="ordersStore.stateOrders.error" class="text-danger">{{ ordersStore.stateOrders.error }}</p>
        <!-- card preview degli ordini -->
        <div v-else-if="ordersStore.stateOrders.orders.length > 0" class="row">
            <OrderCard v-for="(order, index) in ordersStore.stateOrders.orders" :key="index" :order="order" />
        </div>
        <!-- se non presenti ordini nell'account dell'utente -->
        <div v-else class="text-center mt-5 pt-5">
            <p class="fs-4 mb-4">Non hai effetuato ordini!</p>
            <button class="btn btn-one text-white" @click="() => { router.push(`/products`); }">
                Vai ai prodotti
            </button>
        </div>
    </section>
</template>


<style lang="scss" scoped></style>