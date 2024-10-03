import React, { useState } from "react";
import axios from "axios";

function App() {
    const [originalURL, setOriginalURL] = useState("");
    const [shortenedURL, setShortenedURL] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/shorten", {
                original_url: originalURL,
            });
            setShortenedURL(response.data.short_url);
            setError(null);
        } catch (err) {
            setError("Failed to shorten URL. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter URL"
                        value={originalURL}
                        onChange={(e) => setOriginalURL(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Shorten URL
                    </button>
                </form>

                {shortenedURL && (
                    <div className="mt-4 text-center">
                        <p className="text-green-500">Shortened URL:</p>
                        <a
                            href={shortenedURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                        >
                            {shortenedURL}
                        </a>
                    </div>
                )}

                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
}

export default App;
