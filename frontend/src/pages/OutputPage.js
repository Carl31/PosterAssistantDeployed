import React from "react";
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';


const OutputPage = ({ posterLinks }) => {
    const navigate = useNavigate();

    if (!posterLinks || posterLinks.length < 3) {
        return <p>Invalid poster links provided.</p>;
    }

    return (

        <Layout>
            <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">

                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                    AI
                </span>
                l done!
            </h1>
            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
                Thanks for your patience. Please view your poster below.
            </p>


            <div className="pt-4 flex justify-center items-center">
                <a href={posterLinks[0]} target="_blank" rel="noopener noreferrer">
                    <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => navigate('/input')}
                    >View Poster</button>
                </a>
            </div>

            <div className="pt-4 flex justify-center items-center">
                <a href={posterLinks[1]} target="_blank" rel="noopener noreferrer">
                    <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => navigate('/input')}
                    >View Light Mockup</button>
                </a>

                <a href={posterLinks[2]} target="_blank" rel="noopener noreferrer">
                    <button type="button" class="text-white bg-gradient-to-r from-teal-800 via-teal-700 to-teal-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => navigate('/input')}
                    >View Dark Mockup</button>
                </a>

            </div>

            <div className="pt-12 flex justify-center items-center">
                <button
                    className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    type="button"
                    onClick={() => navigate('/')}
                >
                    Exit
                </button>
            </div>
        </Layout>
    );
};

export default OutputPage;

// transform transition hover:scale-105 duration-300 ease-in-out