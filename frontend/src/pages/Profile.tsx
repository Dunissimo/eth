import { ERC20Api } from "@/api/ERC20Api";
import Container from "@/components/Container";
import { useAuthContext } from "@/hooks/useAuthContext";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ERC20Address } from '../conf.json';
import Product from "@/components/Product";
import { useStoreApi } from "@/hooks/useStoreApi";
import type { Products } from "@/types/store-types";
import { checkOwn } from "@/lib/utils";

function Profile() {
    const { signer, isLoading, setIsLoading } = useAuthContext();
    const storeApi = useStoreApi({ signer });

    const [totalSupply, setTotalSupply] = useState(0);
    const [tokenName, setTokenName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [amount, setAmount] = useState(0);
    const [address, setAddress] = useState("");
    const [ownerAddress, setOwnerAddress] = useState("");

    const [ownProducts, setOwnProducts] = useState<Products>(new Map());

    const getData = async (api: ERC20Api) => {
        if (!signer) return;

        try {
            setIsLoading(true);

            const name = await api.getName();
            setTokenName(name);

            const _totalSupply = await api.getTotalSupply();
            setTotalSupply(ethers.toNumber(_totalSupply));

            const balance = await api.balanceOf(await signer.getAddress());
            setAmount(ethers.toNumber(balance));
            
            const address = await signer.getAddress();
            setAddress(address);
            
            const ownerAddress = await api.getOwner();
            setOwnerAddress(ownerAddress);

            const symbol = await api.getSymbol();
            setSymbol(symbol);

            if (!storeApi) return;

            const _ownProducts = await storeApi.getAllUserProducts();
            setOwnProducts(_ownProducts);
        } catch (error) {
            console.error(`Error in getData func: ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!signer) return;

        const erc20 = new ERC20Api(ERC20Address, signer);
        
        getData(erc20);
    }, [signer]);

    if (isLoading) {
        return <Container className="pt-8">Loading...</Container>
    }

    if (!signer) {
        return <Container className="pt-8">Error while loading user data</Container>
    }

    return (
        <Container className="pt-8">
            <div>
                <h2>Владелец сети: {ownerAddress}</h2>
                <h2>Ваш адрес: {address}</h2>
                <h2>Токен: {tokenName}</h2>
                <h3>Символ: {symbol}</h3>
                <h3>Всего токенов: {totalSupply}</h3>
            </div>
        
            <span>Ваш баланс: {amount}</span>

            <div>
                <h2 className="mb-8 text-5xl font-bold">Products List</h2>

                <div className="products-list flex gap-6">
                    {Array.from(ownProducts.entries()).map(item => {
                        const id = item[0];
                        const key = ethers.toNumber(item[0]);

                        return <Product className="" isOwn={true} key={key} id={id} product={item[1]} />
                    })}
                </div>
            </div>
        </Container>
    )
}

export default Profile;
