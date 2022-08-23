import { AiFillHeart } from "react-icons/ai";
import { IoMdHeartDislike } from "react-icons/io";
import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useStateContext } from "../contexts/Context";
import Loading from "../components/Loading";
import NoMaches from "../components/Alerts/NoMaches";
const Dashboard = () => {
  const { user, getUser } = useStateContext();
  const [cookies] = useCookies(["user"]);
  const [genderedUsers, setGenderedUsers] = useState();
  const userId = cookies.UserId;
  const [lastDirection, setLastDirection] = useState();

  const getGenderUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/gendered-users", {
        params: { gender: user?.gender_interest },
      });
      setGenderedUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getGenderUsers();
    }
  }, [user]);

  const swiped = (direction, matchedUserId) => {
    setLastDirection(direction);
    if (direction === "right") {
      updateUserMatches(matchedUserId);
    }
    addSwipeAnimation(direction);
  };

  const updateUserMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:8000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  const addSwipeAnimation = (direction) => {
    let like_element = document.querySelector(".like-icon").classList;
    let deslike_element = document.querySelector(".deslike-icon").classList;
    if (direction === "left") {
      deslike_element.add("animate-swipe");
    } else {
      like_element.add("animate-swipe");
    }
    setTimeout(() => {
      like_element.remove("animate-swipe");
      deslike_element.remove("animate-swipe");
    }, 1300);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const allMatchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredGenderUsers = genderedUsers?.filter(
    (genderUser) => !allMatchedUserIds?.includes(genderUser.user_id)
  );

  return (
    <div className="flex justify-center flex-col w-full h-full">
      {filteredGenderUsers ? (
        <>
          {filteredGenderUsers?.length > 0 ? (
            <div className="flex justify-center ">
              <div className="flex-col justify-center text-center p-4 lg:p-8 flex">
                <div className="deslike-icon p-3 text-5xl lg:text-6xl text-pink-600 mx-auto duration-200 absolute md:relative bottom-16 left-10 md:bottom-0 md:left-0 only:z-10 bg-white/30 md:bg-transparent rounded-2xl">
                  <IoMdHeartDislike />
                </div>
              </div>

              <div>
                <div className="mx-auto w-[100vw] md:w-[60vw] md:min-w-[350px] max-w-[420px] md:max-w-[420px] h-[90vh] md:h-[580px] max-h-[90vh] relative ">
                  <div className="w-full h-full absolute shadow-2xl shadow-black/50 rounded-3xl">
                    {filteredGenderUsers.map((character) => (
                      <TinderCard
                        className="absolute rounded-3xl overflow-hidden flex justify-center text-center "
                        key={character.first_name}
                        onSwipe={(dir) => swiped(dir, character.user_id)}
                        onCardLeftScreen={() =>
                          outOfFrame(character.first_name)
                        }
                      >
                        <div
                          style={{
                            backgroundImage: "url(" + character.url1 + ")",
                          }}
                          className="rounded-3xl bg-no-repeat relative bg-white w-[100vw] md:w-[60vw] md:min-w-[350px] max-w-[420px] md:max-w-[420px] h-[90vh] md:h-[580px] max-h-[90vh] bg-cover bg-center"
                        >
                          <div className="absolute -bottom-10 left-0 w-full p-2">
                            <h3 className="text-2xl font-semibold text-center text-white">
                              {character.first_name}
                            </h3>
                          </div>
                        </div>
                      </TinderCard>
                    ))}
                  </div>
                </div>
                {lastDirection ? (
                  <h2 className="infoText">You swiped {lastDirection}</h2>
                ) : (
                  ""
                )}
              </div>

              <div className="flex-col justify-center text-center p-4 lg:p-8 flex">
                <div className="like-icon p-3 text-5xl lg:text-6xl text-green-500 duration-200 absolute md:relative bottom-16 right-10 md:bottom-0 md:left-0 z-10 bg-white/30 md:bg-transparent rounded-2xl">
                  <AiFillHeart />
                </div>
              </div>
            </div>
          ) : (
            <NoMaches
              emoji="sad"
              message="No profiles to swipe at the mement!"
            />
          )}
        </>
      ) : (
        <Loading height="h-full" />
      )}
    </div>
  );
};
export default Dashboard;
