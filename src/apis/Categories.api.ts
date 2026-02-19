import type Category from "@/models/Category.model";



export const GetCategories = async (path: string): Promise<Category[]> => {

    const response = await fetch(path, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error("Errore nel recupero delle categorie, riprova più tardi :(");
    }

    // restituisce i dati in formato risposta JSON dalla chiamata HTTP GET
    const jsonResponse = await response.json(); // JSON FORMATO DA : data + meta
    return jsonResponse.data;
};