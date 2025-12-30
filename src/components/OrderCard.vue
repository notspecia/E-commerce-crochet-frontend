<script setup lang="ts">
import type Order from "@/models/Order.model";

const props = defineProps<{
    order: Order;
}>();
</script>


<template>
    <!-- col-lg6 -->
    <div class="col-12 g-5">
        <div class="order-item">
            <!-- header (data info shipping)-->
            <div class="d-flex justify-content-between align-items-start w-100">
                <div>
                    <p class="order-id">Order #{{ order.stripeId.slice(0, 20) }}</p> <!-- id order stripe ridotto -->
                    <p class="order-status">
                        <i class="bi bi-truck me-1 fs-5"></i> Shipped
                    </p>
                </div>
                <p class="order-date">
                    {{ new Date(order.createdAt).toLocaleDateString("en-US") }}
                </p>
            </div>
            <!-- product list of the order -->
            <div class="py-4">
                <div v-for="p in order.products" :key="p.documentId" class="product-row">
                    <div class="d-flex justify-content-between">
                        <span>{{ p.productName }}</span>
                        <span>x{{ p.quantity }}</span>
                    </div>
                    <hr class="my-2">
                </div>
            </div>
            <!-- adress and total of shipping -->
            <div class="d-flex justify-content-between align-items-center w-100">
                <p class="address-block">
                    <i class="bi bi-geo-alt"></i>
                    {{ order.shipping_address.postal_code }}
                    {{ order.shipping_address.city }},
                    {{ order.shipping_address.line1 }}
                </p>
                <div>
                    <span>Totale: </span>
                    <span class="total-value fs-5">{{ (order.amount_total_cents / 100).toFixed(2) }} €</span>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.order-item {
    width: 80%;
    background: $color-white;
    color: $color-gray-600;
    font-family: $font-family-base;
    font-weight: lighter;
    padding: 20px;
    border-radius: 2px;
    margin: 0 auto;
    box-shadow: 11px 12px 10px rgba(0, 0, 0, 0.2);

    .order-id {
        color: $color-primary-400;
        font-size: 1rem;
        margin-bottom: 7px;
    }

    .order-status {
        font-size: 1.1rem;
        margin: 0;
    }

    .product-row,
    .total-value {
        color: $color-gray-800;
        font-weight: $font-weight-bold;
    }

    // indirizzo spedizione e dati con media query diminuzione spazio
    .address-block {
        font-size: 0.9rem;
        margin: 0;

        @media (max-width: $breakpoint-md) {
            width: 50%
        }
    }



    // media query change layout on smaller screens
    @media (max-width: $breakpoint-md) {
        width: 100%;
    }
}
</style>
