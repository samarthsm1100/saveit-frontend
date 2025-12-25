export const downloadFile = async (url, format, setStatus, setLoading, setUrl) => {
  try {
    setLoading(true);
    setStatus({ type: "loading", progress: 0 });

    const response = await fetch("http://localhost:5000/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, format }),
    });

    if (!response.ok) throw new Error("Download failed");

    // Convert response to blob with progress tracking
    const reader = response.body.getReader();
    const contentLength = +response.headers.get("Content-Length");
    let receivedLength = 0;
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      receivedLength += value.length;
      if (contentLength) {
        const progress = Math.round((receivedLength / contentLength) * 100);
        setStatus({ type: "loading", progress });
      }
    }

    const blob = new Blob(chunks);
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;

    // Derive filename
    const title = url.split("v=")[1] || "video";
    a.download = `${title}.${format}`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setStatus({ type: "success" });
    setUrl("");
  } catch (err) {
    console.error(err);
    setStatus({ type: "error", message: "Failed to download" });
  } finally {
    setLoading(false);
  }
};
