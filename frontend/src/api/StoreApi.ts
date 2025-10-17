import { ethers, type Signer } from "ethers";
import type { Store } from "./contracts/Store";
import { Store__factory } from "./contracts/Store__factory";
import type { Products, getOneProductResponse, getProductsResponse } from "../types/store-types";
import type { BigNumberish } from "ethers";

export class StoreApi {
    public contract: Store;
    public address: string;

    constructor(contractAddress: string, signer: Signer) {
        this.address = contractAddress;
        this.contract = Store__factory.connect(contractAddress, signer);
    }

    async getOwner(): Promise<string> {
        return this.contract.owner();
    }

    async getUserProducts(): Promise<getProductsResponse> {
        return this.contract.getProducts();
    }

    async getAllUserProducts(): Promise<Products> {
        const products: Products = new Map();
        const productIds = await this.getUserProducts();

        for (const id of productIds) {
            const product = await this.contract.getOneProduct(id);

            products.set(ethers.toNumber(id), {name: product.name, price: product.price});
        }

        return products;
    }

    async getAllProducts(): Promise<Products> {
        const products: Products = new Map();
        const productIds = await this.contract.getAllProductsIds();

        for (const id of productIds) {
            const product = await this.contract.getOneProduct(id);

            products.set(ethers.toNumber(id), {name: product.name, price: product.price});
        }

        return products;
    }

    async getOneProduct(id: bigint): Promise<getOneProductResponse> {
        return this.contract.getOneProduct(id);
    }

    async buyProduct(id: BigNumberish) {
        return this.contract.buyProduct(id);
    }

    async createProduct(id: bigint, name: string, price: bigint) {
        return this.contract.createProduct(id, name, price);
    }
}