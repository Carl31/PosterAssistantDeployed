import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL

const InputPage = ({ onSubmit }) => {
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState('');
    const navigate = useNavigate(); // Replace history with useNavigate

    const [userImageLink, setUserImageLink] = useState(""); // New state
    const [templateName, setTemplateName] = useState(""); // New state
    const [additionalPngs, setAdditionalPngs] = useState(""); // New state for comma-separated values

    const handleSubmitForJson = async (e) => {
        e.preventDefault();

        // get correct json data:
        const additionalPngsArray = additionalPngs.split(",").map((item) => item.trim()); // Convert to array
        const templateNameWithExtension = templateName.endsWith(".psd") ? templateName : `${templateName}.psd`;

        const jsonContent = onSubmit(userImageLink, templateNameWithExtension, additionalPngsArray); // Call the json format function
        // For testing: console.log("Generated JSON:", jsonContent);

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

            // Navigate to the DisplayPage with the objectId
            navigate(`/display/${result.data.objectId}`);
        } catch (error) {
            setResponse('Error uploading the file.');
            console.error('Upload error:', error);
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
                        onChange={(e) => setUserImageLink(e.target.value)}
                        required
                    />
                    <input
                        className="mb-4 shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        type="text"
                        placeholder="Template Name"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        required
                    />
                    <input
                        className="mb-4 shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        type="text"
                        placeholder="Additional PNGs (comma-separated)"
                        value={additionalPngs}
                        onChange={(e) => setAdditionalPngs(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between pt-4">
                    <button
                        className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        type="submit"
                    >
                        Generate JSON
                    </button>
                </div>
            </form>
            <div>{response}</div>
        </Layout>

    );
};

export default InputPage;
