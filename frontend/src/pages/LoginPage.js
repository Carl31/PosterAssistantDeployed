import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password); // Call the login function passed from App.js
    };

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

            <form onSubmit={handleSubmit} className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-blue-300 py-2 font-bold mb-2">
                        Log in to continue.
                    </label>
                    <input
                        className=" mb-4 shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        id="emailaddress"
                        type="text"
                        placeholder="you@somewhere.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        type="text"
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center justify-between pt-4">
                    <button
                        className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        type="submit"
                    >
                        Log in
                    </button>
                </div>
            </form>
        </Layout>

    );
};

export default LoginPage;
