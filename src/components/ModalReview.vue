<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useReviewsStore } from '@/stores/review';
import { useProductStore } from '@/stores/product';
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast';
import { useI18n } from 'vue-i18n';
import type Review from '@/models/Review.model'


/* PROPS */
const props = defineProps<{
    show: boolean
}>();

/* I18N LANG */
const { locale } = useI18n(); // recupero per settare la lingua di origine della recensione

/* ROUTER */
const router = useRouter();

/* EMITS */
const emit = defineEmits(['close']);

/* PINIA STORE review, product, user, toast */
const reviewStore = useReviewsStore();
const productStore = useProductStore();
const userStore = useUserStore();
const toastStore = useToastStore();

/* REF */
const isLoading = ref<boolean>(false);

/* REACTIVE */
const reviewData = reactive<Review>({
    productDocumentId: productStore.stateProduct.product?.documentId || '',
    titleProduct: productStore.stateProduct.product?.title || '',
    email: userStore.stateUser.user?.email,
    rating: 0,
    comment: '',
    originLang: locale.value,
});


/* FUNCTIONS */
// funzione per emettere gli eventi di chiusura tramite X LABEL
const onClose = (): void => {
    emit('close');
}

// invio della recensione + cpntrollo loggato user
const submitReview = async () => {
    isLoading.value = true;
    await reviewStore.createReview(reviewData);
    isLoading.value = false;
    onClose();
}


/* WATCHS */
// used for check when modal is open if the user is logged and can write a review
watch(() => props.show, (isOpen) => {
    if (isOpen && !userStore.isLoggedIn) {
        emit('close');
        router.push('/register');
        toastStore.addToast('light', 'Devi essere registrato per scrivere una recensione');
    }
});
</script>


<template>
    <div v-if="show" class="modal-wrapper">
        <!-- overlay -->
        <div class="overlay" />
        <!-- backdrop -->
        <div class="modal-backdrop custom-backdrop" />
        <!-- modal -->
        <div class="modal" role="dialog" aria-modal="true" tabindex="-1">
            <form class="modal-dialog" @submit.prevent="submitReview">
                <div class="modal-content text-black">
                    <div class="modal-header">
                        <h4 class="modal-title">
                            Scrivi una recensione
                        </h4>
                        <button type="button" class="btn-close" @click="onClose" />
                    </div>
                    <div class="modal-body">
                        <!-- email -->
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" :value="reviewData.email" readonly />
                        </div>
                        <!-- rating -->
                        <div class="mb-3">
                            <label class="form-label">Voto</label>
                            <div class="star-rating">
                                <span v-for="star in 5" :key="star" class="star"
                                    :class="{ active: star <= reviewData.rating }" @click="reviewData.rating = star">
                                    ★
                                </span>
                            </div>
                        </div>
                        <!-- comment -->
                        <div class="mb-3">
                            <label class="form-label">Commento</label>
                            <textarea v-model="reviewData.comment" class="form-control" rows="4" required />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="onClose">
                            Annulla
                        </button>
                        <button type="submit" class="btn btn-submit" :disabled="isLoading">
                            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" />
                            {{ isLoading ? 'Processing...' : 'Send review' }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>



<style scoped lang="scss">
.modal-backdrop {
    width: 100%;
    height: 100%;
}

.modal-dialog {
    max-width: none !important;
}

.modal-content {
    width: 43vw;

    @media (max-width: $breakpoint-lg) {
        width: 90vw
    }

    .star-rating {
        font-size: 1.75rem;
    }

    .star {
        cursor: pointer;
        color: #ccc;
        margin-right: 4px;
    }

    .star.active {
        color: #f5c518;
    }

    .btn-submit {
        color: $color-white;
        background-color: $color-primary-400;
    }
}
</style>
