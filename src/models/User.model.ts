import type { Order } from "@stripe/stripe-js";
import type Cart from "./Cart.model";


export default interface User {
    id: number,
    username: string,
    email: string,
    blocked: boolean,
    confirmed: boolean,
    provider: string,
    createdAt: string,
    orders: Order[],
    cart: Cart
}