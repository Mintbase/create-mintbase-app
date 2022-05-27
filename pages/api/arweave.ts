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

    const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
        timeout: 20000, // Network request timeout in milliseconds
        logging: false, // Disable network request logging
    });

    const key = JSON.parse(process.env.ARWEAVE_KEY);
    const imageDataUri =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAABLNJREFUeF7t28GO2zAMRdHk/z86RdtVAQ9AlmIoy2fWT6R1eaNEwPj9+Xw+L38IDBF4E3CIvLZ/CBCQCKMECDiKX3MCcmCUAAFH8WtOQA6MEiDgKH7NCciBUQIEHMWvOQE5MEqAgKP4NScgB0YJEHAUv+YE5MAoAQKO4tecgBwYJUDAUfyaE5ADowQIOIpf88cJ+H6//3vqXp/5b3Q/LiRggikBE7CCUQIGQf2OETABKxglYBAUAROgElECJmA5AROwgtFjBPzG5aLS42oehD7oveCKHFERKj0IeH0kOgETlwsCBr9XEzECEjChy/ooAQm43qpExe0FjH7tRX/HJdi0R0/eWxQeAaOkGnIEvMEt+OQhnby36OfVCRgl1ZAjoBOwQat4SQLeVMA7XjjiWj4recuvYAKeIykBz5nlLXdCwFuO7ZyHJuA5s7zlTrYS8OpW6PfeLb0KPzQBw6gEOwgQsIOqmmECBAyjEuwgQMAOqmqGCYwJ6MIRntHRQQIePd79N0fA/Wd09BMS8Ojx7r85Au4/o6Of8CsCunAc7VBpcwQs4bO4SoCAVYLWlwgQsITP4ioBAlYJWl8isFxAF47SPB63mICPG/leGybgXvN43NMQ8HEj32vDBNxrHo97mpKALhyP82X5hgm4HKmCGQIEzNCSXU6AgMuRKpghQMAMLdnlBAi4HKmCGQIEzNCSXU6AgMuRKpghQMAMLdnlBAi4HKmCGQIEzNCSXU6AgMuRKpghQMAMLdnlBAi4HKmCGQIEzNCSXU6AgMuRKpghQMAMLdnlBAi4HKmCGQIEzNCSXU6AgMuRKpghEBbQ+x8ZrLJRAgSMkpJrIUDAFqyKRgkQMEpKroUAAVuwKholQMAoKbkWAgRswapolAABo6TkWggQsAWrolECBIySkmshQMAWrIpGCRAwSkquhQABW7AqGiVAwCgpuRYCBGzBqmiUAAGjpORaCBCwBauiUQIEjJKSayFAwBasikYJEDBKSq6FwKWA3v9oYa3oBQEC0mKUAAFH8WtOQA6MEiDgKH7N3YI5MEqAgKP4NScgB0YJEHAUv+YE5MAoAQKO4tecgBwYJUDAUfyaE5ADowQIOIpf87CAV6j82xaBqgQIWCVofYkAAUv4LK4SIGCVoPUlAgQs4bO4SqAkoItJFb/1BOTAKAECjuLXnIAcGCVAwFH8mi8X0MWEVBkCBMzQkl1OgIDLkSqYIUDADC3Z5QQIuBypghkCXxEwejG5yn0+n8x+jsxe/dtbZaM7MSVgZZJfWkvABtBRqDt9WhswhEpGWYWKvV6vnZg6AaNTG8wRsAF+FOpOn9YGDKGSUVahYk7AKKa/uQr83eWN7m33feQm+m967Cs4+tDRId3xBh3dGwGjtjTkokMiYAP8L5R0An4B8k8toh8uJ+ANhuQEHBxSofX2J2Bhb6ULTKVvZe3Jp90VFwJWbGlYS8AGqFMlo7+xpp7vjj8bVrNyAq4mWqznBCwC3Gm5E3CnaVw/y9En4P74PSEBOTBKgICj+DUnIAdGCRBwFL/mBOTAKAECjuLXnIAcGCVAwFH8mhOQA6MECDiKX3MCcmCUAAFH8WtOQA6MEiDgKH7NfwER2jFdIT5jOQAAAABJRU5ErkJggg==";
    const imageBuffer = Buffer.from(imageDataUri.split(",")[1], "base64");

    // Create and submit transaction
    const transaction = await arweave.createTransaction(
        {
            data: imageBuffer,
        },
        key
    );

    await arweave.transactions.sign(transaction, key);
    const postResponse = await arweave.transactions.post(transaction);
    console.log("post response", postResponse);
    // Transaction ID gets updated after arweave.transactions.post, which is a bit unintuitive
    console.log("transaction ID", transaction.id);

    // Read data back
    const transactionData = await arweave.transactions.getData(transaction.id);
    console.log(
        "transaction data",
        Buffer.from(transactionData, "base64").toString()
    );
}