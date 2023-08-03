import { task, types } from "hardhat/config";
import { deployExternalContracts } from "./deploy-utils";

const arrayify = (arg: any) =>
    (arg as string)
        .split(",")
        .map((x) => x.trim())
        .filter((x) => x != undefined && x !== "");

// const tryGetJsWallet = async (hre: HardhatRuntimeEnvironment) => {
//     try {
//         const wallet = require("../wallet");
//         if (typeof wallet.owner === "object" && typeof wallet.owner.privateKey === "string") {
//             return new hre.ethers.Wallet(wallet.owner.privateKey);
//         }
//     } catch (e) {
//         console.error("Could not load JS wallet", e);
//     }

//     return undefined;
// };

// const getWallet = async (hre: HardhatRuntimeEnvironment) => {
//     const wallet = await tryGetJsWallet(hre);
//     if (wallet == undefined) {
//         console.error("Could not instantiate wallet");
//         process.exit(1);
//     }

//     return wallet.connect(hre.ethers.provider);
// };

task("deploy")
    .addOptionalParam(
        "contracts",
        'The comma-separated list of contracts to deploy, or "*" for all.',
        "*",
        types.string,
    )
    .addOptionalParam("erc20", "The comma-separated list of ERC-20 tokens to create.", "", types.string)
    .addOptionalParam(
        "factory",
        "The address to the factory contract, if it exists. If unspecified the factory contract will be created.",
        undefined,
        types.string,
    )
    .addOptionalParam(
        "wwdoge",
        "The address to the WWDOGE contract, if it exists. If unpecified the WWDOGE contract will be created.",
        undefined,
        types.string,
    )
    .setAction(async ({ contracts: contractsString, erc20: erc20String, factory, wwdoge }, hre) => {
        const wallet = new hre.ethers.Wallet("91a62483d03dd2d4d25353c77e54c6c62f459c6e50979af0387e3c820734b527");
        const _wallet = wallet.connect(hre.ethers.provider);
        const contracts = contractsString === "*" ? contractsString : arrayify(contractsString);
        const erc20 = arrayify(erc20String);
        await deployExternalContracts(wwdoge, factory, contracts, erc20, _wallet, hre);
    });
