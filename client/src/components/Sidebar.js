import { MdOutlineSwipe } from "react-icons/md";
import { BsPeople, BsDoorOpen } from "react-icons/bs";
import { BiChat, BiUserCircle } from "react-icons/bi";
import { GoFlame } from "react-icons/go";
import logo from "../images/color-logo-tinder.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useStateContext } from "../contexts/Context";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { useCookies } from "react-cookie";
import { BiRightArrow } from "react-icons/bi";

const Sidebar = () => {
  const { user, getUser, activeMenuItem, setActiveMenuItem, windowSize } =
    useStateContext();
  const online = false;
  const [isMobile, setIsMobile] = useState(false);
  const [cookies, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    setActiveMenuItem(item);
  };

  useEffect(() => {
    getUser();
    if (windowSize < 850) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowSize]);

  const logout = () => {
    removeCookie("UserId");
    removeCookie("AuthToken");
    navigate("/");
    window.location.reload();
  };

  const menuShowState = !isMobile ? "flex" : "hidden";
  const menuMobileMenu = isMobile ? "flex" : "hidden";

  const menuItems = [
    {
      title: "Discover",
      link: "/dashboard",
      icon: <MdOutlineSwipe />,
    },
    {
      title: "Matches",
      link: "/matches",
      icon: <BsPeople />,
    },
    {
      title: "Chat",
      link: "/chat",
      icon: <BiChat />,
    },
    {
      title: "Profile",
      link: `/profile/${user?.user_id}`,
      icon: <BiUserCircle />,
    },
  ];

  const constraintRef = useRef(null);

  return (
    <>
      <motion.div
        className={`fixed bottom-2 left-2 right-2 justify-center z-[100] ${menuMobileMenu}`}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
      >
        <div className="flex gap-3 py-2 px-4 justify-center bg-pink-600 shadow-xl rounded-2xl mx-auto w-auto">
          {menuItems.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              onClick={() => handleMenuClick(item.link)}
            >
              <div
                className={
                  activeMenuItem === item.link
                    ? `sidebar-link-mobile group active`
                    : `sidebar-link-mobile group`
                }
              >
                <div className="sidebar-link-mobile-icon">{item.icon}</div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* laptop */}
      <div
        className={`${menuShowState} flex-col py-2 px-6 justify-start h-screen pb-12 md:pb-4 fixed md:relative top-0 z-30 w-full md:w-[320px] lg:w-[30%] bg-pink-50 md:bg-transparent`}
      >
        <img src={logo} alt="Tinder Clone" className="w-32 my-3 mx-auto" />

        {!user ? (
          <Loading height="h-[150px]" />
        ) : (
          <>
            <div className="mt-8 flex flex-col  justify-center">
              <div className="text-center mx-auto">
                <img
                  src={user && user.url1}
                  alt="profile pic"
                  className="rounded-xl h-[150px] mb-2"
                />
              </div>
              <p className="font-bold text-xl capitalize text-center mb-4">
                {user && user.first_name}
              </p>
              <div className="flex flex-col gap-1 justify-center max-w-1/2 md:w-auto mx-auto">
                <div className="text-gray-500 flex gap-1">
                  <BiRightArrow size={14} className="mt-1 text-pink-700/40" />
                  <p>Gender: </p>
                  <span className="font-semibold text-gray-700">
                    {user?.gender_identity}
                  </span>
                </div>
                <div className="text-gray-500 flex gap-1">
                  <BiRightArrow size={14} className="mt-1 text-pink-700/40" />
                  <p>Looking for: </p>
                  <span className="font-semibold text-gray-700">
                    {user?.gender_interest}
                  </span>
                </div>
                <div className="text-gray-500 flex gap-1">
                  <BiRightArrow size={14} className="mt-1 text-pink-700/40" />
                  <p>Status: </p>
                  <span
                    className={
                      online
                        ? "text-green-600 flex gap-1"
                        : "text-red-600 flex gap-1"
                    }
                  >
                    <GoFlame
                      alt={online ? "Online" : "Offline"}
                      className="mt-1"
                    />
                    {online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 flex flex-col border-t-2 border-gray-200 mx-auto md:mx-3 min-w-[200px]">
              {menuItems.map((item, index) => (
                <Link
                  to={item.link}
                  key={index}
                  onClick={() => {
                    handleMenuClick(item.link);
                  }}
                >
                  <div
                    className={
                      activeMenuItem === item.link
                        ? `sidebar-link group active`
                        : `sidebar-link group`
                    }
                  >
                    <div className="sidebar-link-icon">{item.icon}</div>
                    <p>{item.title}</p>
                  </div>
                </Link>
              ))}
              <div
                className="sidebar-link group cursor-pointer"
                onClick={logout}
              >
                <div className="sidebar-link-icon">
                  <BsDoorOpen />
                </div>
                <p>SignOut</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Sidebar;
