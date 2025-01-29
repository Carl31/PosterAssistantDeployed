import Loader from "../components/Loader";
import React from "react";
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const LoadingPage = () => {
    const navigate = useNavigate();

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
            </div>
            
        </Layout>
    );
};

export default LoadingPage;

