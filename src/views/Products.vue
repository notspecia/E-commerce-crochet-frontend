<script setup lang="ts">
import { computed, ref } from 'vue';
import { useProductsStore } from '@/stores/products';
import { categories } from '@/utils/costants';
import { goTopPage } from '@/utils/utils';
import ProductPreviewCard from '@/components/ProductPreviewCard.vue';
import Loader from '@/components/Loader.vue';
import type Product from '@/models/Product.model';
import Filters from '@/components/Filters.vue';


/* PRODUCTS PINIA STATE */
const productsStore = useProductsStore();

/* REF */
const selectedCategory = ref<string>("");
const searchKeyWord = ref<string>("");

/* COMPUTED */
// filtra i prodotti di base fetchati e applica i filtri in sequenza
const productsFiltered = computed<Product[]>(() => {
    // shallow copy of products collection api
    let filtered = productsStore.stateProducts.products;

    // 1 check -> filtraggio x categoria
    if (selectedCategory.value) {
        filtered = filtered.filter(
            product => product.category.title === selectedCategory.value
        );
    }

    // 2 check -> filtraggio x keyword santificata
    if (searchKeyWord.value.trim()) {
        const keyWord = searchKeyWord.value.toLowerCase().trim(); // puliamo santificazione della keywod research
        filtered = filtered.filter(
            product => product.title.toLowerCase().includes(keyWord)
        );
    }

    return filtered;
});

/* FUNCTIONS */
const setCategory = (category: string): void => {
    selectedCategory.value = category;
    goTopPage();
}

const resetFilters = (): void => {
    selectedCategory.value = "";
    searchKeyWord.value = "";
}
</script>



<template>
    <h2 class="header mb-3">{{ $t('products.title') }}</h2>
    <p class="mb-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, beatae dicta repudiandae quis natus
        amet itaque
        provident. Ut atque eveniet facere magni natus ipsam consequatur quia expedita, asperiores molestiae
        exercitationem.
    </p>
    <!-- 
    container di card con i vari prodotti presi tramit GET (con la linuga correttamente selezionata ?lang=it/en)
    ciclando i dati tramite la direttiva v-for in un componente con CardProduct.vue
    -->
    <Loader v-if="productsStore.stateProducts.isLoading" />
    <p v-else-if="productsStore.stateProducts.error" class="text-danger">{{ productsStore.stateProducts.error }}</p>
    <div v-else class="row gap-0 gap-lg-4 justify-content-center">
        <Filters :selected-category="selectedCategory" v-model:searchKeyWord="searchKeyWord" @set-category="setCategory"
            @reset-filters="resetFilters" />
        <!-- PRODOTTI CARDS PREVIEW || no prodotti trovati -->
        <div class="col-12 col-lg-10 order-2 order-lg-1 row row-gap-5">
            <ProductPreviewCard v-if="productsFiltered.length > 0" v-for="product in productsFiltered" :key="product.id"
                :product="product" />
            <div v-else class="text-center mt-5">
                <p class="fs-3">Nessun prodotto trovato!</p>
                <button class="btn btn-danger" @click="resetFilters">Rimuovi filtri</button>
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss"></style>