import { useEffect, useState } from "react";
import { StoreApi } from "@/api/StoreApi";
import Container from "@/components/Container";
import { useAuthContext } from "@/hooks/useAuthContext";
import type { Products as ProductsType } from "@/types/store-types";
import Product from "@/components/Product";
import { ethers, type BigNumberish } from "ethers";
import { useStoreApi } from "@/hooks/useStoreApi";
import { useErcApi } from "@/hooks/useErcApi";
import { StoreAddress } from "@/conf.json"
import { checkOwn } from "@/lib/utils";

function Products() {
    const { signer, isLoading, setIsLoading } = useAuthContext();
    const storeApi = useStoreApi({ signer });
    const ercApi = useErcApi({ signer });

    const [products, setProducts] = useState<ProductsType>(new Map()); 
    const [ownProducts, setOwnProducts] = useState<BigNumberish[]>([]);

    const getProducts = async (storeApi: StoreApi) => {
        if (!signer) return;

        try {
            setIsLoading(true);
            
            const _products = await storeApi.getAllProducts();
            setProducts(_products);

            const _ownProducts = await storeApi.getUserProducts();
            setOwnProducts(Array.from(_ownProducts.values()));
        } catch (error) {
            console.error(`Error in getProducts func: ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    const buyProduct = async (id: BigNumberish, price: BigNumberish) => {
        if (!signer || !storeApi || !ercApi) return;

        try {
            setIsLoading(true);

            console.log(ercApi);
            
            const tx = await ercApi.approve(StoreAddress, price);
            await tx.wait();

            await storeApi.buyProduct(id);
        } catch (error) {
            console.error(`Error in buyProduct func: ${error}`);
            
            return alert("Не удалось совершить покупку!");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!storeApi) return;

        getProducts(storeApi);
    }, [storeApi]);

    return (
        <div className="products-page py-3.5 px-8">
            <Container>
                <div className="flex flex-col gap-3.5">
                    <h1 className="mb-8 text-5xl font-bold">Products List</h1>
                    
                    <div className="products-list flex gap-6">
                        {Array.from(products.entries()).map(item => {
                            const id = item[0];
                            const key = ethers.toNumber(item[0]);

                            return <Product className="" isOwn={checkOwn(key, ownProducts)} key={key} id={id} product={item[1]} clickHandler={buyProduct} />
                        })}
                    </div>
                </div>
            </Container>
        </div>
    )
  }
  
  export default Products;
  