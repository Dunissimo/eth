import { ethers } from "hardhat";
import path from "path";
import fs from "node:fs";

const deploy = async () => {
    const [owner, ...others] = await ethers.getSigners();
    const erc20 = await ethers.getContractFactory("ERC20");
    const contract = await erc20.deploy("COIN", "COI", 12);

    console.log(await contract.getAddress());
    console.log(await contract.name());
    
    await contract.mint(owner, 100000);
    await contract.mint(others[0], 1000);

    console.log(`owner balance: ${await contract.balanceOf(owner)}`);
    
    console.log('before');
    console.log(`user1 balance: ${await contract.balanceOf(others[0])}`);
    console.log(`user2 balance: ${await contract.balanceOf(others[1])}`);
    
    await contract.connect(others[0]).transfer(others[1], 500);
    
    console.log('after');
    console.log(`user1 balance: ${await contract.balanceOf(others[0])}`);
    console.log(`user2 balance: ${await contract.balanceOf(others[1])}`);

    console.log(`Tokenomica: ${await contract.totalSupply()}`);

    const store = await ethers.getContractFactory("Store");
    const storeContract = await store.deploy(await contract.getAddress());

    await storeContract.createProduct(1, "Product #1", 100);
    await storeContract.createProduct(2, "Product #2", 20);
    await storeContract.createProduct(3, "Product #3", 50);
    await storeContract.createProduct(4, "Product #4", 500);
    await storeContract.createProduct(5, "Product #5", 10);

    console.log(await storeContract.getAllProductsIds());

    const data = {
        ERC20Address: await contract.getAddress(),
        StoreAddress: await storeContract.getAddress(),
    }

    const frontendDir = path.join(__dirname, '../../frontend/src/conf.json');
    fs.writeFileSync(frontendDir, JSON.stringify(data));
}

deploy().catch(error => {
    console.error(error);
    process.exit(1);
})