// DisplayPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams for accessing route parameters

const apiUrl = process.env.REACT_APP_API_URL

const DisplayPage = () => {
    const { objectId } = useParams(); // Extract objectId from the URL
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${apiUrl}/getObjectData`, {
                    params: { objectID: objectId } // Use `params` for query parameters
                });
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (objectId) {
            fetchData();
        }
        else {
            console.error('No object ID provided');
        }
    }, [objectId]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Database Result</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DisplayPage;
