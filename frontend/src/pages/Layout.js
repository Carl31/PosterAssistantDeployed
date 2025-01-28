import React from "react";
import { useNavigate } from 'react-router-dom';


const Layout = ({ children }) => {

    return (

        <main className="min-h-screen m-0 p-0 leading-normal tracking-normal text-indigo-400 bg-cover bg-fixed bg-[url('header.png')]">
            <div className="p-8 min-h-screen">
                {/* Nav */}
                <div className="w-full container mx-auto">
                    <div className="w-full flex items-center justify-between">
                        <a className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
                            Poster
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">AI</span>

                        </a>

                        <div className="flex w-1/2 justify-end content-center">
                            <a className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#">
                                <svg className="fill-current h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                    <path
                                        d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z"
                                    ></path>
                                </svg>
                            </a>
                            <a
                                className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                            >
                                <svg className="fill-current h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M7.75 2c-3.17 0-5.75 2.58-5.75 5.75v8.5C2 19.42 4.58 22 7.75 22h8.5c3.17 0 5.75-2.58 5.75-5.75v-8.5C22 4.58 19.42 2 16.25 2h-8.5zM12 6.25a5.75 5.75 0 1 1 0 11.5 5.75 5.75 0 0 1 0-11.5zm0 1.5a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5zm6.5-1.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                                </svg>

                            </a>
                        </div>
                    </div>
                </div>

                {/* Main */}
                <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                    {/* Left Col */}
                    <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                        {children}
                    </div>

                    {/* Right Col */}
                    {/* <div className="w-full xl:w-3/5 p-12 overflow-hidden">
                        <img className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" src="macbook.svg" />
                    </div>

                    <div className="mx-auto md:pt-16">
                        <p className="text-blue-400 font-bold pb-8 lg:pb-6 text-center">
                            Download our app:
                        </p>
                        <div className="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
                            <img src="App Store.svg" className="h-12 pr-12 transform hover:scale-125 duration-300 ease-in-out" />
                            <img src="Play Store.svg" className="h-12 transform hover:scale-125 duration-300 ease-in-out" />
                        </div>
                    </div> */}

                    {/* Footer */}
                    <div className="bottom-0 w-full pt-16 pb-6 text-sm text-center fade-in">
                        <a className="text-gray-500 no-underline hover:no-underline" href="#">&copy; Poster App 2025</a>
                        - By Carlos aka SickShotsNz
                        {/* <a class="text-gray-500 no-underline hover:no-underline" href="https://www.tailwindtoolbox.com">TailwindToolbox.com</a> */}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Layout;
