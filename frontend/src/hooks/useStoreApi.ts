import { StoreApi } from "@/api/StoreApi";
import { useEffect, useState } from "react";
import { StoreAddress } from '../conf.json';
import type { JsonRpcSigner } from "ethers";

interface HookProps {
    signer: JsonRpcSigner | null;
}

export const useStoreApi = ({ signer }: HookProps) => {
    const [api, setApi] = useState<StoreApi | null>(null);

    useEffect(() => {
        if (!signer) return;

        const storeApi = new StoreApi(StoreAddress, signer);

        setApi(storeApi);
    }, [signer]);

    return api;
};