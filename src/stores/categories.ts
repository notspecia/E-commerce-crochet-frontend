import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { API_BASE_URL } from '@/utils/costants';
import type Category from '@/models/Category.model';


export const useCategoriesStore = defineStore('categories', () => {

    /* --------------STATE---------------- */
    // state reactive of the object whit array of products + bool loading and string error
    const stateCategories = reactive({
        categories: [] as Category[],
        isLoading: false as boolean,
        error: null as null | string
    });


    /* ------------ACTIONS------------- */
    // funzione per fetchare l array dei categories[] con tutte le categorie
    const fetchCategories = async (): Promise<void> => {
        try {
            stateCategories.isLoading = true; // Imposta isLoading a true prima di iniziare il recupero
            const response = await GetCategories(`${API_BASE_URL}/api/categories`);
            stateCategories.categories = response; // assegna i prodotti DATA recuperati alla ref 
        } catch (error) {
            stateCategories.error = `${error}`;
        } finally {
            stateCategories.isLoading = false;
        };
    }

    return {
        stateCategories,
        fetchCategories
    };
});