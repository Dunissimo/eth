import type { BigNumberish } from "ethers";

export interface Product {
    name: string;
    price: BigNumberish;
}

export type Products = Map<number, Product>;
export type getProductsResponse = BigNumberish[];
export type getAllProductsIdsResponse = BigNumberish[];
export type getOneProductResponse = Product;