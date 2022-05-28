import { useWallet } from '../services/providers/MintbaseWalletContext'
import * as nearAPI from "near-api-js";
import {useState} from "react";

const InputForm = () => {
    const {wallet, isConnected, details} = useWallet()
    const [uploadedFile, setUploadedFile] = useState(null);
    const [observedDetails, setObservedDetails] = useState("");
    const [base64String, setBase64String] = useState("");
    const [arweaveUri, setArweaveUri] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // upload(base64String)
        //     .then(arweaveUri => mintNFT(arweaveUri))
        //     .then(contractResponse => console.log(contractResponse))
        //     .catch(err => console.log('There was an error:' + err));
        mintAssetToNft().then(contractResponse => console.log(contractResponse)).catch(err => console.log('There was an error:' + err));
    }

    const getBase64 = (file) => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load something...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    const handleFileInputChange = (e) => {
        let file = e.target.files[0];

        getBase64(file)
            .then(result => {
                file["base64"] = result;
                setBase64String(result);
                setUploadedFile(file);
            })
            .catch(err => {
                console.log(err);
            });
        setUploadedFile(e.target.files[0]);
    };

    const upload = async (base64string: string) => {
        // #1 Get base64 encoded PNG; make sure it's not prepended with data:image/png;base64, that's for browsers!
        const b64string = base64string.split('base64,')[1];

        // #2 Make a post request to our API. Obviously, update the URL to your own deployment.
        const response = await fetch("/api/arweave", {
            method: 'POST',
            body: JSON.stringify({
                b64string: b64string,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // #3 Get our Arweave URL, that's it!
        const uri = (await response.json()).uri
        setArweaveUri(uri);
    }

    const mintAssetToNft = async () => {
            const nearConfig = {
                networkId: 'testnet',
                nodeUrl: 'https://rpc.testnet.near.org',
                contractName: 'nft-example.vomira.testnet',
                walletUrl: 'https://wallet.testnet.near.org',
                helperUrl: 'https://helper.testnet.near.org',
            };

        const contract = new nearAPI.Contract(
            wallet.account(), // the account object that is connecting
            "nft-example.vomira.testnet",
            {
                // name of contract you're connecting to
                viewMethods: ["getMessages"], // view methods do not change state but usually return a value
                changeMethods: ["nft_mint"], // change methods modify state
                sender: details.accountId, // account object to initialize and sign transactions.
            }
        );

        await contract.nft_mint(
            {
                token_id: "5",
                metadata: {
                    title: "Observation NFT",
                    description: observedDetails,
                    media: "https://www.arweave.net/6Jd4mreKe20zDUloBPxGssGGzDA9navuQgv3xJbEr_w?ext=png",
                },
                receiver_id: details.accountId
            },
            "300000000000000", // attached GAS (optional)
        ).then(() => {
            console.log("success")
        }).catch((error) => {
            console.log(error);
        });
    };

    // const mintNFT = async (arweaveUri: string) => {
    //     console.log("mintNft called");
    //
    //     const nearConfig = {
    //         networkId: 'testnet',
    //         nodeUrl: 'https://rpc.testnet.near.org',
    //         contractName: 'nft-example.vomira.testnet',
    //         walletUrl: 'https://wallet.testnet.near.org',
    //         helperUrl: 'https://helper.testnet.near.org',
    //     };
    //     const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore()
    //     console.log("key store", keyStore);
    //     const near =  await nearAPI.connect({keyStore, ...nearConfig});
    //     console.log("near", near);
    //     const wallet = new nearAPI.WalletConnection(near, 'nft-example.vomira');
    //     console.log("wallet", wallet);
    //
    //     const walletAccountId = wallet.getAccountId();
    //     console.log("walletAccountId", walletAccountId);
    //
    //     const contract = new nearAPI.Contract(
    //         wallet.account(), // the account object that is connecting
    //         "nft-example.vomira.testnet",
    //         {
    //             // name of contract you're connecting to
    //             viewMethods: ["getMessages"], // view methods do not change state but usually return a value
    //             changeMethods: ["addMessage"], // change methods modify state
    //             sender: wallet.account(), // account object to initialize and sign transactions.
    //         }
    //     );
    //
    //     console.log(contract)
    // };

    const mintNftWithAccount = async () => {
        const nearConfig = {
            networkId: 'testnet',
            nodeUrl: 'https://rpc.testnet.near.org',
            contractName: 'nft-example.vomira.testnet',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
        };

        const near = await nearAPI.connect(nearConfig);
        const account = await near.account("vomira.testnet");

        const contract = new nearAPI.Contract(
            account, // the account object that is connecting
            "nft-example.vomira.testnet",
            {
                // name of contract you're connecting to
                viewMethods: ["nft_token"], // view methods do not change state but usually return a value
                changeMethods: ["nft_mint"], // change methods modify state
                sender: account, // account object to initialize and sign transactions.
            }
        );
        await contract.nft_mint(
            {
                "token_id": "token-1",
                "metadata":
                    {
                        "title": "My Non Fungible Team Token",
                        "description": "The Team Most Certainly Goes :)",
                        "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"},
                        "receiver_id": account},
        );
    }

    return (
        <>
            <div className="w-full">
                <form onSubmit={handleSubmit}>
                    <label>
                        Field Observations:
                        <input
                            type="text"
                            value={observedDetails}
                            onChange={e => setObservedDetails(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label>
                        Upload file:
                        <input type="file" onChange={handleFileInputChange}/>
                    </label>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}
export default InputForm