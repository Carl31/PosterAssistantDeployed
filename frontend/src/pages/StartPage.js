import React from "react";
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';


const StartPage = () => {
    const navigate = useNavigate();

    return (

        <Layout>
            <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                Create your own poster with
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                    AI
                </span>
            </h1>
            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
                Welcome! We're thrilled to have you here.
            </p>


            <div className=" pt-4 flex justify-center items-center">
                <button
                    className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    type="button"
                    onClick={() => navigate('/output')}
                >
                    Start
                </button>
            </div>
        </Layout>
    );
};

export default StartPage;
