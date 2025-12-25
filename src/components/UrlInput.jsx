const UrlInput = ({ value, onChange, error }) => {
  return (
    <input
      type="text"
      placeholder="Paste YouTube or Shorts link"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full px-5 py-3 rounded-2xl text-sm
        bg-[#faf7f2] border
        ${error ? "border-[#9f3a38]" : "border-[#e6dfd5]"}
        focus:outline-none focus:ring-2 focus:ring-[#c8a24d]/40
        transition-all
      `}
    />
  );
};

export default UrlInput;
