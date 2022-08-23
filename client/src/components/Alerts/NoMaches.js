import { IoMdDoneAll } from "react-icons/io";
import { MdOutlineSwipe } from "react-icons/md";

const NoMaches = ({ message, emoji }) => {
  return (
    <div className="my-20 mx-auto text-center h-full flex flex-col justify-center">
      <>
        <MdOutlineSwipe size={68} className="mb-6 mx-auto text-pink-500" />
        <p className="text-lg font-semibold text-center text-gray-600">
          {message}
        </p>
      </>
    </div>
  );
};

export default NoMaches;
