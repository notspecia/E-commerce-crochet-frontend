<script setup lang="ts">
import { platforms } from '@/utils/costants';
import FormContactsMessage from '@/components/FormContactsMessage.vue';
</script>


<template>
    <section class="pt-4">
        <h2 class="header text-center">
            Per richiedere <span>prodotti personalizzati</span> & <span>informazioni:</span>
        </h2>
        <!-- for of constant socials link and icon url -->
        <div class="social-row row g-5" role="navigation" aria-label="link social">
            <a v-for="p in platforms" :key="p.id" :href="p.url" class="social-link col-6 col-sm-3 text-center"
                :aria-label="p.name" target="_blank" rel="noopener noreferrer">
                <i :class="['bi', p.icon]" aria-hidden="true"></i>
            </a>
        </div>
        <!-- form for sending fast message directly -->
        <FormContactsMessage />
    </section>
</template>


<style scoped lang="scss">
h2.header {
    font-size: 2.5rem;

    span {
        color: $color-primary-600;
        text-decoration: underline;
    }
}


.social-row {
    margin: 4vh 0 20vh;

    // icons style
    .social-link {
        font-size: 3rem;
        color: $color-gray-900;

        &:hover {
            color: $color-gray-800;
            animation: shake 0.4s ease-in-out;
        }
    }

    // layout mobile: in colonna
    @media (max-width: $breakpoint-md) {
        margin-top: 3rem;
    }
}
</style>
