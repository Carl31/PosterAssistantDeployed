// InputPage.js
import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL

const InputPage = () => {
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState('');

    const handleJsonChange = (event) => {
        setJsonData(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            // Send the JSON content to the backend
            const result = await axios.post(`${apiUrl}/submitjson`, {
                jsonData,
            });
            setResponse(`File uploaded successfully. Object ID: ${result.data.objectId}`);
        } catch (error) {
            setResponse('Error uploading the file.');
        }
    };

    return (
        <div>
            <h1>Input JSON</h1>
            <textarea
                value={jsonData}
                onChange={handleJsonChange}
                rows="10"
                cols="50"
                placeholder="Enter JSON data here"
            />
            <br />
            <button onClick={handleSubmit}>Submit JSON</button>
            <div>{response}</div>
        </div>
    );
};

export default InputPage;
