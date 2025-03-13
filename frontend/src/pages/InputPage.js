import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL

const InputPage = ({ onSubmit }) => {
    const [error, setError] = useState('');
    const [brandError, setBrandError] = useState('');
    const [jsonData, setJsonData] = useState(''); // currently not used
    const [response, setResponse] = useState('');
    const navigate = useNavigate(); // Replace history with useNavigate

    const [userInstagram, setUserInstagram] = useState(""); // New state
    const [userImageLink, setUserImageLink] = useState(""); // New state
    const [templateName, setTemplateName] = useState(""); // New state
    const [additionalPngs, setAdditionalPngs] = useState(""); // New state for comma-separated values
    const [pngColour, setPngColour] = useState(""); // Initially N for no.

    const validateBrands = (userBrands) => {

        // if userBrands is empty, return true
        if (userBrands.length === 1) {
            return true;
        }

        const validBrands = [
            'bbs', 'enkei', 'fia', 'greddy', 'hks', 'kandn',
            'ktuned', 'mugen', 'nismo', 'rocketbunny', 'rotiform',
            'spoon', 'tbc', 'trd', 'typer', 'volkracing', 'vtec',
            'work', 'yokohama'
        ];

        const invalidBrands = userBrands.filter(brand => !validBrands.includes(brand));

        if (invalidBrands.length > 0) {
            setBrandError(`Invalid brands found: ${invalidBrands.join(", ")}`);
            return false;
        }

        setBrandError('');
        return true; // All brands are valid
    };

    const handleSubmitForJson = async (e) => {
        e.preventDefault();

        if (error) {
            alert("Please enter a valid Google Drive link before submitting.");
            return; // Stop form submission
        }

        if (!templateName || templateName === "") {
            alert("Please select a template name!"); // Ensure user selects a value
            return;
        }

        // get correct json data:
        let additionalPngsArray = additionalPngs.split(",").map((item) => item.trim()); // Convert to array
        const templateNameWithExtension = templateName.endsWith(".psd") ? templateName : `${templateName}.psd`;

        const brandsValid = validateBrands(additionalPngsArray);
        if (brandsValid === false) {
            alert("Please enter valid additional brands before submitting.");
            return; // Stop form submission
        }

        // add .png to end of each brand if bigger than length 1 (i.e. no user input)
        if (additionalPngsArray.length > 1) {
            additionalPngsArray = additionalPngsArray.map(brand => brand.endsWith('.png') ? brand : brand + '.png');
        }

        const jsonContent = onSubmit(userImageLink, "@"+userInstagram, templateNameWithExtension, additionalPngsArray, pngColour); // Call the json format function
        // For testing: 
        console.log("Generated JSON:", jsonContent);

        // Serialize the JSON object to a string
        const jsonString = JSON.stringify(jsonContent, null, 2); // Pretty-print with indentation for readability

        setJsonData(jsonString);


        // Send the JSON content to the backend
        try {
            // Attempt to parse the jsonData as a valid JSON object
            let parsedJsonData;
            try {
                parsedJsonData = JSON.parse(jsonString); // Try to parse the JSON data
            } catch (error) {
                setResponse('Invalid JSON format.');
                console.log("Invalid JSON:", jsonString);
                return;
            }

            // Send the JSON content to the backend
            const result = await axios.post(`${apiUrl}/submit-json`, parsedJsonData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setResponse(`File uploaded successfully. Object ID: ${result.data.objectId}`);
            console.log("Form submitted successfully!");

            // Navigate to the DisplayPage with the objectId
            // navigate(`/display/${result.data.objectId}`); // simple dsiaplay of json
            navigate(`/loading`);
        } catch (error) {
            setResponse('Error uploading the file.');
            console.error('Upload error:', error);
        }

    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setUserImageLink(value);

        // Regular expression for Google Drive links
        const googleDriveRegex = /^(https?:\/\/)?(www\.)?(drive\.google\.com\/(file\/d\/|open\?id=|uc\?)|docs\.google\.com\/[^/]+\/d\/)/;

        if (!googleDriveRegex.test(value)) {
            setError("Invalid Google Drive link"); // Show an error message
        } else {
            setError(""); // Clear error if valid
        }
    };

    return (
        <Layout>
            <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                Create your own poster with
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                    AI
                </span>
            </h1>
            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
                First, we need some info about your poster.
            </p>

            <form onSubmit={handleSubmitForJson} className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-blue-300 py-2 font-bold mb-2">
                        Input poster info:
                    </label>
                    <input
                        className="mb-4 shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        type="text"
                        placeholder="Your Image Link"
                        value={userImageLink}
                        onChange={handleInputChange}
                        required
                    />
                    {error && <p className="text-red-500 pb-4 pt-0">{error}</p>}
                    <input
                        className="mb-4 shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        type="text"
                        placeholder="Your instagram handle (optional)"
                        value={userInstagram}
                        onChange={(e) => setUserInstagram(e.target.value)}
                    />
                    <select
                        className="mb-4 shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        value={templateName}
                        onChange={(e) => {
                            //console.log("Dropdown Changed:", e.target.value); // Debugging
                            setTemplateName(e.target.value);
                        }}
                        required
                    >
                        <option value="">Select a template</option> {/* Placeholder option */}
                        <option value="Preset_C_1_2">Preset_C_1_2</option>
                        <option value="Preset_D_1_2">Preset_D_1_2</option>
                        <option value="Preset_clean_black">Preset_clean_black</option>
                        <option value="Preset_clean_white">Preset_clean_white</option>
                    </select>
                    <select className="mb-4 shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        onChange={(e) => setPngColour(e.target.value)}
                        required
                    >
                        <option value="">Select PNG colour</option>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                    </select>
                    <input
                        className="mb-4 shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        type="text"
                        placeholder="Additional Brands (comma-separated)"
                        value={additionalPngs}
                        onChange={(e) => setAdditionalPngs(e.target.value)}
                    />
                    {brandError && <p className="text-red-500 pb-4 pt-0">{brandError}</p>}
                </div>

                <div className="flex items-center justify-between pt-4">
                    <button
                        className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        type="submit"
                    >
                        Go!
                    </button>
                </div>
            </form>
            <div>{response}</div>
        </Layout>

    );
};

export default InputPage;
