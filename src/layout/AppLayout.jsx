const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf7f2] to-[#f3ede4] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-10">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
