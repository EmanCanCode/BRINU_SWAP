import { CurrencyAmount, DOGECHAIN } from "@dogeswap/sdk-core";
import JSBI from "jsbi";
import { MIN_DC } from "../constants";

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount): CurrencyAmount | undefined {
    if (!currencyAmount) return undefined;
    if (currencyAmount.currency === DOGECHAIN) {
        if (JSBI.greaterThan(currencyAmount.raw, MIN_DC)) {
            return CurrencyAmount.dogechain(JSBI.subtract(currencyAmount.raw, MIN_DC));
        } else {
            return CurrencyAmount.dogechain(JSBI.BigInt(0));
        }
    }
    return currencyAmount;
}
