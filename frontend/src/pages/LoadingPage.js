import Loader from "../components/Loader";
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { React, useEffect, useState } from "react";
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL

const LoadingPage = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("Waiting for updates...");
    const [queue, setQueue] = useState([]); // Stores messages to display
    const [isDisplaying, setIsDisplaying] = useState(false); // Controls animation

    useEffect(() => {
        let isMounted = true;

        const fetchProgress = async () => {
            try {
                const response = await axios.get(`${apiUrl}/progress`);
                const newMessages = response.data.messages;

                if (!isMounted) return; // Prevent state update if unmounted

                if (newMessages.length > 0) {
                    setQueue(prevQueue => [...prevQueue, ...newMessages]);
                }
            } catch (error) {
                console.error("Error fetching progress:", error);
            } finally {
                setTimeout(fetchProgress, 10000); // Poll every 10 seconds
            }
        };

        fetchProgress();

        return () => {
            isMounted = false;
        };
    }, []);

    // Display each update for 1 second if there are multiple new messages
    useEffect(() => {
        if (queue.length > 0 && !isDisplaying) {
            setIsDisplaying(true);
            let i = 0;

            const interval = setInterval(() => {
                setStatus(queue[i]);

                if (queue[i] === "App completed") {
                    clearInterval(interval);
                    setQueue([]);
                    setTimeout(() => navigate("/results"), 2000); // Redirect in 2 sec
                    return;
                }

                i++;
                if (i >= queue.length) {
                    clearInterval(interval);
                    setQueue([]); // Empty queue after displaying all messages
                    setIsDisplaying(false);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [queue, isDisplaying, navigate]);
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

