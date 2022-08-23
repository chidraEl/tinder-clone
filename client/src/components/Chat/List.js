import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useStateContext } from "../../contexts/Context";
import Loading from "../Loading";
import ListUsers from "./ListUsers";

const ChatsList = ({
  matchedUsers,
  clickedUser,
  setClickedUser,
  status,
  setChatTabOpen,
  isMobile,
  setShowLoading,
}) => {
  const { setIsChatInMobile, user } = useStateContext();
  const [searchUsersInput, setSearchUsersInput] = useState("");
  const listWidth = status && isMobile ? "w-full" : "w-[40%]";
  const listVisible = !status && isMobile ? "hidden" : "";
  const userId = user?.user_id;

  const handleChatListClick = (user) => {
    setClickedUser(user);
    setChatTabOpen("messages");
    setIsChatInMobile(isMobile ? true : false);
    setShowLoading(true);
  };

  const filterMatchedBackProfiles = matchedUsers?.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter((profile) => profile.user_id === userId)
        .length > 0
  );

  return (
    <div
      className={`h-full ${listWidth} ${listVisible} max-w-full min-w-[250px] py-3 bg-gray-50 overflow-hidden`}
    >
      <div className="px-3">
        <h2 className="font-bold text-2xl mb-6">Chats</h2>
        <div className="flex justify-center gap-2">
          <button className="py-2 px-4 font-semibold border-b-2 border-pink-700 hover:bg-pink-50">
            All
          </button>
          <button className="py-2 px-4 font-semibold hover:bg-pink-50">
            Active
          </button>
        </div>

        <div className="my-3 relative flex">
          <BsSearch className="absolute top-3 left-2 text-gray-300 " />
          <input
            type="text"
            value={searchUsersInput}
            onChange={(e) => setSearchUsersInput(e.target.value)}
            placeholder="Search.."
            className="input py-2 pl-8"
          />
        </div>
      </div>

      {matchedUsers ? (
        <ListUsers
          matchedUsers={filterMatchedBackProfiles}
          handleChatListClick={handleChatListClick}
          clickedUser={clickedUser}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ChatsList;
