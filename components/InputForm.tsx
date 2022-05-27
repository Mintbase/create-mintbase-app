import { useWallet } from '../services/providers/MintbaseWalletContext'
import { MbMediaImport, MbTextArea } from 'mintbase-ui'
import {useState} from "react";

const InputForm = () => {
    const { wallet, isConnected, details } = useWallet()
    const [uploadedFile, setUploadedFile] = useState(null);
    const [observedDetails, setObservedDetails] = useState("");
    const [geoLocation, setGeoLocation] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Someone pressed submit!");
        console.log(uploadedFile);
        console.log(observedDetails);
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
                        <img src={uploadedFile}/>
                        <input type="file" onChange={(e) => setUploadedFile(URL.createObjectURL(e.target.files[0]))}/>
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default InputForm
