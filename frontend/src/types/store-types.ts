export interface Product {
    name: string;
    price: bigint;
}

export type Products = Map<number, Product>;
export type getProductsResponse = bigint[];
export type getAllProductsIdsResponse = bigint[];
export type getOneProductResponse = Product;