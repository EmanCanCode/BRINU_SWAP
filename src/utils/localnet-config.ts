import { ChainId } from "../../../sdk-core/src/constants";
import { localnet } from "../utils/config";

const localTokens = {
  DST: true,
  USDT: true,
  USDC: true,
  DAI: true,
  WDC: true,
}

interface LocalnetConfigBase {
  v2FactoryAddress: string;
  v2RouterAddress: string;
  multicallAddress: string;
  localTokenList?: string;
}

type TokenAddressConfig = { [key in keyof (typeof localTokens) as `${Lowercase<key>}StakingRewardAddress`]: string }

type RewardAddressConfig = { [key in keyof (typeof localTokens) as `${Lowercase<key>}Address`]: string }

type LocalnetConfig = LocalnetConfigBase & TokenAddressConfig & RewardAddressConfig;

const getTokenAddress = (token: string) => localnet[`${token.toLowerCase()}Address`]

const createLocalnetTokenListItem = (symbol: string) => ({
  chainId: ChainId.LOCALNET,
  address: getTokenAddress(symbol),
  name: symbol,
  symbol,
  decimals: 18,
  logoURI: "https://assets.coingecko.com/coins/images/4490/thumb/aergo.png?1647696770"
})

const addressConfig = Object.keys(localTokens).reduce<Record<string, string>>((r, x) => {
  r[`${x.toLowerCase()}Address`] = getTokenAddress(x) as string;
  return r;
}, {});

const createLocalnetTokenList = () => ({
    name: "Local",
    timestamp: new Date().toISOString(),
    version: {
      major: 0,
      minor: 0,
      patch: 0
    },
    tags: {},
    logoURI: "ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir",
    keywords: [],
    tokens: Object.keys(localTokens).map(x => createLocalnetTokenListItem(x))
})

export const localnetConfig = {
  v2FactoryAddress: localnet.factoryAddress,
  v2RouterAddress: localnet.router01Address,
  multicallAddress: localnet.multicallAddress,

  ...addressConfig,

  localTokenList: JSON.stringify(createLocalnetTokenList()),
} as LocalnetConfig;