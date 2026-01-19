<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue';
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
const showAllReviews = ref<boolean>(false);
const observer = ref<IntersectionObserver | null>(null);
const sentinel = ref<HTMLElement | null>(null);

/* COMPUTED */
// controllo se ci sono altre recensioni da fetachre o le abbiamo tutte
const hasMoreReviews = computed(() => {
    return reviewsStore.stateReviews.total > reviewsStore.stateReviews.limit &&
        reviewsStore.stateReviews.reviews.length < reviewsStore.stateReviews.total;
});
// controlla se siamo in loading iniziale (prima iterazione)
const isInitialLoading = computed(() => {
    return reviewsStore.stateReviews.isLoading && reviewsStore.stateReviews.reviews.length === 0;
});
// mostra il bottone "nascondi" solo se ci sono più di 3 recensioni caricate
const canHideReviews = computed(() => {
    return showAllReviews.value && reviewsStore.stateReviews.reviews.length > reviewsStore.stateReviews.limit;
})


/* FUNCTIONS */
const handleReview = (): void => {
    showModalReview.value = !showModalReview.value; // inversione value attiva disattiva
}

// funzione attivita e messa in funzione dopo che accettiamo di vedere tutte le recensioni, attivato observer per fetchare 3 recensioni alla volta!
const enableInfiniteScroll = async () => {
    showAllReviews.value = true;
    await nextTick(); // wait DOM update

    observer.value = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMoreReviews.value) {
            reviewsStore.fetchReviews(props.productId);
        }
    });

    // cerchiamo nodo DOM del sentinel e attiviamo l'observe su di esso
    if (sentinel.value) {
        observer.value.observe(sentinel.value);
    }
};

const hideAllReviews = () => {
    showAllReviews.value = false;
    // disconnetti observer
    if (observer.value) {
        observer.value.disconnect();
        observer.value = null;
    }
    // eset e ricarica solo le prime 3 recensioni
    reviewsStore.resetReviews();
    reviewsStore.fetchReviews(props.productId);
};

/* WATCH */
// watch di controllo per la pagina prodotti per la scrittura della recensione tramite modale
watch(showModalReview, (isOpen) => {
    document.body.classList.toggle('no-scroll', isOpen);
});

// smontaggio dell'observer
onUnmounted(() => {
    observer.value?.disconnect();
    observer.value = null;
});
</script>


<template>
    <section>
        <h3 class="header title-line">
            <span>Customer Reviews</span>
        </h3>

        <!-- modale creazione recensione del prodotto -->
        <ModalReview :show="showModalReview" @close="handleReview" />

        <div class="p-3">
            <!-- Primo LAODING del caricameno dei 3 recensioni -->
            <Loader v-if="isInitialLoading" />
            <!-- errore generico-->
            <p v-else-if="reviewsStore.stateReviews.error" class="text-danger">
                {{ reviewsStore.stateReviews.error }}
            </p>
            <!-- nessuna recensione -->
            <p v-else-if="reviewsStore.stateReviews.reviews.length === 0">
                Nessuna recensione presente
            </p>
            <!-- LISTA RECENSIONI -->
            <template v-else>
                <div class="row row-gap-4 column-gap-5">
                    <ReviewCard v-for="(review, index) in reviewsStore.stateReviews.reviews" :key="index"
                        :review="review" />
                </div>
                <!-- sentinel per infinite scroll (se abilitato) aggiorna reviews e riparte il ciclo -->
                <div v-if="showAllReviews" ref="sentinel" class="sentinel">
                    <Loader v-if="reviewsStore.stateReviews.isLoading" />
                    <p v-else-if="!hasMoreReviews" class="text-muted text-center mt-3">
                        Tutte le recensioni caricate
                    </p>
                </div>
            </template>
        </div>

        <!-- BUTTONS azioni (abilitati dopo il primo caricamento delle reviews) -->
        <div v-if="!isInitialLoading" class="actions-container">
            <p v-if="!showAllReviews && hasMoreReviews" class="handle-review" @click="enableInfiniteScroll">
                <span>Mostra tutte le recensioni ({{ reviewsStore.stateReviews.total }})</span>
                <i class="bi bi-chevron-down"></i>
            </p>
            <p v-else-if="canHideReviews" class="handle-review" @click="hideAllReviews">
                <span>Mostra meno recensioni </span>
                <i class="bi bi-chevron-up"></i>
            </p>
            <button class="d-block btn btn-one mx-auto mb-5" @click="handleReview">
                Scrivi recensione
            </button>
        </div>
    </section>
</template>


<style lang="scss" scoped>
section {
    margin-bottom: 7rem;

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

    .handle-review {
        display: inline-block;
        font-size: 1.2rem;
        cursor: pointer;

        &:hover {
            color: $color-gray-800;
        }

        span {
            text-decoration: underline;
        }
    }
}
</style>