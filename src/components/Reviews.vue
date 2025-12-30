<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useReviewsStore } from '@/stores/review';
import Loader from './Loader.vue';
import ModalReview from './ModalReview.vue';
import ReviewCard from './ReviewCard.vue';


/* PROPS */
const props = defineProps<{
    productId: string
}>();

/* STORE PINIA reviews */
const reviewsStore = useReviewsStore();

/* REF */
const showModalReview = ref<boolean>(false); // stato per gestire l'apertura/chiusura della modale recensione prodotto

/* FUNCTIONS */
const handleReview = (): void => {
    showModalReview.value = !showModalReview.value; // inversione value attiva disattiva
}

/* WATCH */
// watch di controllo per la pagina prodotti per la scrittura della recensione tramite modale
watch(showModalReview, (isOpen) => {
    document.body.classList.toggle('no-scroll', isOpen);
});

/* ONMOUNTED */
onMounted(() => {
    reviewsStore.fetchReviews(props.productId);
});
</script>


<template>
    <h3 class="header title-line">
        <span>Customer Reviews</span>
    </h3>

    <div class="p-3">
        <!-- caricamento -->
        <Loader v-if="reviewsStore.stateReviews.isLoading" />
        <!-- errore generico-->
        <p v-else-if="reviewsStore.stateReviews.error" class="text-danger">
            {{ reviewsStore.stateReviews.error }}
        </p>
        <!-- nessuna recensione -->
        <p v-else-if="reviewsStore.stateReviews.reviews.length === 0">
            Nessuna recensione presente
        </p>
        <!-- Recensioni ciclate in card -->
        <div v-else class="d-flex flex-column">
            <ReviewCard v-for="(review, index) in reviewsStore.stateReviews.reviews" :key="index" :review="review" />
        </div>
    </div>

    <!-- pulsante add recensione -->
    <button class="btn btn-one mb-5" @click="handleReview">Scrivi recensione</button>
    <!-- modale creazione recensione del prodotto -->
    <ModalReview :show="showModalReview" @close="handleReview" />
</template>


<style lang="scss" scoped>
h3.title-line {
    display: flex;
    align-items: center;
    gap: 1rem;

    &::after {
        content: "";
        flex: 1;
        height: 2px;
        background: linear-gradient(to right, black 65%, rgb(117, 117, 117));
        border-radius: 20px;
    }

    span {
        white-space: nowrap;
    }
}
</style>