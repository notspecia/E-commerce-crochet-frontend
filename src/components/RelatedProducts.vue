<script setup lang="ts">
import { useRelatedProductsStore } from '@/stores/relatedProducts';
import ProductPreviewCard from '@/components/ProductPreviewCard.vue';

/* STORE PINIA related product */
const relatedProductsStrore = useRelatedProductsStore();
</script>


<template>
    <section>
        <h3 class="header title-line mb-5">Potrebbero piacerti</h3>
        <p v-if="relatedProductsStrore.relatedProducts.length === 0" class="text-muted">
            Nessun prodotto simile trovato
        </p>
        <!-- cycling related products usaing cards preview of products -->
        <div v-else class="row g-5">
            <ProductPreviewCard v-for="product in relatedProductsStrore.relatedProducts" :key="product.id"
                :product="product" are-related />
        </div>
    </section>
</template>
