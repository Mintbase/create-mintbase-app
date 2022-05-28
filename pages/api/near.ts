//testnet contract name: nft-example.vomira.testnet

import * as nearAPI from "near-api-js";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { connect, keyStores, WalletConnection } = nearAPI;



}