import whitelogo from "../images/tinder_logo_white.png";
import colorlogo from "../images/color-logo-tinder.png";
const Nav = ({ authToken, minimal, showModal, setShowModal, setIsSignUp }) => {
  const handleClick = () => {
    setIsSignUp(false);
    setShowModal(true);
  };
  return (
    <nav className="flex justify-between p-4 md:px-8 lg:px-12">
      <div className="flex flex-col justify-center">
        <img
          className="w-36"
          src={minimal ? colorlogo : whitelogo}
          alt="Tinder Clone"
        />
      </div>
      {!authToken && !minimal && (
        <button
          className="btn-light"
          onClick={handleClick}
          disabled={showModal}
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Nav;
