<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { useReviewsStore } from '@/stores/reviews';
import { useRelatedProductsStore } from '@/stores/relatedProducts';
import Product from '@/components/Product.vue';
import Loader from '@/components/Loader.vue';
import GoBack from '@/components/GoBack.vue';
import Reviews from '@/components/Reviews.vue';
import RelatedProducts from '@/components/RelatedProducts.vue';


/* STORE PINIA product */
const productStore = useProductStore();
const reviewsStore = useReviewsStore();
const relatedProductsStrore = useRelatedProductsStore();

/* ROUTE */
const route = useRoute();

/* COMPUTED / REF */
const productId = computed((): string => route.params.documentId as string);

/* FUNCTIONS */
// used for the change of the route and mount of component detail
const loadProduct = async (): Promise<void> => {
    await productStore.fetchProduct(productId.value);

    // dopo aver caricato il prodotto parte load delle recensioni
    if (productStore.stateProduct.product) {
        reviewsStore.resetReviews(); // RESET prima di fetchare
        reviewsStore.fetchReviews(productStore.stateProduct.product.documentId);
    }
};

/* WATCH */
// used for check if the documentId detail change while using cart router.push()
watch(productId, () => {
    loadProduct();
}, { immediate: true });

/* ONMOUNTED */
onMounted(() => {
    loadProduct();
});
</script>


<template>
    <!-- go to previous route -->
    <GoBack label="torna ai prodotti" location="/products" />

    <!-- loader in caso nel pinia store dei prodotti non sia ancora pronto -->
    <Loader v-if="productStore.stateProduct.isLoading" />
    <!-- generic error, da mettere custom per ogni lingua  -->
    <p v-else-if="productStore.stateProduct.error" class="text-danger">{{ productStore.stateProduct.error }}</p>
    <!-- template component con il dettaglio del prodotto (product.ts) + recensioni (reviews.ts) + prodotti consigliati (relatedProducts.ts) -->
    <template v-else-if="productStore.stateProduct.product && !productStore.stateProduct.isLoading">
        <Product :product="productStore.stateProduct.product" />
        <Reviews :productId="productStore.stateProduct.product.documentId" />
        <RelatedProducts v-if="relatedProductsStrore.relatedProducts.length" />
    </template>
</template>


<style scoped lang="scss"></style>