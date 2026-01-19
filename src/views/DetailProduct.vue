<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { useReviewsStore } from '@/stores/review';
import Product from '@/components/Product.vue';
import Loader from '@/components/Loader.vue';
import GoBack from '@/components/GoBack.vue';
import Reviews from '@/components/Reviews.vue';


/* STORE PINIA product */
const productStore = useProductStore();
const reviewsStore = useReviewsStore();

/* ROUTE */
const route = useRoute();

/* FUNCTIONS */
// used for the change of the route and mount of component detail
const loadProduct = async (): Promise<void> => {
    await productStore.fetchProduct(route.params.slug as string);

    // dopo aver caricato il prodotto parte load delle recensioni
    if (productStore.stateProduct.product) {
        reviewsStore.resetReviews(); // RESET prima di fetchare
        reviewsStore.fetchReviews(productStore.stateProduct.product.documentId);
    }
};

/* WATCH */
// used for check if the documentId detail change while using cart router.push()
watch(
    () => route.params.slug as string,
    () => {
        loadProduct();
    }
);

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
    <!-- template component con il dettaglio del prodotto + recensioni -->
    <template v-else-if="productStore.stateProduct.product && !productStore.stateProduct.isLoading">
        <Product :product="productStore.stateProduct.product" />
        <Reviews :productId="productStore.stateProduct.product.documentId" />
        <RelatedProducts :categoryId="productStore.stateProduct.product.category.id"
            :excludeId="productStore.stateProduct.product.documentId" />

    </template>
</template>


<style scoped lang="scss"></style>