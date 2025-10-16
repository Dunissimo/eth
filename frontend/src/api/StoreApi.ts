import type { Signer } from "ethers";
import type { Store } from "./contracts/Store";
import { Store__factory } from "./contracts/Store__factory";
import type { getAllProductsIdsResponse, getOneProductResponse, getProductsResponse } from "../types/store-types";

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

    async getAllProducts(): Promise<getAllProductsIdsResponse> {
        return this.contract.getAllProductsIds();
    }

    async getOneProduct(id: bigint): Promise<getOneProductResponse> {
        return this.contract.getOneProduct(id);
    }

    async buyProduct(id: bigint) {
        return this.contract.buyProduct(id);
    }

    async createProduct(id: bigint, name: string, price: bigint) {
        return this.contract.createProduct(id, name, price);
    }
}