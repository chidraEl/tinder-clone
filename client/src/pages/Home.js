import Nav from "../components/Nav";
import { useState } from "react";
import AuthModal from "../components/AuthModal";
import { useNavigate } from "react-router-dom";
const Home = ({ authToken }) => {
  const navigate = useNavigate();
  if (authToken) navigate("/dashboard");
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignUp] = useState(true);

  const minimal = false;
  const handleClick = () => {
    setIsSignUp(true);
    setShowModal(true);
  };

  return (
    <div
      className={
        minimal
          ? `home-background bg-gray-50 h-screen w-full `
          : "home-background bg-pink-800 h-screen dark w-full "
      }
    >
      <div className="overlay">
        <Nav
          authToken={authToken}
          minimal={minimal}
          showModal={showModal}
          setShowModal={setShowModal}
          setIsSignUp={setIsSignUp}
        />
        <div className="flex justify-center flex-col mt-[30vh]">
          <div className="text-center">
            <h1 className="text-5xl md:text-8xl lg:text-10xl font-extrabold mb-16 md:mb-24 drop-shadow-xl dark:text-white">
              Swipe Right
            </h1>
            <button className="btn-primary shadow-lg" onClick={handleClick}>
              Create an account
            </button>
          </div>
        </div>

        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignup={isSignup} />
        )}
      </div>
    </div>
  );
};
export default Home;
