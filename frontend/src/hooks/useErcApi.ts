import { useEffect, useState } from "react";
import { ERC20Address } from '../conf.json';
import type { JsonRpcSigner } from "ethers";
import { ERC20Api } from "@/api/ERC20Api";

interface HookProps {
    signer: JsonRpcSigner | null;
}

export const useErcApi = ({ signer }: HookProps) => {
    const [api, setApi] = useState<ERC20Api | null>(null);

    useEffect(() => {
        if (!signer) return;

        const ercApi = new ERC20Api(ERC20Address, signer);

        setApi(ercApi);
    }, [signer]);

    return api;
};