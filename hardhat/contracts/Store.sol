// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ERC20.sol";

contract Store {
    address public owner;
    struct Product {
        string name;
        uint256 price;
    }

    mapping(uint256 => Product) private products;
    uint256[] private productsIds; 
    mapping(address => uint256[] productIds) public usersProducts;
    ERC20 public erc20;

    constructor(address erc) {
        owner = msg.sender;
        erc20 = ERC20(erc);
    }

    modifier onlyAdmin() {
        require(msg.sender == owner, "Access error");

        _;
    }

    function createProduct(uint256 id, string memory name, uint256 price) public onlyAdmin {
        products[id] = Product(name, price);
        productsIds.push(id);
    }
    
    function buyProduct(uint256 id) payable public {
        usersProducts[msg.sender].push(id);

        erc20.transferFrom(msg.sender, owner, products[id].price);
    }

    function getProducts() view public returns (uint256[] memory) {
        return usersProducts[msg.sender];
    }

    function getAllProductsIds() view public returns (uint256[] memory) {
        return productsIds;
    }

    function getOneProduct(uint256 id) view public returns (Product memory) {
        return products[id];
    }
}