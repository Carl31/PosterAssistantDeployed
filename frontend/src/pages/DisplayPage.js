// DisplayPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams for accessing route parameters
import LoadingPage from '../pages/LoadingPage';
import OutputPage from '../pages/OutputPage';

const apiUrl = process.env.REACT_APP_API_URL

const DisplayPage = () => {
    const { objectId } = useParams(); // Get objectId from URL
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let retryCount = 0; // Initialize retry counter

            try {
                const response = await axios.get(`${apiUrl}/notify`);

                if (response.status === 200) {
                    setJsonData(response.data.json); // JSON is ready, store it
                    setLoading(false); // Stop showing loading screen
                } else {
                    // JSON is not ready yet, keep polling
                    if (retryCount < 5) {
                        setTimeout(fetchData, 3000); // Poll every 3 seconds
                    }
                    retryCount++; // Increment retry counter
                }
            } catch (error) {
                console.error("Error fetching JSON:", error);
                retryCount++; // Increment retry counter

                if (retryCount < 5) {
                    setTimeout(fetchData, 5000); // Retry in 5 seconds on failure
                } else {
                    console.error("Max retries exceeded. Giving up.");
                    setLoading(false); // Stop showing loading screen
                    // You can also display an error message to the user here
                }
            }
        };

        fetchData(); // Start polling immediately when page loads
    }, [objectId]); // Include objectId in the dependency array so that it reruns with every change to objectID (i.e. after every new time the user submits json)

    if (loading) {
        return <LoadingPage />;
    }

    // return <OutputPage posterLinks={jsonData} />;
    return <pre>{JSON.stringify(jsonData, null, 2)}</pre>; // Render the JSON data as raw text
};

// const DisplayPage = () => {
//     const { objectId } = useParams(); // Extract objectId from the URL
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true)
//     const [jsonLinks, setJsonLinks] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const result = await axios.get(`${apiUrl}/getObjectData`, {
//                     params: { objectID: objectId } // Use `params` for query parameters
//                 });
//                 setData(result.data);
//                 let jsonLinks = [];
//                 //setJsonLinks([result.data.output[0], result.data.output[1], result.data.output[2]]); // FIXME: This is not error-tested and will probably not work right now.
//                 setJsonLinks(1,2,3);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         if (objectId) {
//             fetchData();
//         }
//         else {
//             console.error('No object ID provided');
//         }
//     }, [objectId]);

//     if (loading) {
//         return <LoadingPage/>
//     }

//     return (
//         // <div>
//         //     <h1>Database Result</h1>
//         //     <pre>{JSON.stringify(data, null, 2)}</pre>
//         // </div>
//         <OutputPage posterLinks={jsonLinks}/>
//     );
// };

export default DisplayPage;