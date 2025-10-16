import { ERC20Api } from "@/api/ERC20Api";
import Container from "@/components/Container";
import { useAuthContext } from "@/hooks/useAuthContext";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ERC20Address } from '../conf.json';

function Profile() {
    const { signer, isLoading, setIsLoading } = useAuthContext();

    const [totalSupply, setTotalSupply] = useState(0);
    const [tokenName, setTokenName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [amount, setAmount] = useState(0);

    const getData = async (api: ERC20Api) => {
        if (!signer) return;

        try {
            const name = await api.getName();
            setTokenName(name);

            const _totalSupply = await api.getTotalSupply();
            setTotalSupply(ethers.toNumber(_totalSupply));

            const balance = await api.balanceOf(await signer.getAddress());
            setAmount(ethers.toNumber(balance));

            const symbol = await api.getSymbol();
            setSymbol(symbol);
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
                <h2>Токен: {tokenName}</h2>
                <h3>Символ: {symbol}</h3>
                <h3>Всего токенов: {totalSupply}</h3>
            </div>
        
            <span>Ваш баланс: {amount}</span>
        </Container>
    )
}

export default Profile;
