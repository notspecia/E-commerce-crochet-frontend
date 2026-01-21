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
    <div class="review-item col-12 col-lg-5">
        <p class="review-user mb-1">
            <img src="@/assets/images/user.png">
            {{ review.username }}
        </p>
        <div class="star-rating">
            <i v-for="n in 5" :key="`star-${review.id}-${n}`" class="bi"
                :class="n <= review.rating ? 'bi-star-fill' : 'bi-star'"></i>
        </div>
        <p class="review-content mb-3">{{ reactiveReview }}</p>
        <template v-if="props.review.comment.length > 150">
            <button :class="showFullReview ? 'read-less' : 'read-more'" @click="handleReading()">
                {{ showFullReview ? 'Leggi meno' : 'Leggi tutta la recensione' }}
            </button>
        </template>
        <p class="review-date mb-0">
            {{ new Intl.DateTimeFormat('it-IT').format(new Date(review.publishedAt)) }}
        </p>
    </div>
</template>


<style lang="scss" scoped>
// card item recensione singola
.review-item {
    background-image: url(@/assets/images/foglio.png);
    background-color: rgba(255, 255, 255, 0.7);
    background-blend-mode: lighten;
    background-position: right;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 1rem 1.2rem;
    border-radius: 5px;
    height: fit-content;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

    .review-user {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: $font-weight-bold;

        img {
            width: 35px;
        }
    }

    .star-rating {
        gap: 0.3rem;
        display: flex;


        i.bi-star-fill {
            color: $color-primary-600;
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