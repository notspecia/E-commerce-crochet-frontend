import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { useToastStore } from './toast';
import { API_BASE_URL } from '@/utils/costants';
import { GetReviews, PostReview } from '@/apis/Reviews.api';
import type Review from '@/models/Review.model';
import qs from 'qs';


export const useReviewsStore = defineStore('reviews', () => {

    /* IMPORTS PINIA USER and TOAST */
    const userStore = useUserStore();
    const toastStore = useToastStore();

    /* --------------STATE---------------- */
    // state reactive of the object whit array of reviews + bool loading and string error
    const stateReviews = reactive({
        reviews: [] as Review[],
        isLoading: false as boolean,
        error: null as null | string,
        start: 0 as number,
        limit: 4 as number,
        total: 0 as number
    });


    /* ------------ACTIONS------------- */
    // function to fetch reviews by productDocumentId of a product
    const fetchReviews = async (productId: string): Promise<void> => {
        console.log("le mie review prima del fetch", stateReviews.reviews);

        if (stateReviews.isLoading) return

        try {
            stateReviews.isLoading = true;

            // costruzione query string per filtrare le recensioni per productDocumentId
            const queryString = qs.stringify({
                filters: {
                    productDocumentId: { $eq: productId },
                    approved: { $eq: true }
                },
                pagination: {
                    start: stateReviews.start,
                    limit: stateReviews.limit
                },
                sort: ['createdAt:desc']
            });

            const response = await GetReviews(`${API_BASE_URL}/api/reviews?${queryString}`);
            const { data, meta } = response; // estraggo data e meta dalla risposta

            stateReviews.reviews.push(...data); // ACCUMULA solo per paginazione
            console.log("le mie review DOPO del fetch", stateReviews.reviews);
            stateReviews.total = meta.pagination.total;
            stateReviews.start += stateReviews.limit;

        } catch (error: any) {
            stateReviews.error = `${error}`;
        } finally {
            stateReviews.isLoading = false;
        };
    }

    const resetReviews = () => {
        stateReviews.reviews = [];
        stateReviews.start = 0;
        stateReviews.total = 0;
    };

    // function for create review authenticated
    const createReview = async (review: Review): Promise<Review> => {
        try {
            const response = await PostReview(`${API_BASE_URL}/api/reviews`, review, userStore.stateUser.bearerToken);
            console.log(response);
            toastStore.addToast('light', 'la tua recensione è stata inviata con successo!')
            return response;
        } catch (error: any) {
            throw error;
        }
    };


    return {
        stateReviews,
        fetchReviews,
        resetReviews,
        createReview
    };
});