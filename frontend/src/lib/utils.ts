import { clsx, type ClassValue } from "clsx"
import { ethers, type BigNumberish } from "ethers";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function checkOwn(id: BigNumberish, ownProducts: BigNumberish[]) {
    let isMatch = false;

    ownProducts.forEach((productId) => {
        if (ethers.toNumber(productId) === ethers.toNumber(id)) {
            isMatch = true;
        }
    });
  
    return isMatch;
}
