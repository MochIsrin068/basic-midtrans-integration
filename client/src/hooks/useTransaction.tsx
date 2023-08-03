/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";

export default function useTransaction() {
  const { API_URL, VITE_MIDRANTS_CLIENT_KEY } = import.meta.env.VITE_API_URL;

  const [userData, setUserData] = useState({
    name: "",
    orderId: "",
    amount: 0,
  });

  const [uiType, setUiType] = useState("modal");
  const [token, setToken] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeUserData = (even: any, key: string) => {
    const value = even?.target?.value;
    setUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const onChangeUIType = () =>
    uiType === "modal" ? setUiType("embed") : setUiType("modal");

  const onProccessTransaction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${API_URL}/api/payment/process-transaction`,
      userData,
      config
    );

    setToken(response?.data?.token);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w: any = window;
    if (token && w) {
      // embed
      if (uiType === "embed") {
        // just example to show embeded not include handling response
        w?.snap.embed(token, {
          embedId: "snap-container",
        });
      } else {
        // modal
        w?.snap.pay(token, {
          onSuccess: (result: any) => {
            localStorage.setItem("Pembayaran", JSON.stringify(result));
            setToken("");
          },
          onPending: (result: any) => {
            localStorage.setItem("Pembayaran", JSON.stringify(result));
            setToken("");
          },
          onError: (error: any) => {
            console.log(error);
            setToken("");
          },
          onClose: () => {
            console.log("and belum memeyelasikan pembayaran");
            setToken("");
          },
        });

        setUserData({
          name: "",
          orderId: "",
          amount: 0,
        });
      }
    }
  }, [token, uiType]);

  useEffect(() => {
    const midtransURL = "https://app.sandbox.midtrans.com/snap/snap.js";

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransURL;

    const midtransClientKey = VITE_MIDRANTS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return {
    userData,
    uiType,
    onChangeUserData,
    onChangeUIType,
    onProccessTransaction,
  };
}
