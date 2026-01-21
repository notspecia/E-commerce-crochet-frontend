import { defineStore } from 'pinia';
import { computed } from 'vue';
import { shuffleArray } from '@/utils/utils';
import { useProductsStore } from './products';
import { useProductStore } from './product';
import type Product from '@/models/Product.model';


export const useRelatedProductsStore = defineStore('relatedProducts', () => {

    const { stateProducts } = useProductsStore(); // ora stateProducts è reattivo e puoi usarlo nei computed
    const { stateProduct } = useProductStore();


    /* --------------STATE---------------- */

    /* -- COMPUTED -- */
    const relatedProducts = computed<Product[]>(() => {
        console.log("calcolati nuovi related");

        if (!stateProduct.product || !stateProducts.products.length) return [];

        const currentProduct = stateProduct.product;
        const currentCategoryId = currentProduct.category?.documentId;

        if (!currentCategoryId) return [];

        // CLONE dell'array (fondamentale)
        const shuffled = shuffleArray([...stateProducts.products]);

        return shuffled
            .filter(p =>
                p.documentId !== currentProduct.documentId &&
                p.category?.documentId === currentCategoryId
            )
            .slice(0, 4);
    });


    return {
        relatedProducts
    };
});