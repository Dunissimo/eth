import type { Signer, BigNumberish } from "ethers";
import type { ERC20 } from "./contracts/ERC20";
import { ERC20__factory } from "./contracts/ERC20__factory";

export class ERC20Api {
    public contract: ERC20;
    public address: string;

    constructor(contractAddress: string, signer: Signer) {
        this.address = contractAddress;
        this.contract = ERC20__factory.connect(contractAddress, signer);
    }

    async getName(): Promise<string> {
        return this.contract.name();
    }

    async balanceOf(address: string): Promise<BigNumberish> {
        return this.contract.balanceOf(address);
    }

    async getOwner(): Promise<string> {
        return this.contract.owner();
    }

    async getSymbol(): Promise<string> {
        return this.contract.symbol();
    }

    async getTotalSupply(): Promise<BigNumberish> {
        return this.contract.totalSupply();
    }

    async mint(to: string, amount: BigNumberish) {
        return this.contract.mint(to, amount);
    }

    async burn(from: string, amount: BigNumberish) {
        return this.contract.burn(from, amount)
    }

    async approve(spender: string, amount: BigNumberish) {
        return this.contract.approve(spender, amount);
    }

    async transfer(to: string, amount: BigNumberish) {
        return this.contract.transfer(to, amount);
    }

    async transferFrom(spender: string, recepient: string, amount: BigNumberish) {
        return this.contract.transferFrom(spender, recepient, amount);
    }
}