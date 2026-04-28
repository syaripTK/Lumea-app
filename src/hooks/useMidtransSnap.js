import { useEffect } from "react";

const useMidtransSnap = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = import.meta.env.VITE_MIDTRANS_SNAP_URL;
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY,
    );
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useMidtransSnap;
