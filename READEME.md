
# contracts

### forge
```

forge compile 

forge install OpenZeppelin/openzeppelin-contracts

forge test


```
###  本地测试 cast 合约交互

打开 anvil 本地测试网络

```shell
anvil

source .env

forge create --private-key ${OWER_PRIVATE_KEY} --broadcast src/LuckyCoin.sol:LuckyCoin --constructor-args ${OWER_ADDRESS}

```

```shell
cast send 合约交互
cast send ${CONTRACT_ADDRESS} "mint(uint256)" 100000000000000000000 --private-key ${OWER_PRIVATE_KEY}


cast call ${CONTRACT_ADDRESS} "balanceOf(address)" ${OWER_ADDRESS}
cast call ${CONTRACT_ADDRESS} "balanceOf(address)" ${USER_ADDRESS}

cast to-dec 0x0000000000000000000000000000000000000000000000056bc75e2d63100000
```

brun
```shell
cast send ${CONTRACT_ADDRESS} "burn(uint256)" 50000000000000000000 --private-key ${OWER_PRIVATE_KEY}
```

transfer
```shell
cast send ${CONTRACT_ADDRESS} "transfer(address, uint256)" ${USER_ADDRESS} 10000000000000000000 --private-key ${OWER_PRIVATE_KEY}
```

cast call 调用 view 函数，不做修改 不用花费 gas