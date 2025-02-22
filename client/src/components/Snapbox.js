import React, { useState } from "react";
import axios from "axios";

function Snapbox() {

  const [originalUrl, setOriginalUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [analytics, setAnalytics] = useState([])

  const generateShortUrl = async() => {
    try{
      const response = await axios.post(
        "http://localhost:8000/api/url/shorten",
        { originalUrl: originalUrl },  
        { headers: { 
          "Content-Type": "application/json",  
          Authorization: localStorage.getItem("token") }
        })
      setShortUrl(response.data.shortUrl)
    }
    catch(error) {
      console.log("Error generating short URL!", error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/url/analytics/${shortUrl}`,
        { headers: { Authorization: localStorage.getItem("token") },}
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
                href={`http://localhost:8000/api/url/${shortUrl}`}
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
                <li key={index}>{new Date(visit.timestamp).toLocaleString()}</li>
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
