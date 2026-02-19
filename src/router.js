import { createRouter, createWebHistory } from 'vue-router'

// import pages routes of the application
import Home from '@/views/Home.vue';
import Products from '@/views/Products.vue';
import DetailProduct from '@/views/DetailProduct.vue';
import Orders from '@/views/Orders.vue';
// import DetailOrder from '@/views/DetailOrder/DetailOrder.vue';
// import Checkout from '@/views/Checkout/Checkout.vue';
import Faq from '@/views/FAQ.vue';
import Contacts from '@/views/Contacts.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy.vue';
import SuccessPayment from '@/views/SuccessPayment.vue';


// define the single routes for the application and export them in a array
export const HOME = {
    path: '/',
    name: 'home',
    component: Home
};

export const PRODUCTS = {
    path: '/products',
    name: 'products',
    component: Products
};

export const PRODUCT_DETAIL = {
    path: '/products/:documentId',
    name: 'product-detail',
    component: DetailProduct,
};

export const ORDERS = {
    path: '/orders',
    name: 'orders',
    component: Orders
};

// export const ORDER_DETAIL = {
//     path: '/orders/:documentId',
//     name: 'OrderDetail',
//     component: DetailOrder
// };

export const SUCCESS_PAYMENT = {
    path: '/success-payment',
    name: 'success-payment',
    component: SuccessPayment
};

export const FAQ = {
    path: '/FAQ',
    name: 'FAQ',
    component: Faq
};

export const CONTACTS = {
    path: '/contacts',
    name: 'contacts',
    component: Contacts
};

export const LOGIN = {
    path: '/login',
    name: 'login',
    component: Login
};

export const REGISTER = {
    path: '/register',
    name: 'register',
    component: Register
};

export const PRIVACY_POLICY = {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicy
};

const routes = [
    HOME,
    PRODUCTS,
    PRODUCT_DETAIL,
    ORDERS,
    // ORDER_DETAIL,
    SUCCESS_PAYMENT,
    FAQ,
    CONTACTS,
    LOGIN,
    REGISTER,
    PRIVACY_POLICY
]

// export the router instance with the defined routes and history mode into the main.ts to use it in the application
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;