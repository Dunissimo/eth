import Container from "./Container";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { NavLink } from 'react-router'
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";

function Header() {
    const { signer, isLoading, setIsLoading, connectWallet } = useAuthContext();

    const auth = async () => {
        setIsLoading(true);

        connectWallet();
    }

    useEffect(() => {
        if (localStorage.getItem('auth') === 'true' && !signer) {
            connectWallet();
        }
    }, [connectWallet, signer]);

    const renderButtonText = () => {
        let text = "Sign in";

        // if (isLoading) text = "Loading...";

        if (signer) text = "Profile";

        return text;
    }

    return (
        <header className="header py-5 bg-black text-white">
            <Container className="flex justify-between">
                <NavigationMenu>
                    <NavigationMenuList className="gap-2">
                        <NavigationMenuItem className="text-black">
                            <NavigationMenuLink asChild className="bg-white">
                                <NavLink to={'/'}>Home</NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        
                        <NavigationMenuItem className="text-black">
                            <NavigationMenuLink asChild className="bg-white">
                                <NavLink to={'/products'}>Products</NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <Button onClick={auth} className={cn(signer && "p-0")} disabled={isLoading}>
                    {signer ? <NavLink className="px-4 py-2" to={'/profile'}>{renderButtonText()}</NavLink> : renderButtonText()}
                </Button>   
            </Container>
        </header>
    )
}

export default Header;
