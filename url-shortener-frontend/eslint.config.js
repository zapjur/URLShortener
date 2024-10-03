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
      <div style={styles.container}>
        <h1>URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Enter URL"
              value={originalURL}
              onChange={(e) => setOriginalURL(e.target.value)}
              style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Shorten URL
          </button>
        </form>

        {shortenedURL && (
            <div style={styles.result}>
              <p>Shortened URL:</p>
              <a href={shortenedURL} target="_blank" rel="noopener noreferrer">
                {shortenedURL}
              </a>
            </div>
        )}

        {error && <p style={styles.error}>{error}</p>}
      </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "300px",
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
  },
  error: {
    color: "red",
    marginTop: "20px",
  },
};

export default App;
