import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import { useProductsStore } from './products';
import { useUserStore } from './user';
import { useCartStore } from './cart';
import { CreateStripeSession, fetchUserOrders } from '../apis/Order.api';
import type Order from '../models/Order.model';


export const useOrdersStore = defineStore('orders', () => {

    /* IMPORTS PINIA AND REACTIVE PRODUCTS */
    const productsStore = useProductsStore();
    const { stateProducts } = productsStore; // ora stateProducts è reattivo e puoi usarlo nei computed

    /* IMPORTS PINIA USER */
    const userStore = useUserStore();
    const cartStore = useCartStore();


    /* --------------------------- STATE --------------------------- */
    // state reactive of the object whit array of orders + bool loading and string error
    const stateOrders = reactive({
        orders: [] as Order[],
        isLoading: false as boolean,
        error: null as null | string
    });

    /* -- COMPUTED -- */
    // computed per trasformare i prodotti selezionati in un array di prodotti completi da renderizzare nel cart COMPONENTE + con quantità 
    // const orderImages = computed(() => {
    //     return stateOrders.orders
    //         .map((order) => {
    //             const product = stateProducts.products.find(
    //                 (p) => p.documentId === order
    //             );
    //             return product ? { ...product, quantity: cartItem.quantity } : null;
    //         })
    //         .filter(Boolean) as ProductCart[];
    // });


    /* ---------------------------- ACTIONS ---------------------------- */
    // funzione per fetchare l array dei orders[] con tutti gli ordini dell'user loggato 
    const fetchOrders = async (): Promise<void> => {
        try {
            const userId = userStore.stateUser.user?.id // setting dell'userId da usare per check del carrello e creazione
            stateOrders.isLoading = true; // Imposta isLoading a true prima di iniziare il recupero
            const response = await fetchUserOrders(userStore.stateUser.bearerToken);
            stateOrders.orders = response; // assegna gli ordini DATA recuperati alla ref 
        } catch (error) {
            stateOrders.error = `${error}`;
        } finally {
            stateOrders.isLoading = false;
        };
    }


    // stripe checkout session creation action
    const createStripeCheckoutSession = async (): Promise<void> => {
        try {
            const userId = userStore.stateUser.user?.id;
            const token = userStore.stateUser.bearerToken;

            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

            if (!stripe || !userId) {
                throw new Error('Stripe non inizializzato o utente non valido');
            }

            // chiamata API modulare
            const sessionId = await CreateStripeSession(
                cartStore.productsSelected,
                token
            );

            await stripe.redirectToCheckout({ sessionId });
        } catch (error: any) {
            stateOrders.error = error.message || String(error);
        }
    };


    // SOSPESA - funzione per fetchare un singolo order by documentId 
    // const fetchOrder = async (documentId: string): Promise<void> => {
    //     try {
    //         stateOrders.isLoading = true;
    //         stateOrders.order = null;

    //         const response = await fetchUserOrder(
    //             `${API_BASE_URL}/api/orders/${documentId}`,
    //             userStore.stateUser.bearerToken
    //         );

    //         stateOrders.order = response;
    //     } catch (err: any) {
    //         stateOrders.error = err.message;
    //     } finally {
    //         stateOrders.isLoading = false;
    //     }
    // };


    return {
        stateOrders,
        createStripeCheckoutSession,
        fetchOrders,
        // fetchOrder
    };
});