// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ERC20 {
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed from, address indexed to, uint256 amount);

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    string public name;
    string public symbol;
    uint8 public decimals;
    address owner;

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can do this");

        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        balanceOf[to] += amount;
        totalSupply += amount;
        
        emit Transfer(address(0), to, amount);
    }

    function burn(address from, uint256 amount) public onlyOwner {
        balanceOf[from] -= amount;
        totalSupply -= amount;

        emit Transfer(from, address(0), amount);
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Not enough amount");

        allowance[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);

        return true;
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Not enough amount");

        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;

        emit Transfer(msg.sender, to, amount);
        
        return true;
    }

    function transferFrom(address spender, address recepient, uint256 amount) public returns (bool) {
        require(balanceOf[spender] >= amount, "Not enough balance");
        require(allowance[spender][msg.sender] >= amount, "Not enough allowance");

        allowance[spender][msg.sender]  -= amount;
        balanceOf[spender] -= amount;
        balanceOf[recepient] += amount;

        emit Transfer(spender, recepient, amount);
    
        return true;
    }
}