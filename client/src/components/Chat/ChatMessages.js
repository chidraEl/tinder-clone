import React, { useEffect } from "react";
import ChatMessagesInfo from "./ChatMessagesInfo";
import { FaArrowLeft } from "react-icons/fa";
import { useStateContext } from "../../contexts/Context";

const ChatMessages = ({
  clickedUser,
  user,
  setChatTabOpen,
  isMobile,
  userMessages,
  getUserMessages,
}) => {
  const { setIsChatInMobile } = useStateContext();
  const messages = [];
  const userId = user.user_id;

  useEffect(() => {
    getUserMessages();
  }, [clickedUser]);

  const sortMessages = userMessages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  sortMessages?.forEach((message) => {
    const formated = {};
    if (message.from_userId === userId) {
      formated["name"] = user.first_name;
      formated["img"] = user.url1;
      formated["direction"] = "right";
    } else {
      formated["name"] = clickedUser.first_name;
      formated["img"] = clickedUser.url1;
      formated["direction"] = "left";
    }
    formated["message"] = message.message;
    formated["timestamp"] = message.timestamp;
    messages.push(formated);
  });

  const handleReturnClick = () => {
    setChatTabOpen("list");
    setIsChatInMobile(false);
  };

  return (
    <>
      <div className={`${!isMobile ? "hidden" : ""} bg-gray-50`}>
        <button
          onClick={handleReturnClick}
          className="text-xl py-4 px-6 text-gray-400"
        >
          <FaArrowLeft />
        </button>
      </div>
      {messages.length ? (
        <div className="h-[88vh] p-3 w-full flex flex-col overflow-y-auto">
          {messages?.map((message, index) => (
            <div className="w-full" key={index}>
              <div
                className={
                  message.direction === "right"
                    ? "chat-message right group"
                    : "chat-message left group"
                }
              >
                <div className="">
                  <p className="text-sm mt-[2px]">{message.message}</p>
                </div>
                <div className="chat-time group-hover:opacity-100">
                  <p>{message.timestamp.substr(11, 5)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ChatMessagesInfo
          message={`Start chating with ${clickedUser.first_name} now!`}
        />
      )}
    </>
  );
};

export default ChatMessages;
