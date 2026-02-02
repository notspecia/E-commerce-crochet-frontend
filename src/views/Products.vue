<script setup lang="ts">
import { computed, ref } from 'vue';
import { useProductsStore } from '@/stores/products';
import { categories } from '@/utils/costants';
import { goTopPage } from '@/utils/utils';
import ProductPreviewCard from '@/components/ProductPreviewCard.vue';
import Loader from '@/components/Loader.vue';
import type Product from '@/models/Product.model';


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
    <div v-else class="row gap-0 gap-lg-4">
        <!-- FILTRI -->
        <div class="filters col-12 col-lg-2 order-1 order-lg-2 mb-5">
            <div>
                <p class="fs-4">Categorie</p>
                <hr>
                <p v-for="(category, index) in categories" @click="setCategory(category)"
                    :class="selectedCategory === category ? 'text-decoration-underline fw-bold' : ''">
                    {{ category }}
                </p>
            </div>
            <div>
                <p class="fs-4">Cerca Prodotto<i class="ms-1 bi bi-search"></i></p>
                <input v-model="searchKeyWord" type="text" class="form-control mb-3" placeholder="scrivi qui..." />
            </div>
        </div>
        <!-- PRODOTTI CARDS PREVIEW -->
        <div class="col-12 col-lg-10 order-2 order-lg-1 row row-gap-5">
            <ProductPreviewCard v-for="product in productsFiltered" :key="product.id" :product="product" />
        </div>
    </div>
</template>



<style scoped lang="scss">
.form-control {
    background: none;
    border: none;
    color: $color-black;
    padding: 7px;
    border-bottom: 2px solid $color-gray-900;

    &::placeholder {
        color: $color-gray-900;
    }

    &:focus {
        background: none;
        border: 0;
        border-bottom: 3px solid $color-gray-900;
        box-shadow: none;
    }
}


// .form-control {
//     background-color: $color-gray-200;
//     color: $color-black;
//     font-family: $font-family-base;
//     padding: 10px;

//     &::placeholder {
//         color: $color-gray-600;
//     }

//     &:focus {
//         color: $color-black;
//         background-color: $color-white;
//         border: 1px solid $color-primary-200;
//         box-shadow: 0 0 0 0.15rem rgba($color-primary, 0.75);
//     }
// }

.filters {
    display: flex;
    flex-direction: column;
    gap: 25px;
    cursor: pointer;
}
</style>