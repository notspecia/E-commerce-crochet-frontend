<script setup lang="ts">
import { useRouter } from 'vue-router';
import { API_BASE_URL } from '@/utils/costants';
import { useCartStore } from '@/stores/cart';
import { useProductsStore } from '@/stores/products';
import Loader from '@/components/Loader.vue';
import CheckoutButton from '@/components/CheckoutButton.vue';


/* USEROUTER */
const router = useRouter();

/* CART and PRODUCTS PINIA STATE */
const cartStore = useCartStore();
const productsStore = useProductsStore();

/* FUNCTIONS */
// on click image on cart go to the detail of the product
const goDetailProduct = (documentId: string): void => {
    cartStore.toggleCart();
    router.push(`/products/${documentId}`);
}
</script>



<template>
    <aside class="cart-menu">
        <!-- title cart + close icon (presente sempre anche con error/loading)-->
        <div class="d-flex justify-content-between align-items-center mb-2">
            <h2>Your Cart</h2>
            <i class="bi bi-x-lg fs-2 text-end" @click="cartStore.toggleCart" />
        </div>

        <!-- loader -->
        <Loader v-if="productsStore.stateProducts.isLoading" />

        <!-- errore generico in caso errore dei prodotti da gestire per ogni lang -->
        <p v-else-if="productsStore.stateProducts.error" class="text-danger">
            {{ productsStore.stateProducts.error }}
        </p>

        <!-- empty cart, bottone con il tasto vai ai prodotti! -->
        <div v-else-if="!cartStore.productsCart.length" class="text-center py-5">
            <p class="fs-5 mb-4">Il tuo carrello è vuoto</p>
            <button class="btn btn-one text-white"
                @click="() => { router.push(`/products`); cartStore.cartIsOpen = false }">
                Visualizza i prodotti
            </button>
        </div>

        <!-- products in cart -->
        <template v-else>
            <div class="cart-products-list">
                <!-- column header -->
                <div class="d-flex justify-content-between align-items-end border-bottom">
                    <p>PRODUCT</p>
                    <p>PRICE</p>
                </div>
                <div v-for="product in cartStore.productsCart" :key="product.id" class="cart-product mb-5">
                    <!-- immagine di copertina principale -->
                    <img :src="`${API_BASE_URL}${product.images[0].url}`" :alt="`${product.images[0].alternativeText}`"
                        class="cart-product-img me-3" @click="goDetailProduct(product.documentId)" />
                    <!--info -->
                    <div class="flex-grow-1">
                        <p class="mb-1 title-block">{{ product.title }}</p>
                        <p class="mb-3 price-block">{{ product.price.toFixed(2) }} €</p>
                        <!-- quantità -->
                        <div class="d-flex align-items-center gap-2">
                            <button class="btn btn-sm quantity-button" :class="product.quantity <= 1 ? 'disabled' : ''"
                                @click="cartStore.updateCartItemQuantity(product.documentId, product.quantity - 1)"
                                :disabled="product.quantity <= 1">-</button>
                            <span>{{ product.quantity }}</span>
                            <button class="btn btn-sm quantity-button"
                                @click="cartStore.updateCartItemQuantity(product.documentId, product.quantity + 1)">+</button>
                        </div>
                    </div>
                    <!-- column flex total + remove product button -->
                    <div class="d-flex flex-column align-items-end">
                        <p class="mb-1 price-block">{{ (product.price * product.quantity).toFixed(2) }}€</p>
                        <i class="bi bi-trash trash text-danger"
                            @click="cartStore.removeFromCart(product.documentId)"></i>
                    </div>
                </div>
            </div>
            <!-- checkout summary container -->
            <div class="cart-summary border-top pt-4">
                <div class="d-flex justify-content-between align-items-center fs-4 mb-3">
                    <span class="total-label">Estimated total:</span>
                    <span class="price-block">{{ cartStore.cartTotal }}€</span>
                </div>
                <CheckoutButton />
            </div>
        </template>
    </aside>
</template>



<style scoped lang="scss">
.cart-menu {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    width: 40%;
    height: 100%;
    background: $bg-sidebar;
    color: $color-gray-900;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px 10px 20px 20px;
    z-index: 3;

    h2 {
        font-family: $font-family-hand;
    }

    // 65% width per brk <= 768 (tablet)
    @media (max-width: $breakpoint-lg) {
        width: 70%;
    }

    // 85% width per brk <= 576 (mobile)
    @media (max-width: $breakpoint-sm) {
        width: 90%;
    }


    /* lista prodotti nel carrello scrollabile */
    .cart-products-list {
        flex: 1;
        overflow-y: auto;
        padding-right: 15px;

        /* ogni riga prodotto */
        .cart-product {
            display: flex;
            align-items: center;
            margin: 30px 0;

            /* thumbnail immagine prodotto */
            .cart-product-img {
                width: 130px;
                height: 150px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;

                @media (max-width: $breakpoint-sm) {
                    width: 110px;
                    height: 130px;
                }
            }

            .title-block {
                font-size: 1.3rem;
                // font-weight: $font-weight-bold;
            }

            // info block del prodotto (titolo prezzo)
            .price-block {
                font-size: 1.15rem;
                font-family: $font-family-base;
            }

            // bottone per modificare quantità di esso con fetch 
            .quantity-button {
                color: $color-black;
                border: 1px solid $color-primary-600;

                &:hover {
                    background-color: $color-primary;
                }

                &:disabled {
                    opacity: 0.15;
                }
            }

            .total-label {
                font-weight: $font-weight-bold;
            }

            i.trash {
                font-size: 1.4rem;
                cursor: pointer;

                &:hover {
                    transform: scale(1.05);
                }
            }
        }
    }
}
</style>