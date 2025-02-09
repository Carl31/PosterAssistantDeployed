import React from "react";
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';


const OutputPage = () => {
    const navigate = useNavigate();
    const [links, setLinks] = useState([]);
    const location = useLocation();
    const posterLinks = location.posterLinks;
    console.log("test:" + posterLinks);

    useEffect(() => {
        if (posterLinks && posterLinks.output) {
            setLinks([
                posterLinks.output.poster,
                posterLinks.output.lightMockup,
                posterLinks.output.darkMockup
            ]);
        }
    }, [posterLinks]); // Re-run if posterLinks changes

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

            <div className="pt-4 flex flex-col items-center gap-4">
                {/* First two buttons inside the same div */}
                <div className="flex justify-center gap-2">
                    {location.posterLinks}
                </div>
            </div>


            <div className="pt-4 flex flex-col items-center gap-4">
                {/* First two buttons inside the same div */}
                <div className="flex justify-center gap-2">
                    <a href={links[0]} target="_blank" rel="noopener noreferrer">
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            View Poster
                        </button>
                    </a>

                    <a href={links[1]} target="_blank" rel="noopener noreferrer">
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            View Light Mockup
                        </button>
                    </a>
                </div>

                {/* Third button in a separate div */}
                <div className="flex justify-center">
                    <a href={links[2]} target="_blank" rel="noopener noreferrer">
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-teal-800 via-teal-700 to-teal-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            View Dark Mockup
                        </button>
                    </a>
                </div>
            </div>
        </Layout>
    );
};

export default OutputPage;

// transform transition hover:scale-105 duration-300 ease-in-out