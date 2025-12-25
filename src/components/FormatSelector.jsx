const FormatSelector = ({ format, setFormat }) => {
  return (
    <div className="flex gap-3">
      {["mp4", "mp3"].map((type) => (
        <button
          key={type}
          onClick={() => setFormat(type)}
          className={`
            flex-1 py-2 rounded-2xl text-sm font-medium
            border transition
            ${
              format === type
                ? "bg-[#c8a24d] text-white border-[#c8a24d] shadow-md"
                : "bg-white text-[#3b2f2f] border-[#e6dfd5] hover:bg-[#faf7f2]"
            }
          `}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default FormatSelector;
