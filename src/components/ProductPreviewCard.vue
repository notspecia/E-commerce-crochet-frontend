<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { API_BASE_URL } from '@/utils/costants';
import type Product from '@/models/Product.model';


/* PROPS TS */
const props = defineProps<{
    product: Product;
}>();

/* USEROUTER */
const router = useRouter();

/* CART e USER e TOAST PINIA STATE */
const cartStore = useCartStore();

/* FUNCTION */
// used on image and title click to go to product details page
const goProductDetails = () => {
    router.push(`/products/${props.product.slug}`);
}
// funzione handle per aggiungere il prodotto al carrello tramite il metodo addProduct del cartStore di pinia
const handleAddToCart = async () => {
    await cartStore.addToCart(props.product);
}
</script>


<template>
    <div class="product-item col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="d-flex justify-content-center">
            <img :src="`${API_BASE_URL}${props.product.images[0].url}`"
                :alt="`${props.product.images[0].alternativeText}`" @click="goProductDetails" />
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3">
            <p class="product-title mb-0" @click="goProductDetails">{{ props.product.title }}</p>
            <img src="@/assets/images/add-cart-dark.png" alt="aggiungi al carrello" class="cart-add"
                @click="handleAddToCart"></img>
        </div>
        <p class="product-price">{{ props.product.price.toFixed(2) }}€</p>
    </div>
</template>


<style scoped lang="scss">
.product-item {
    img {
        width: 100%;
        height: 270px;
        object-fit: cover;
        object-position: center;
        border-radius: 5px;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;

        @media (max-width: $breakpoint-md) {
            width: 90%;
        }
    }

    &:hover img {
        transform: scale(1.01);
    }

    .product-title {
        font-size: 1.6rem;
        font-family: $font-family-hand;
        cursor: pointer;

        @media (max-width: $breakpoint-sm) {
            font-size: 1.8rem;
        }
    }

    .product-price {
        font-size: 1.1rem;
        font-family: $font-family-base;

        @media (max-width: $breakpoint-sm) {
            font-size: 1.3rem;
        }
    }

    img.cart-add {
        width: 35px;
        height: 35px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            transform: scale(1.05);
        }
    }

}
</style>