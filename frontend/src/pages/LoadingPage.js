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
        let lastMessageTimestamp = 0; // Tracks last update time
      
        const fetchProgress = async () => {
          try {
            const response = await axios.get(`${apiUrl}/progress`);
            const { messages, timestamp } = response.data; // Backend should return { messages: [...], timestamp: X }
      
            if (timestamp > lastMessageTimestamp) {
              lastMessageTimestamp = timestamp; // Update last seen timestamp
              if (messages.length > 0) {
                setQueue(messages); // Add new messages
              }
            }
      
            // Stop polling if "App completed" is in messages
            // if (messages.includes("App completed")) {
            //   clearInterval(progressInterval);
            //   return;
            // }
      
          } catch (error) {
            console.error("Error fetching progress updates:", error);
          }
        };
      
        const progressInterval = setInterval(fetchProgress, 10000); // Poll every 10 sec
      
        return () => clearInterval(progressInterval); // Cleanup
      }, []);

      useEffect(() => {
        if (!isDisplaying && queue.length > 0) {
          setIsDisplaying(true);
      
          const displayMessages = async () => {
            for (const message of queue) {
              setStatus(message); // Update UI with the current message
              await new Promise((resolve) => setTimeout(resolve, 3000)); // Show each message for 1 sec
              if (message.localeCompare("App completed") == 0) {
                navigate(`/display`);
              }
            }
      
            setQueue([]); // Clear queue after displaying messages
            setIsDisplaying(false); // Allow next batch to process
          };
      
          displayMessages();
        }
      }, [queue, isDisplaying]);
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

