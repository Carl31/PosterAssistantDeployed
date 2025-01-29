// DisplayPage.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams for accessing route parameters

const apiUrl = process.env.REACT_APP_API_URL

const DisplayPage = () => {
    const { objectId } = useParams();
    const navigate = useNavigate();
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const hasFetched = useRef(false); // Prevent multiple fetch calls

    useEffect(() => {
        if (!objectId || hasFetched.current) return; // Prevent refetching

        hasFetched.current = true; // Mark as fetched
        navigate("/loading"); // Redirect to loading page

        const fetchData = async () => {
            try {
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

        fetchData();
    }, [objectId, navigate]);

    if (loading) return null; // Prevents rendering while transitioning

    return (
        <div>
            <h1>Database Result</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DisplayPage;
