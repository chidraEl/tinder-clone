import { BiChat } from "react-icons/bi";

const ChatMessagesInfo = ({ message }) => {
  return (
    <div className="my-12 mx-auto text-center h-full flex flex-col justify-center">
      <>
        <BiChat size={62} className="mb-6 mx-auto text-pink-400" />
        <p className="text-lg font-semibold text-center text-gray-600">
          {message}
        </p>
      </>
    </div>
  );
};

export default ChatMessagesInfo;
