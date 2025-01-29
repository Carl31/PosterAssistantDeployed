import { useEffect } from "react";

const Loader = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://cdn.jsdelivr.net/npm/ldrs/dist/auto/tailChase.js";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center items-center h-20">
      <l-tail-chase size="70" speed="1.75" color="#33b8ff"></l-tail-chase>
    </div>
  );
};

export default Loader;
