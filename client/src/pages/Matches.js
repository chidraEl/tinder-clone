import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import NoMaches from "../components/Alerts/NoMaches";
import Loading from "../components/Loading";
import { useStateContext } from "../contexts/Context";

const Matches = () => {
  const { user, getUser } = useStateContext();
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies] = useCookies(null);
  const userId = cookies.UserId;

  const getMatches = async () => {
    const matchedIds = user.matches?.map(({ user_id }) => user_id);
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedIds) },
      });
      setMatchedProfiles(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getMatches();
    }
  }, [user]);

  const filterMatchedBackProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter((profile) => profile.user_id === userId)
        .length > 0
  );

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold">Your Matches</h2>
        {filterMatchedBackProfiles ? (
          <div className="mt-10">
            <p className="text-gray-500">
              You have liked{" "}
              <span className="text-pink-600 font-bold">
                {matchedProfiles?.length}
              </span>{" "}
              profiles, and you have matched with{" "}
              <span className="text-pink-600 font-bold">
                {filterMatchedBackProfiles?.length}
              </span>
              .
            </p>
            {filterMatchedBackProfiles.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-6">
                {filterMatchedBackProfiles?.map((person) => (
                  <Link to={`/profile/${person.user_id}`}>
                    <div
                      key={person?._id}
                      className="group relative shadow-lg rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 hover:rounded-3xl duration-150 cursor-pointer"
                    >
                      <img
                        src={person?.url1}
                        alt={person?.first_name + " profile"}
                        className="max-h-[300px] group-hover:scale-[1.2] duration-300"
                      />
                      <div className="absolute bottom-0 w-full text-white p-3 group-hover:py-5 bg-gradient-to-b from-transparent to-black/70 group-hover:to-black duration-300">
                        <p className="text-center text-xl font-semibold drop-shadow-xl">
                          {person?.first_name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <NoMaches
                emoji=""
                message="Keep swiping profile until your get a match!"
              />
            )}
          </div>
        ) : (
          <Loading height="h-full" />
        )}
      </div>
    </>
  );
};
export default Matches;
