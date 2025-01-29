// DisplayPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams for accessing route parameters

const apiUrl = process.env.REACT_APP_API_URL

const DisplayPage = () => {
    const { objectId } = useParams(); // Extract objectId from the URL
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                navigate("/loading"); // Navigate to loading page while fetching
                const result = await axios.get(`${apiUrl}/getObjectData`, {
                    params: { objectID: objectId } // Use `params` for query parameters
                });
                setData(result.data);
                navigate(`/display/${objectId}`); // Navigate back after data is loaded
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (objectId) {
            fetchData();
        } else {
            console.error("No object ID provided");
        }
    }, [objectId, navigate]);

    if (!data) {
        return null; // Prevent rendering anything while navigating
    }

    return (
        <div>
            <h1>Database Result</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DisplayPage;