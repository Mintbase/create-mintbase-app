import type { NextApiRequest, NextApiResponse } from 'next'
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';

type Data = {
    uri: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // #1 Get the data from the POST request; encoded as base64 string.
    const b64string = req.body.b64string
    const buf = Buffer.from(b64string, 'base64');

    // #2 Make a connection to Arweave server; following standard example.
    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https'
    });

    // #3 Load our key from the .env file
    const arweaveKey = JSON.parse(process.env.ARWEAVE_KEY!) as JWKInterface

    // #4 Check out wallet balance. We should probably fail if too low?
    const arweaveWallet = await arweave.wallets.jwkToAddress(arweaveKey);
    const arweaveWalletBallance = await arweave.wallets.getBalance(arweaveWallet);

    // #5 Core flow: create a transaction, upload and wait for the status!
    let transaction = await arweave.createTransaction({data: buf}, arweaveKey);
    transaction.addTag('Content-Type', 'image/png');
    await arweave.transactions.sign(transaction, arweaveKey);
    const response = await arweave.transactions.post(transaction);
    const status = await arweave.transactions.getStatus(transaction.id)
    console.log(`Completed transaction ${transaction.id} with status code ${status}!`)

    // #6 This is the tricky part, use the format below to get to the PNG url!
    res.status(200).json({
        uri: `https://www.arweave.net/${transaction.id}?ext=png`
    })
}
