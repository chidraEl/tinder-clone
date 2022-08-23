import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { AiOutlineUnlock, AiFillInfoCircle } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AuthModal = ({ setShowModal, isSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [btnContent, setBtnContent] = useState(
    isSignup ? "Create your account" : "Login"
  );
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const loading = (
    <AiOutlineLoading3Quarters className="animate-spin mx-auto text-2xl" />
  );

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnContent(loading);
    setSubmitDisabled(true);
    try {
      if (isSignup && password !== confirmPassword) {
        setError("Password and confirm password must match!");
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/${isSignup ? "signup" : "login"}`,
        {
          email,
          password,
        }
      );

      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.userId);

      const success = response.status === 201;

      if (success && isSignup) navigate("/onboarding");
      if (success && !isSignup) {
        navigate("/dashboard");
        window.location.reload();
      }

      if (response.status === 400) {
        setError(response.data);
      }
    } catch (error) {
      setError(error.response.data);
    }
    setBtnContent(isSignup ? "Create your account" : "Login");
    setSubmitDisabled(false);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center flex-col bg-black/40 z-100">
      <div className="mx-auto p-12 bg-white shadow-2xl shadow-black/40 md:rounded-2xl h-screen w-screen md:h-auto md:w-[460px]">
        <div className="flex justify-between w-full mb-10">
          <p className="font-bold text-2xl text-gray-600 uppercase">
            {isSignup ? "Create an account" : "Login"}
          </p>
          <button
            onClick={handleClick}
            className="text-2xl text-pink-500 hover:bg-pink-100 rounded-full p-2 -translate-y-1 hover:text-pink-700 duration-300"
          >
            <CgClose />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field-container icon">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required={true}
              className="input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>
              <MdOutlineAlternateEmail />
            </span>
          </div>
          <div className="field-container icon">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required={true}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>
              <AiOutlineUnlock />
            </span>
          </div>
          {isSignup && (
            <div className="field-container icon">
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirm your email"
                required={true}
                className="input"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span>
                <AiOutlineUnlock />
              </span>
            </div>
          )}

          {error !== null && (
            <div className="text-red-600 p-2 flex gap-1 text-lg">
              <AiFillInfoCircle className="mt-1" size={24} />
              <p>{error}</p>
            </div>
          )}

          <p className="text-sm text-gray-700 mt-10">
            By clicking {isSignup ? "Create an account" : "Login"}, you agree to
            our terms. Learn how we process your data in our Privacy Policy and
            Cookie Policy.
          </p>
          <div className="field-container mt-4 text-center">
            <button
              type="submit"
              className="btn-primary-outline w-full"
              disabled={submitDisabled}
            >
              {btnContent}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AuthModal;
