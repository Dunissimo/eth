import { useStoreApi } from "@/hooks/useStoreApi";
import type { JsonRpcSigner } from "ethers";
import { BrowserProvider } from "ethers";
import { createContext, type PropsWithChildren, useState, type Dispatch, type SetStateAction } from "react";

interface AuthContextType {
    signer: JsonRpcSigner | null;
    address: string | null;
    isLoading: boolean;
    isOwner: boolean;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthContextProvider({ children }: PropsWithChildren) {
    
    const [signer, setSigner] = useState<JsonRpcSigner | null>(JSON.parse(localStorage.getItem('signer')!));
    const api = useStoreApi({ signer });

    const [address, setAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const connectWallet = async () => {
        try {
            setIsLoading(true);

            if (!window.ethereum) {
                setIsLoading(false);
                return alert("Отсутствует Metamask!");
            }

            const provider = new BrowserProvider(window.ethereum);
            const _signer = await provider.getSigner();
            const _address = await _signer.getAddress();
            const _ownerAddress = await api?.getOwner();

            setSigner(_signer);
            setAddress(_address);
            setIsOwner(Boolean(_ownerAddress));

            localStorage.setItem('auth', 'true');
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        
            disconnectWallet();
        } finally {
            setIsLoading(false);
        }
    }

    const disconnectWallet = () => {
        setSigner(null);
        setAddress(null);
        localStorage.removeItem('walletConnected');
    }

    return (
        <AuthContext.Provider value={{signer, address, isLoading, isOwner, setIsLoading, connectWallet, disconnectWallet}}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;