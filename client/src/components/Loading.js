import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = ({ height }) => {
  return (
    <div
      className={`w-full ${height} flex justify-center flex-col p-4 text-center`}
    >
      <AiOutlineLoading3Quarters className="animate-spin text-4xl text-pink-500 mx-auto" />
    </div>
  );
};

export default Loading;
