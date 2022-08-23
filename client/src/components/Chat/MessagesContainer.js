import React, { useState, useEffect } from "react";
import Input from "./Input";
import axios from "axios";
import ChatMessagesInfo from "./ChatMessagesInfo";
import Loading from "../Loading";
import ChatMessages from "./ChatMessages";

const MessagesContainer = ({
  user,
  clickedUser,
  status,
  setChatTabOpen,
  isMobile,
  showLoading,
  setShowLoading,
}) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [userMessages, setUserMessages] = useState(null);

  const listVisible = !status && isMobile ? "hidden" : "";

  const getUserMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: {
          userId: userId,
          correspondingUserId: clickedUserId,
        },
      });
      setUserMessages(response.data);
      setShowLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`${listVisible} h-full w-full flex justify-between flex-col relative`}
    >
      <div
        className={`${
          !showLoading ? "hidden" : ""
        } absolute top-0 left-0 bg-white h-full w-full z-50 flex justify-center flex-col text-center`}
      >
        <Loading />
      </div>
      {clickedUser ? (
        <>
          <ChatMessages
            clickedUser={clickedUser}
            userMessages={userMessages}
            setUserMessages={setUserMessages}
            user={user}
            setChatTabOpen={setChatTabOpen}
            isMobile={isMobile}
            setShowLoading={setShowLoading}
            getUserMessages={getUserMessages}
          />
          <div className="h-[12vh] min-h-[50px] w-full flex justify-end flex-col">
            <Input
              to_userId={clickedUserId}
              userId={userId}
              getUserMessages={getUserMessages}
            />
          </div>
        </>
      ) : (
        <ChatMessagesInfo message="Click on a user to start chating." />
      )}
    </div>
  );
};

export default MessagesContainer;
