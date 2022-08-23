import { createContext, useContext, useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import axios from "axios";

const StateContext = createContext();

export const Context = ({ children }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [user, setUser] = useState(null);
  const [matchedUserIds, setMatchedUserIds] = useState(null);
  const [windowSize, setWindowSize] = useState(undefined);
  const [networkError, setNetworkError] = useState(false);
  const [isChatInMobile, setIsChatInMobile] = useState(false);

  const [cookies] = useCookies(["user"]);
  const userId = cookies.UserId;
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        setNetworkError("Connection lost! Please check your internet.");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    const handleWinResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleWinResize);
    handleWinResize();
  }, []);

  return (
    <StateContext.Provider
      value={{
        activeMenuItem,
        setActiveMenuItem,
        user,
        setUser,
        matchedUserIds,
        setMatchedUserIds,
        getUser,
        windowSize,
        setWindowSize,
        isChatInMobile,
        setIsChatInMobile,
        networkError,
        setNetworkError,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
