import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-500">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome</h1>
                <p className="text-lg text-gray-600 mb-6">We're glad to have you here. Let's get started!</p>
                <button
                    className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-blue-700"
                    onClick={() => navigate('/input')}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default StartPage;
