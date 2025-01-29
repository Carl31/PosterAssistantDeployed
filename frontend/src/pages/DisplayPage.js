// DisplayPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams for accessing route parameters

const apiUrl = process.env.REACT_APP_API_URL

const DisplayPage = () => {
    const { objectId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await axios.get(`${apiUrl}/getObjectData`, {
                    params: { objectID: objectId }
                });
                setData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (objectId) {
            fetchData();
        } else {
            console.error("No object ID provided");
        }
    }, [objectId]);

    useEffect(() => {
        if (loading) {
            navigate("/loading");
        }
    }, [loading, navigate]);

    if (loading) {
        return null; // Prevents rendering while navigating
    }

    return (
        <div>
            <h1>Database Result</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DisplayPage;
