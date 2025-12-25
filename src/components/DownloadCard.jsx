import { useState } from "react";
import axios from "axios";

export default function DownloadCard() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [status, setStatus] = useState("idle"); // idle | downloading | success | failed

  const API = import.meta.env.backend;

  const handleDownload = async () => {
    if (!url) return;
    setStatus("downloading");

    try {
      const response = await axios.post(
        API,
        { url, format },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = format === "mp4" ? "video.mp4" : "audio.mp3";
      link.click();

      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      console.error("Download failed", err);
      setStatus("failed");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "downloading":
        return "Downloading...";
      case "success":
        return "Saved Successfully";
      case "failed":
        return "Failed";
      default:
        return "Download";
    }
  };

  const getButtonColor = () => {
    switch (status) {
      case "downloading":
        return "#bfa76a"; // muted gold
      case "success":
        return "#38a169"; // green for success
      case "failed":
        return "#e74c3c"; // red
      default:
        return "#d4a937"; // gold idle
    }
  };

  const isUrlValid = (url) => {
    return url.startsWith("http");
  };

  return (
    <div
      className="max-w-md mx-auto mt-24 p-6 rounded-2xl shadow-lg"
      style={{ backgroundColor: "#f5f0e1" }} // beige card
    >
      {/* Heading */}
      <h3
        className="text-xl font-serif font-semibold mb-6 text-center"
        style={{ color: "#8b5e3c" }} // brown
      >
        Enter YouTube URL
      </h3>

      {/* URL Input */}
      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-4 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#bfa76a]"
        style={{ backgroundColor: "#fff8f0", color: "#3b2f2f", fontSize: "16px" }}
      />

      {/* Format Buttons */}
      <div className="flex gap-2 mb-6">
        {["mp4", "mp3"].map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className="flex-1 p-3 rounded-xl font-semibold transition-all"
            style={{
              backgroundColor: format === f ? "#8b5e3c" : "#f5f0e1",
              color: format === f ? "#f5f0e1" : "#8b5e3c",
              border: "1px solid #8b5e3c",
              cursor: status === "downloading" ? "not-allowed" : "pointer",
              fontSize: "16px",
            }}
            disabled={status === "downloading"}
          >
            {f === "mp4" ? "Video (MP4)" : "Audio (MP3)"}
          </button>
        ))}
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={status === "downloading" || !isUrlValid(url)}
        className="w-full p-4 rounded-xl font-semibold text-white text-lg transition-transform hover:scale-105"
        style={{
          backgroundColor: getButtonColor(),
          cursor:
            status === "downloading" || !isUrlValid(url)
              ? "not-allowed"
              : "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {getButtonText()}
      </button>
    </div>
  );
}
