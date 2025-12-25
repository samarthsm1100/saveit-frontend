import { useState } from "react";
import AppLayout from "./layout/AppLayout";
import Header from "./components/Header";
import DownloadCard from "./components/DownloadCard";
import UrlInput from "./components/UrlInput";
import FormatSelector from "./components/FormatSelector";
import DownloadButton from "./components/DownloadButton";
import StatusMessage from "./components/StatusMessage";
import { isValidYouTubeUrl } from "./utils/validateUrl";
import { downloadFile } from "./utils/downloadHelper";

function App() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(null);

  const handleDownload = () => {
    if (!isValidYouTubeUrl(url)) {
      setError(true);
      setStatus({ type: "error", message: "Please enter a valid YouTube video or short link" });
      return;
    }

    setError(false);
    downloadFile(url, format, setStatus, setLoading, setUrl);
};


  return (
    <AppLayout>
      <Header />

      <DownloadCard>
        <UrlInput
          value={url}
          onChange={(val) => {
            setUrl(val);
            setError(false);
            setStatus(null);
          }}
          error={error}
        />

        <FormatSelector
          format={format}
          setFormat={setFormat}
        />

        <DownloadButton
          onClick={handleDownload}
          loading={loading}
          disabled={!url || loading}
        />

        <StatusMessage status={status} />
      </DownloadCard>
    </AppLayout>
  );
}

export default App;
