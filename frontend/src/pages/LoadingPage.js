import Loader from "../components/Loader";
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { React, useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL

const LoadingPage = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("Waiting for updates...");

    // for recieving real-time updates from backend
    useEffect(() => {
        const eventSource = new EventSource(`${apiUrl}/progress`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setStatus(data.status);

            if (data.includes("App completed")) {
                eventSource.close(); // Stop listening when done
                // Show the output page
            }
        };

        eventSource.onerror = () => {
            console.error("Error connecting to progress updates");
            eventSource.close();
        };

        return () => eventSource.close(); // Cleanup on unmount
    }, []);

    return (

        <Layout>
            {/* <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                Create your own poster with
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                    AI
                </span>
            </h1> */}
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div>
                    <Loader />
                </div>
                <div>
                    <p className="mt-4 leading-normal text-base mb-8 text-center text-gray-400">
                        Loading, please wait.
                    </p>
                </div>
                <div>
                    <p className="mt-4 leading-normal text-base mb-8 text-center text-gray-400">
                        {status}
                    </p>
                </div>
            </div>

        </Layout>
    );
};

export default LoadingPage;

