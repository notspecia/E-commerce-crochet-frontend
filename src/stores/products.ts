import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { API_BASE_URL } from '@/utils/costants';
import { GetProducts } from '@/apis/Products.api';
import type Product from '@/models/Product.model';


export const useProductsStore = defineStore('products', () => {

  /* --------------STATE---------------- */
  // state reactive of the object whit array of products + bool loading and string error
  const stateProducts = reactive({
    products: [] as Product[],
    isLoading: false as boolean,
    error: null as null | string
  });


  /* ------------ACTIONS------------- */
  // funzione per fetchare l array dei products[] con tutti i prodotti 
  const fetchProducts = async (): Promise<void> => {
    try {
      stateProducts.isLoading = true; // Imposta isLoading a true prima di iniziare il recupero
      const response = await GetProducts(`${API_BASE_URL}/api/products`);
      stateProducts.products = response; // assegna i prodotti DATA recuperati alla ref 
    } catch (error) {
      stateProducts.error = `${error}`;
    } finally {
      stateProducts.isLoading = false;
    };
  }

  return {
    stateProducts,
    fetchProducts
  };
});