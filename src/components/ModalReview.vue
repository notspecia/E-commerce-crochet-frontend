<script setup lang="ts">
import { reactive, ref, computed, watch, onUnmounted } from 'vue'
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
const { tm } = useI18n();


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
    productDocumentId: productStore.stateProduct.product?.documentId || '', // for keep trace of the product while filtering
    titleProduct: productStore.stateProduct.product?.title || '',
    email: userStore.stateUser.user?.email,
    username: userStore.stateUser.user?.username || '',
    rating: 0,
    comment: '',
    originLang: locale.value,
});

/* COMPUTED */
const reviewVoices = computed(() => tm('reviewVoices')); // array di frasi in base alla valutazione data
const getVoiceMessage = computed((): string => {
    switch (true) {
        case reviewData.rating >= 1 && reviewData.rating < 3:
            return reviewVoices.value[0];
        case reviewData.rating >= 3 && reviewData.rating <= 4:
            return reviewVoices.value[1];
        case reviewData.rating >= 4:
            return reviewVoices.value[2];
        default:
            return '';
    }
});


/* FUNCTIONS */
// funzione per emettere gli eventi di chiusura tramite X LABEL
const onClose = (): void => {
    reviewData.rating = 0;
    reviewData.comment = '';
    emit('close');
}

// invio della recensione + cpntrollo loggato user
const submitReview = async () => {
    if (reviewData.rating < 1) {
        toastStore.addToast('danger', 'Devi selezionare una valutazione prima di inviare la recensione');
        return;
    }
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
                    <div class="py-1 px-3">
                        <div class="modal-header">
                            <h4 class="modal-title">
                                Rate us!
                            </h4>
                            <button type="button" class="btn-close" @click="onClose" />
                        </div>
                        <div class="modal-body">
                            <p class="text-center mb-5"> Let us know what you like and where we can get better. Rate us
                                and
                                type responses below. Your opinion is important for us!</p>
                            <div class="divisor w-50" />
                            <!-- rating -->
                            <div class="mb-3 d-flex flex-column align-items-center">
                                <p class="rating text-center">Rate your experience</p>
                                <div class="star-rating">
                                    <span v-for="star in 5" :key="star" class="star"
                                        :class="{ active: star <= reviewData.rating }"
                                        @click="reviewData.rating = star">
                                        ★
                                    </span>
                                </div>
                            </div>
                            <div class="divisor w-75" />
                            <!-- comment -->
                            <div class="mt-5 mb-2">
                                <label class="form-label" v-html="getVoiceMessage"></label>
                                <textarea v-model="reviewData.comment" class="form-control" rows="4" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary opacity-50" @click="onClose">
                            Annulla
                        </button>
                        <button type="submit" class="btn btn-submit" :disabled="isLoading">
                            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" />
                            {{ isLoading ? 'Processing...' : 'Send review' }} <i class="bi bi-send ms-1"></i>
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
        width: 92vw
    }

    .divisor {
        display: block;
        margin: 10px auto;
        height: 1px;
        background-color: black;
        border-radius: 120px;
    }

    .modal-title {
        font-family: $font-family-hand;
        font-size: 2.7rem;
    }

    .rating {
        font-size: 1.2rem;
        font-weight: $font-weight-bold;
        text-align: center;
    }

    .star-rating {
        display: flex;
        flex-direction: row;
        gap: 35px;
        font-size: 1.85rem;
    }

    .star {
        cursor: pointer;
        color: rgba(117, 117, 117, 0.412);
    }

    .star.active {
        color: #f5c518;
    }

    .modal-footer {
        justify-content: space-between;
        padding: 0;

        .btn {
            width: 50%;
            color: $color-white;
            padding: 18px;
            border-radius: 0;
            margin: 0;
        }

        .btn-submit {
            border-bottom-right-radius: 5px;
            background-color: $color-primary-500;

            &:hover {
                background-color: $color-primary-600;
            }
        }

        .btn-secondary {
            border-bottom-left-radius: 5px;
        }
    }
}
</style>
