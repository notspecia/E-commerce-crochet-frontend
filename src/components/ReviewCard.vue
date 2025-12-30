<script setup lang="ts">
import { computed, ref } from 'vue';
import type Review from '@/models/Review.model';


/* PROPS */
const props = defineProps<{
    review: Review
}>();

/* REF */
const showFullReview = ref<boolean>(false);

/* COMPUTED */
// riceverà la desceizione aggiornata ogni volta che "showFullDescription" si aggiornerà!
const reactiveReview = computed(() => {
    let reviewComment = props.review.comment;
    // verifichiamo il flag, se è false (READ MORE deve essere ancora cliccato), TRONCHIAMO la frase + la frase deve essere almeno > di 150 caratteri!
    if (!showFullReview.value && reviewComment.length > 150) {
        reviewComment = `${reviewComment.slice(0, 150)}...`;
    }
    return reviewComment; // returniamo la descrizione elaborata al cambiamento del flag -> "showFullDescription" / completa se sotto tot caratteri
});

/* FUNCTIONS */
const handleReading = (): void => {
    showFullReview.value = !showFullReview.value; // inversione value attiva disattiva
}
</script>


<template>
    <div class="review-item mb-4">
        <p class="review-user mb-1">
            {{ review.email }} –
            <img v-for="n in review.rating" :key="`star-${review.id}-${n}`" src="@/assets/images/star-rate.png" />
        </p>
        <p class="review-content mb-3">{{ reactiveReview }}</p>
        <template v-if="props.review.comment.length > 150">
            <button v-if="!showFullReview" class="read-more" @click="handleReading()">Leggi tutta la recensione</button>
            <button v-else class="read-less" @click="handleReading()">Leggi meno</button>
        </template>
        <p class="review-date mb-0">
            {{ new Intl.DateTimeFormat('it-IT').format(new Date(review.publishedAt)) }}
        </p>
    </div>
</template>


<style lang="scss" scoped>
// card item recensione singola
.review-item {
    width: 50%;
    background-color: $color-white;
    padding: 1rem 1.2rem;
    border-radius: 5px;

    @media (max-width: $breakpoint-lg) {
        width: 100%
    }

    .review-user {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        color: $color-gray-900;

        img {
            width: 16px;
            height: 16px;
        }
    }

    .review-content {
        margin: 0.4rem 0;
        line-height: 1.5;
        font-size: 1rem;
        color: $color-gray-800;
    }

    .review-date {
        font-size: 0.85rem;
        color: $color-gray-600;
        float: right;
    }
}

/* bottone toggle per mostrare di + della descrizione o di - */
button.read-more,
button.read-less {
    background: none;
    font-size: 0.9rem;
    text-decoration: underline;
    border: none;
    padding: 0;
}

button.read-more {
    color: $color-primary-600;
}

button.read-less {
    color: $color-gray-600;
}
</style>