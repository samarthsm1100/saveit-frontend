const DownloadButton = ({ onClick, loading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        w-full py-3 rounded-2xl text-sm font-semibold
        bg-[#3b2f2f] text-white
        hover:bg-[#2e2323]
        disabled:opacity-40
        transition-all
      "
    >
      {loading ? "Saving peacefully…" : "Save Video"}
    </button>
  );
};

export default DownloadButton;