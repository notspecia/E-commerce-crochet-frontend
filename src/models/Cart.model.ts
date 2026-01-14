import type ProductSelected from "./ProductSelected.model";

export default interface Cart {
    id: number,
    documentId: string,
    items: ProductSelected[], // lista di prodotti selezionati nel carrello
}