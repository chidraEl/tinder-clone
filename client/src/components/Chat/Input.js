import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";

const ChatInput = ({ userId, to_userId, getUserMessages }) => {
  const [textarea, setTextarea] = useState("");
  const [sendBtnDisabled, setSendBtnDisabled] = useState(false);
  const loading = (
    <AiOutlineLoading3Quarters className="animate-spin mx-auto text-2xl" />
  );
  const sendIcon = <FiChevronRight className="text-2xl" />;
  const [sendBtnText, setSendBtnText] = useState(sendIcon);

  const handleSend = async () => {
    setSendBtnText(loading);
    setSendBtnDisabled(true);

    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: to_userId,
      message: textarea,
    };

    try {
      await axios.post("http://localhost:8000/message", { message });
      getUserMessages();
      setTextarea("");
    } catch (err) {
      console.log(err);
    }
    setSendBtnText(sendIcon);
    setSendBtnDisabled(false);
  };

  return (
    <div className="relative flex border-2 border-gray-200 rounded-2xl m-3">
      <textarea
        type="text"
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
        placeholder="Type.."
        rows={2}
        className="input p-3 min-h-[40px] max-h-[12vh] pr-10 border-none rounded-tl-2xl rounded-bl-2xl"
      />
      <button
        className="absolute z-10 bg-pink-100 top-0 p-3 right-0 cursor-pointer text-pink-700 hover:bg-pink-300 h-full rounded-tr-2xl rounded-br-2xl"
        onClick={handleSend}
        disabled={sendBtnDisabled}
      >
        {sendBtnText}
      </button>
    </div>
  );
};

export default ChatInput;
