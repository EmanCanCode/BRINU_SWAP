import { ChainId, Token } from "@dogeswap/sdk-core";

export type ChainTokens<T extends string = string> = { [chainId in ChainId]: Token<T> };
export type ChainContracts = { [chainId in ChainId]: string };

interface InfrastructureAddress {
    factory: string;
    router: string;
    multicall: string;
    ensRegistrar: string;
}

export const addresses = {
    [ChainId.MAINNET]: {
        infrastructure: {
            factory: "0x0d6004FD9aBecA291E59B29e562B9C3CfF761706",
            router: "0xab2d15d2A431F946eE5Fa11ED9DDd7B8Ebc84648",
            multicall: "0x0cAea176944dA9fE8F14b39f20cd5a8a01278AbF",
            ensRegistrar: "0x0000000000000000000000000000000000000000",
        } as InfrastructureAddress,
        tokens: {
            brinu: "0x08f54Ac845158b8b12aaf2F3F85E79f0AEB1c2aC",
            wwdoge: "0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101",
            eth: "0xB44a9B6905aF7c801311e8F4E76932ee959c663C",
            usdc: "0x765277EebeCA2e31912C9946eAe1021199B39C61",
            dai: "0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C",
            usdt: "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D",
            wbtc: "0xfA9343C3897324496A05fC75abeD6bAC29f8A40f",
        },
    },
    [ChainId.TESTNET]: {
        infrastructure: {
            factory: "0x0d6004FD9aBecA291E59B29e562B9C3CfF761706",
            router: "0xab2d15d2A431F946eE5Fa11ED9DDd7B8Ebc84648",
            multicall: "0x0cAea176944dA9fE8F14b39f20cd5a8a01278AbF",
            ensRegistrar: "0x0000000000000000000000000000000000000000",
        } as InfrastructureAddress,
        tokens: {
            brinu: "0x08f54Ac845158b8b12aaf2F3F85E79f0AEB1c2aC",
            wwdoge: "0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101",
            eth: "0xB44a9B6905aF7c801311e8F4E76932ee959c663C",
            usdc: "0x765277EebeCA2e31912C9946eAe1021199B39C61",
            dai: "0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C",
            usdt: "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D",
            wbtc: "0xfA9343C3897324496A05fC75abeD6bAC29f8A40f",
        },
    },
    [ChainId.LOCALNET]: {
        infrastructure: {
            factory: "0x0d6004FD9aBecA291E59B29e562B9C3CfF761706",
            router: "0xab2d15d2A431F946eE5Fa11ED9DDd7B8Ebc84648",
            multicall: "0x0cAea176944dA9fE8F14b39f20cd5a8a01278AbF",
            ensRegistrar: "0x0000000000000000000000000000000000000000",
        } as InfrastructureAddress,
        tokens: {
            brinu: "0x08f54Ac845158b8b12aaf2F3F85E79f0AEB1c2aC",
            wwdoge: "0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101",
            eth: "0xB44a9B6905aF7c801311e8F4E76932ee959c663C",
            usdc: "0x765277EebeCA2e31912C9946eAe1021199B39C61",
            dai: "0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C",
            usdt: "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D",
            wbtc: "0xfA9343C3897324496A05fC75abeD6bAC29f8A40f",
        },
    },
};

export const getAddress = (address: keyof InfrastructureAddress, chainId: ChainId | undefined) => {
    return chainId == undefined ? undefined : addresses[chainId]?.infrastructure?.[address];
};
