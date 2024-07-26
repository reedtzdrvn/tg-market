const DarkButton = ({ text, ...props }) => {
    return (
      <button className="w-full text-white rounded-2xl bg-black flex justify-center items-center" {...props}>{text}</button>
    );
  };
  
  const LightButton = ({ text, ...props }) => {
    return (
      <button className="w-full text-black rounded-2xl border-2 border-black flex justify-center items-center" {...props}>{text}</button>
    );
  };
  
export { DarkButton, LightButton };
  