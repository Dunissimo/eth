import { ethers } from "hardhat";
import path from "path";
import fs from "node:fs";

const deploy = async () => {
    const [owner, ...others] = await ethers.getSigners();
    const erc20 = await ethers.getContractFactory("ERC20");
    const contract = await erc20.deploy("COIN", "COI", 12);

    console.log(await contract.getAddress());
    console.log(await contract.name());
    
    await contract.mint(others[0], 1000);

    console.log(`owner balance: ${await contract.balanceOf(owner)}`);
    
    console.log('before');
    console.log(`user1 balance: ${await contract.balanceOf(others[0])}`);
    console.log(`user2 balance: ${await contract.balanceOf(others[1])}`);
    
    await contract.connect(others[0]).transfer(others[1], 500);
    
    console.log('after');
    console.log(`user1 balance: ${await contract.balanceOf(others[0])}`);
    console.log(`user2 balance: ${await contract.balanceOf(others[1])}`);

    await contract.mint(owner, 1000000);

    await contract.approve(others[0], 1000000);
    await contract.approve(others[1], 1000000);
    await contract.approve(others[2], 1000000);
    await contract.approve(others[3], 1000000);

    console.log(`Tokenomica: ${await contract.totalSupply()}`);

    // const data = {
    //     ERC20Address: await contract.getAddress(),
    // }

    // const frontendDir = path.join(__dirname, '../../frontend/src/conf.json');
    // fs.writeFileSync(frontendDir, JSON.stringify(data));
}

deploy().catch(error => {
    console.error(error);
    process.exit(1);
})