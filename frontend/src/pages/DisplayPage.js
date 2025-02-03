// DisplayPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams for accessing route parameters
import LoadingPage from '../pages/LoadingPage';
import OutputPage from '../pages/OutputPage';

const apiUrl = process.env.REACT_APP_API_URL

const DisplayPage = () => {
    const { objectId } = useParams(); // Extract objectId from the URL
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [jsonLinks, setJsonLinks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${apiUrl}/getObjectData`, {
                    params: { objectID: objectId } // Use `params` for query parameters
                });
                setData(result.data);
                let jsonLinks = [];
                setJsonLinks([result.data.output[0], result.data.output[1], result.data.output[2]]); // FIXME: This is not error-tested and will probably not work right now.
                setLoading(false);
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

    if (loading) {
        return <LoadingPage/>
    }

    return (
        // <div>
        //     <h1>Database Result</h1>
        //     <pre>{JSON.stringify(data, null, 2)}</pre>
        // </div>
        <OutputPage posterLinks={jsonLinks}/>
    );
};

export default DisplayPage;