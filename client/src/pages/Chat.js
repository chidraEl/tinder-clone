import MessagesContainer from "../components/Chat/MessagesContainer";
import List from "../components/Chat/List";
import { useStateContext } from "../contexts/Context";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
const Chat = () => {
  const { user, windowSize } = useStateContext();
  const [matchedUsers, setMatchedUsers] = useState(null);
  const [clickedUser, setClickedUser] = useState(null);
  const [chatTabOpen, setChatTabOpen] = useState("list");
  const [isMobile, setIsMobile] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const getMatches = async () => {
    const matchesIds = user?.matches.map(({ user_id }) => user_id);
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchesIds) },
      });
      setMatchedUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getMatches();
    }
    if (windowSize < 555) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [user, windowSize]);

  return (
    <div
      className={`${
        isMobile ? "block" : "flex"
      } h-full w-full bg-white md:rounded-2xl overflow-hidden`}
    >
      <List
        matchedUsers={matchedUsers}
        clickedUser={clickedUser}
        setClickedUser={setClickedUser}
        status={chatTabOpen === "list" ? true : false}
        isMobile={isMobile}
        setChatTabOpen={setChatTabOpen}
        setShowLoading={setShowLoading}
      />
      {user ? (
        <MessagesContainer
          clickedUser={clickedUser}
          user={user}
          status={chatTabOpen === "messages" ? true : false}
          isMobile={isMobile}
          setChatTabOpen={setChatTabOpen}
          showLoading={showLoading}
          setShowLoading={setShowLoading}
        />
      ) : (
        <Loading height="h-full" />
      )}
    </div>
  );
};
export default Chat;
