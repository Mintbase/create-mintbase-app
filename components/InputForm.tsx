import { useWallet } from '../services/providers/MintbaseWalletContext'
import { MbMediaImport, MbTextArea } from 'mintbase-ui'
import {useState} from "react";

const InputForm = () => {
    const { wallet, isConnected, details } = useWallet()
    const [uploadedFile, setUploadedFile] = useState(null);
    const [observedDetails, setObservedDetails] = useState("");
    const [geoLocation, setGeoLocation] = useState("");
    const [base64String, setBase64String] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Someone pressed submit!");
        console.log(uploadedFile);
        console.log(observedDetails);
        upload(base64String);
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
                console.log("Called", reader);
                baseURL = reader.result;
                console.log(baseURL);
                resolve(baseURL);
            };
            console.log(fileInfo);
        });
    };

    const handleFileInputChange = (e) => {
        console.log(e.target.files[0]);

        let file = e.target.files[0];

        getBase64(file)
            .then(result => {
                file["base64"] = result;
                setBase64String(result);
                console.log(base64String);
                setUploadedFile(file);
            })
            .catch(err => {
                console.log(err);
            });
        setUploadedFile(e.target.files[0]);
    };

    const upload = async (base64string) => {
        // #1 Get base64 encoded PNG; make sure it's not prepended with data:image/png;base64, that's for browsers!
        const b64string = base64string.split('base64,')[1];
        console.log(b64string);

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
        console.log(uri)
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
                    <br />
                    <label>
                        Upload file:
                        <input type="file" onChange={handleFileInputChange}/>
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default InputForm
