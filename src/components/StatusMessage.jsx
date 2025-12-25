const StatusMessage = ({ status }) => {
  if (!status) return null;

  if (status.type === "loading") {
    return (
      <div className="space-y-1">
        <p className="text-sm text-center text-[#7a6f68]">Downloading... {status.progress || 0}%</p>
        <div className="w-full h-2 bg-[#e6dfd5] rounded-xl">
          <div
            className="h-2 bg-[#c8a24d] rounded-xl transition-all"
            style={{ width: `${status.progress || 0}%` }}
          />
        </div>
      </div>
    );
  }

  const colors = {
    success: "bg-[#edf4ef] text-[#5b7f6a]",
    error: "bg-[#f6eaea] text-[#9f3a38]",
  };

  return (
    <p className={`text-sm text-center px-4 py-2 rounded-xl ${colors[status.type]}`}>
      {status.message || (status.type === "success" ? "Saved successfully" : "")}
    </p>
  );
};

export default StatusMessage;