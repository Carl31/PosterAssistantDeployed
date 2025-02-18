// InputPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL

const InputPage = () => {
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState('');
    const navigate = useNavigate(); // Replace history with useNavigate

    const handleJsonChange = (event) => {
        setJsonData(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            // Attempt to parse the jsonData as a valid JSON object
            let parsedJsonData;
            try {
                parsedJsonData = JSON.parse(jsonData); // Try to parse the JSON data
            } catch (error) {
                setResponse('Invalid JSON format.');
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
