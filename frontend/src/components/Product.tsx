import { ethers } from "ethers";
import type { BigNumberish } from "ethers";
import { cn } from "@/lib/utils";
import type { Product as ProductType } from "@/types/store-types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface ProductProps {
    id: BigNumberish;
    product: ProductType;
    className?: string;
    isOwn: boolean;
    clickHandler?: (id: BigNumberish, price: BigNumberish) => Promise<void>;
}

function Product({className, clickHandler, id, isOwn, product: {name, price}}: ProductProps) {
    return (
        <div className={cn('product flex flex-col gap-3 w-full', className)}>
            <Card>
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <span>{ethers.toNumber(price)}</span>

                    <Button 
                        onClick={() => {
                            if (clickHandler) {
                                clickHandler(id, price);
                            }
                        }} 
                        disabled={isOwn} variant='outline'
                    >
                        {isOwn ? 'Куплено' : 'Купить'}
                    </Button>
                </CardContent>
            </Card>

            <h2>{}</h2>
        </div>
    )
}

export default Product;
