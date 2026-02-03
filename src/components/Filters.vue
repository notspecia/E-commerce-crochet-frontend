<script setup lang="ts">
import { categories } from '@/utils/costants';


/* PROPS */
const props = defineProps<{
    selectedCategory: string
    searchKeyWord: string
}>()


/* EMITS */
// per evitare errori con il v-model 
const emit = defineEmits<{
    (e: 'update:searchKeyWord', value: string): void
    (e: 'set-category', value: string): void
    (e: 'reset-filters'): void
}>()
</script>



<template>
    <!--FILTRI dentro accordion -->
    <div class="accordion col-12 col-lg-2 order-1 order-lg-2 mb-5" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingFilters" @click="emit('reset-filters')">
                <button class=" accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseFilters" aria-expanded="false" aria-controls="collapseFilters">
                    Filtri <i class="bi bi-filter-left"></i>
                </button>
            </h2>
            <div id="collapseFilters" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body px-0">
                    <div class="filters">
                        <div>
                            <p class="fs-6 fw-bold mb-2">Cerca Prodotto <i class="ms-1 bi bi-search"></i></p>
                            <input :value="searchKeyWord" @input="emit(
                                'update:searchKeyWord',
                                ($event.target as HTMLInputElement).value
                            )" type="text" class="form-control mb-3 fs-6" placeholder="scrivi qui..." />
                        </div>
                        <div>
                            <p class="fs-6 fw-bold mb-2"> Categorie </p>
                            <hr>
                            <p v-for="(category, index) in categories" :key="index"
                                @click="emit('set-category', category)"
                                :class="selectedCategory === category ? 'active-category' : ''"
                                class="filter-item fs-6">
                                {{ category }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
.accordion {

    @media (max-width: $breakpoint-lg) {
        width: 50%;
    }

    @media (max-width: $breakpoint-sm) {
        width: 75%;
    }

    /* reset totale stile accordion */
    .accordion-item,
    .accordion-body {
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
    }

    /* header base GESTIONE ACCORDION BUTTON CHIUSA || APERTA */
    .accordion-button {
        justify-content: space-between;
        box-shadow: none !important;
        font-size: 1.75rem;
        font-family: $font-family-hand;
        margin-bottom: 1.4rem;
        transition: all 0.2s ease;

        &.collapsed {
            background-color: rgba(245, 245, 245, 0.586);
            padding: 10px 20px;
            // border: 2px solid $color-gray-900;
            // border-bottom: none;
            border-radius: 6px;
        }

        &:not(.collapsed) {
            background-color: transparent !important;
            border: none;
            padding: 0;
        }

        &::after {
            display: none !important;
        }
    }

    /* container campi filtri */
    .filters {
        display: flex;
        flex-direction: column;
        gap: 27px;
        cursor: pointer;

        .active-category {
            font-weight: bold;
            text-decoration: underline;
        }

        // custom style form control
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
    }

}
</style>