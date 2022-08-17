import { ChainId, Token } from "@dogeswap/sdk-core";
import { addresses } from "./addresses";

export type ChainToken<T extends ChainId> = keyof typeof addresses[T]["tokens"];

type AddressableTokenMap = { [chainId in ChainId]: ChainToken<chainId> };
export type SupportedToken = AddressableTokenMap[keyof AddressableTokenMap];

interface TokenMetadata {
    name: string;
}

const tokenMetadata: Record<SupportedToken, TokenMetadata> = {
    dst: {
        name: "DogeSwap Token",
    },
    omnom: {
        name: "DogeEatDoge",
    },
    wwdoge: {
        name: "Wrapped wrapped Dogecoin",
    },
    eth: {
        name: "Ethereum",
    },
    usdc: {
        name: "USD Coin",
    },
    dai: {
        name: "Dai Stablecoin",
    },
    usdt: {
        name: "Tether USD",
    },
    wbtc: {
        name: "Wrapped BTC",
    },
};

const createTokens = <T extends ChainId>(chainId: T) => {
    return Object.entries(addresses[chainId]["tokens"]).reduce((r, [symbol, address]) => {
        const { name } = tokenMetadata[symbol as SupportedToken];
        r[symbol as ChainToken<T>] = new Token(chainId, address, 18, symbol.toUpperCase(), name);
        return r;
    }, {} as Record<ChainToken<T>, Token>);
};

export const tokens = {
    [ChainId.MAINNET]: createTokens(ChainId.MAINNET),
    [ChainId.TESTNET]: createTokens(ChainId.TESTNET),
    [ChainId.LOCALNET]: createTokens(ChainId.LOCALNET),
};

export const getToken = <T extends SupportedToken>(token: T, chainId: ChainId | undefined) => {
    if (chainId == undefined) {
        return undefined;
    }

    return (tokens as Record<ChainId, Partial<Record<SupportedToken, Token>>>)[chainId]?.[token] as
        | Token<Uppercase<T>>
        | undefined;
};
