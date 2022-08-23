import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import Chat from "./pages/Chat";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import { useStateContext } from "./contexts/Context";
import { useCookies } from "react-cookie";
import { GoAlert } from "react-icons/go";

const App = () => {
  const {
    activeMenuItem,
    setActiveMenuItem,
    user,
    networkError,
    setNetworkError,
  } = useStateContext();

  const [cookies, setCookie] = useCookies(["user"]);
  useEffect(() => {
    setActiveMenuItem(window.location.pathname);
  }, []);
  const authToken = cookies.AuthToken;

  const NetworkErrorRetry = () => {
    window.location.reload();
  };

  return (
    <>
      <BrowserRouter>
        <div className="w-full h-full flex flex-col md:flex-row overflow-x-hidden bg-pink-50">
          {authToken &&
            activeMenuItem !== "/" &&
            activeMenuItem !== "/onboarding" && <Sidebar />}
          <div
            className={`h-screen w-full flex justify-center flex-col ${
              activeMenuItem !== "/" && activeMenuItem !== "/onboarding"
                ? "lg:pt-3 md:pt-1"
                : ""
            }`}
          >
            <div className="h-full w-full overflow-x-hidden bg-white md:rounded-2xl md:rounded-bl-none md:shadow-lg pb-16 md:pb-0">
              <Routes>
                <Route path={"/"} element={<Home authToken={authToken} />} />
                <Route path={"/onboarding"} element={<OnBoarding />} />
                {authToken && (
                  <Route path={"/dashboard"} element={<Dashboard />} />
                )}
                {authToken && <Route path={"/chat"} element={<Chat />} />}
                {authToken && <Route path={"/matches"} element={<Matches />} />}
                {authToken && (
                  <Route path={"/profile/:id"} element={<Profile />} />
                )}
              </Routes>
            </div>
          </div>
          {networkError && (
            <div className="fixed bottom-0 left-0 bg-pink-600 w-screen h-screen flex justify-center flex-col z-[100]">
              <div className="flex flex-col gap-8 mx-auto py-4 px-8 rounded-xl text-white text-center">
                <GoAlert size={56} className="mx-auto" />
                {networkError}
                <div>
                  <button
                    className="bg-white px-12 py-2 rounded-full text-pink-700"
                    onClick={NetworkErrorRetry}
                  >
                    Retry again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
