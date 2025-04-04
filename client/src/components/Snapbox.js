import React, { useState } from "react";
import axios from "axios";

function Snapbox() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [analytics, setAnalytics] = useState([]);

  // Fetching the base URL from the environment variable
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Function to generate short URL
  const generateShortUrl = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/url/shorten`,  // Use environment variable for API URL
        { originalUrl: originalUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.log("Error generating short URL!", error);
    }
  };

  // Function to fetch analytics for the shortened URL
  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}api/url/analytics/${shortUrl}`,  // Use environment variable for API URL
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setAnalytics(response.data.visits);
    } catch (error) {
      console.error("Error fetching analytics", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">SnapURL</h2>
        <div className="card p-4 shadow">
          <div className="mb-3">
            <label htmlFor="originalUrl" className="form-label">
              Enter Original URL:
            </label>
            <input
              type="text"
              id="originalUrl"
              className="form-control"
              placeholder="https://example.com"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={generateShortUrl}>
            Generate Short URL
          </button>

          {shortUrl && (
            <div className="mt-3 text-center">
              <p>
                Short URL:{" "}
                <a
                  href={`${API_BASE_URL}/api/url/${shortUrl}`} // Use environment variable for link
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortUrl}
                </a>
              </p>
              <button
                className="btn btn-secondary mt-2"
                onClick={fetchAnalytics}
              >
                View Analytics
              </button>
            </div>
          )}

          {analytics.length > 0 && (
            <div className="mt-3">
              <h5>Visit Analytics:</h5>
              <ul>
                {analytics.map((visit, index) => (
                  <li key={index}>
                    {new Date(visit.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Snapbox;
