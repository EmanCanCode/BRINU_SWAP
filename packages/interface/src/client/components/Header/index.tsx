import React from "react";
import { isMobile } from "react-device-detect";
import { Text } from "rebass";

import styled from "styled-components";

import { useActiveWeb3React } from "../../hooks";
import { useWDOGEBalances } from "../../state/wallet/hooks";

import { YellowCard } from "../Card";
import Menu from "../Menu";
import Settings from "../Settings";

import { ChainId } from "@dogeswap/sdk-core";
import Row, { RowBetween } from "../Row";
import Web3Status from "../Web3Status";

const HeaderFrame = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    top: 0;
    position: absolute;
    z-index: 2;
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`;

const HeaderElement = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderElementWrap = styled.div`
    display: flex;
    align-items: center;

    ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`;

const Title = styled.a`
    display: flex;
    align-items: center;
    pointer-events: auto;
    text-decoration: none;

    :hover {
        cursor: pointer;
    }
`;

const TitleText = styled(Row)`
    color: black;
    font-family: "Kanit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 18px;
    font-weight: bold;
    margin-left: 8px;
    width: fit-content;
    white-space: nowrap;
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        display: none;
    `};
`;

const AccountElement = styled.div<{ active: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
    border-radius: 12px;
    white-space: nowrap;
    width: 100%;

    :focus {
        border: 1px solid blue;
    }
`;

const TestnetWrapper = styled.div`
    white-space: nowrap;
    width: fit-content;
    margin-left: 10px;
    pointer-events: auto;
`;

const NetworkCard = styled(YellowCard)`
    width: fit-content;
    margin-right: 10px;
    border-radius: 12px;
    padding: 8px 12px;
`;

const UniIcon = styled.div`
    transition: transform 0.3s ease;
    :hover {
        transform: rotate(-5deg);
    }
    ${({ theme }) => theme.mediaWidth.upToSmall`
    img {
      width: 4.5rem;
    }
  `};
`;

const HeaderControls = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
`;

const BalanceText = styled(Text)`
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
    [ChainId.MAINNET]: null,
    [ChainId.TESTNET]: "Testnet",
    [ChainId.LOCALNET]: "Localnet",
};

export default function Header() {
    const { account, chainId } = useActiveWeb3React();

    const userWDOGEBalance = useWDOGEBalances(account ? [account] : [])?.[account ?? ""];

    return (
        <HeaderFrame>
            <div style={{ background: "black", color: "white", width: "100%", textAlign: "center", padding: 4 }}>
                Beware of scams! Breed Swap is open source and decentralised - anybody can create a token, and Breed
                Swap does not verify the authenticity of tokens.
            </div>
            <RowBetween style={{ alignItems: "flex-start" }} padding="1rem 1rem 0 1rem">
                <HeaderElement>
                    <Title style={{ marginLeft: "50%" }} href=".">
                        <UniIcon>
                            <svg
                                version="1.0"
                                xmlns="http://www.w3.org/2000/svg"
                                width="400pt"
                                height="400pt"
                                viewBox="0 0 400.000000 400.000000"
                                preserveAspectRatio="xMidYMid meet"
                                style={{ height: "55px", width: "55px" }}
                            >
                                <g
                                    transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)"
                                    fill="#f4d504"
                                    stroke="#f4d504"
                                    stroke-width="5"
                                >
                                    <path
                                        d="M2886 3165 c-61 -21 -143 -83 -209 -156 -59 -65 -62 -67 -87 -54 -45
                        23 -215 73 -326 97 -94 20 -138 23 -324 23 -234 0 -333 -14 -485 -71 -38 -14
                        -78 -28 -87 -31 -12 -3 -40 16 -85 56 -38 35 -101 78 -142 99 -67 33 -83 37
                        -151 37 -68 0 -82 -4 -126 -30 -85 -52 -142 -156 -181 -330 -18 -78 -28 -433
                        -15 -550 8 -79 7 -96 -10 -139 -10 -27 -29 -90 -42 -140 -122 -474 108 -865
                        615 -1044 116 -41 231 -68 399 -94 136 -21 676 -18 810 5 216 37 351 77 495
                        149 113 57 190 114 276 206 216 229 264 549 133 893 -25 66 -25 67 -13 220 22
                        306 -24 573 -127 735 -73 115 -198 162 -318 119z m152 -210 c88 -99 134 -440
                        97 -714 l-14 -104 36 -86 c200 -484 -23 -857 -595 -992 -147 -35 -304 -50
                        -542 -50 -431 0 -734 68 -958 214 -281 184 -360 467 -227 820 35 96 36 99 26
                        173 -16 114 -14 424 4 524 51 290 127 311 343 94 l103 -103 87 44 c178 89 343
                        120 598 112 235 -8 405 -47 588 -138 43 -21 84 -39 90 -39 6 0 23 20 39 44 15
                        24 55 74 89 111 122 133 180 155 236 90z"
                                    />
                                    <path
                                        d="M1890 2011 c-55 -18 -110 -52 -163 -103 -32 -30 -57 -58 -57 -64 0
                        -5 15 -19 33 -29 l32 -20 -318 -3 c-175 -1 -317 -6 -315 -10 2 -4 45 -69 96
                        -145 l93 -137 -96 -140 c-52 -77 -95 -142 -95 -145 0 -3 405 -5 900 -5 495 0
                        900 3 900 6 0 3 -43 69 -95 145 l-95 140 95 139 c52 76 95 141 95 144 0 4
                        -143 6 -317 6 l-318 1 33 27 34 28 -61 56 c-89 83 -155 111 -266 115 -49 1
                        -101 -1 -115 -6z m-375 -281 c58 -13 75 -40 75 -115 0 -49 -4 -66 -20 -80 -19
                        -18 -19 -18 5 -47 21 -24 25 -40 25 -89 0 -110 -33 -139 -155 -139 l-75 0 0
                        233 c0 129 3 237 7 240 9 10 91 8 138 -3z m309 -13 c49 -32 59 -154 16 -197
                        -17 -17 -17 -18 4 -39 18 -19 21 -35 24 -122 l4 -100 -39 3 -38 3 -3 75 c-3
                        110 -7 120 -42 120 l-30 0 0 -100 0 -100 -40 0 -40 0 0 234 c0 178 3 236 13
                        240 24 11 146 -1 171 -17z m294 -14 l3 -33 -65 0 -66 0 0 -65 0 -65 49 0 c55
                        0 66 -9 57 -46 -6 -21 -12 -24 -56 -24 l-50 0 0 -70 0 -70 65 0 65 0 0 -35 0
                        -35 -100 0 -100 0 0 241 0 240 98 -3 97 -3 3 -32z m250 0 l3 -33 -65 0 -66 0
                        0 -65 0 -65 50 0 50 0 0 -35 0 -35 -50 0 -50 0 0 -70 0 -70 65 0 65 0 0 -35 0
                        -35 -105 0 -106 0 1 234 c1 129 4 237 8 240 3 4 49 5 102 4 l95 -3 3 -32z
                        m227 13 c34 -23 45 -74 45 -216 0 -209 -15 -233 -146 -239 l-84 -3 0 234 c0
                        129 3 238 8 242 12 13 151 -1 177 -18z"
                                    />
                                    <path
                                        d="M1446 1648 c-3 -13 -4 -41 -3 -63 2 -32 6 -41 23 -43 44 -6 70 59 44
                        109 -15 27 -58 25 -64 -3z"
                                    />
                                    <path
                                        d="M1445 1447 c-4 -13 -5 -43 -3 -68 3 -40 5 -44 33 -47 36 -4 55 18 55
                        66 0 49 -16 72 -50 72 -23 0 -31 -5 -35 -23z"
                                    />
                                    <path
                                        d="M1720 1600 c0 -66 1 -70 23 -70 34 0 47 19 47 70 0 51 -13 70 -47 70
                        -22 0 -23 -4 -23 -70z"
                                    />
                                    <path
                                        d="M2490 1500 l0 -170 29 0 c17 0 31 6 35 16 3 9 6 80 6 158 0 150 -4
                        166 -47 166 l-23 0 0 -170z"
                                    />
                                    <path
                                        d="M1168 1995 c-66 -13 -158 -48 -158 -60 0 -5 39 -85 44 -92 1 -1 33 9
                        72 22 117 42 221 30 286 -32 l28 -26 36 19 c64 34 64 41 7 94 -79 73 -193 100
                        -315 75z"
                                    />
                                    <path
                                        d="M2660 1996 c-76 -17 -120 -40 -165 -86 -43 -44 -41 -52 19 -84 l36
                        -19 28 26 c65 62 169 74 286 32 39 -13 71 -23 72 -22 1 1 12 22 24 46 22 43
                        22 45 4 58 -27 20 -130 50 -194 56 -30 3 -80 0 -110 -7z"
                                    />
                                </g>
                            </svg>
                            {/* <img src="https://breed.dog/assets/header.png" alt="" height="48" width="48" /> */}
                        </UniIcon>
                        <TitleText style={{ color: "white" }}>Breed Swap</TitleText>
                    </Title>
                </HeaderElement>
                <HeaderControls>
                    <HeaderElement>
                        <TestnetWrapper>
                            {!isMobile && chainId && NETWORK_LABELS[chainId] && (
                                <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>
                            )}
                        </TestnetWrapper>
                        <AccountElement active={!!account} style={{ pointerEvents: "auto" }}>
                            {account && userWDOGEBalance ? (
                                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                                    {userWDOGEBalance?.toSignificant(4)} WDOGE
                                </BalanceText>
                            ) : null}
                            <Web3Status />
                        </AccountElement>
                    </HeaderElement>
                    <HeaderElementWrap>
                        <Settings />
                        <Menu />
                    </HeaderElementWrap>
                </HeaderControls>
            </RowBetween>
        </HeaderFrame>
    );
}
