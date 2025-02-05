// DisplayPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams for accessing route parameters
import LoadingPage from '../pages/LoadingPage';
import OutputPage from '../pages/OutputPage';
import Layout from './Layout';

const apiUrl = process.env.REACT_APP_API_URL

const DisplayPage = () => {
    // const { objectId } = useParams(); // Get objectId from URL - OLD simple version
    // const [loading, setLoading] = useState(true); // previous version used loading
    const [jsonData, setJsonData] = useState(null);
    const maxRetries = 2; // 40 attempts (2 minutes total)
    const retryInterval = 3000; // 3 seconds interval
    

    useEffect(() => {
        let retryCount = 0;

        const fetchProgress = async () => {
            try {
                const response = await axios.get(`${apiUrl}/notify`);

                if (response.status === 200 && response.data) {
                    const data = response.data;
                    setJsonData(data);

                } else {
                    console.warn("No data received. Retrying...");
                }
            } catch (error) {
                console.error("Error fetching progress:", error);
            }

            // Continue polling if retry limit isn't reached
            if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(fetchProgress, retryInterval);
            } else {
                console.error("Max retries reached. Stopping polling.");
            }
        };

        fetchProgress(); // Initial call

    }, []);

    // if (loading) {
    //     return <LoadingPage />;
    // }

    // return <OutputPage posterLinks={jsonData} />;
    return (
        <Layout>

            <div className=" pt-4 flex justify-center items-center">
                <p>{jsonData}</p>
            </div>
        </Layout>
    );
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