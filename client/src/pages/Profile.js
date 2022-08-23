import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useStateContext } from "../contexts/Context";

const calculate_age = (birthday) => {
  let diff_ms = Date.now() - birthday.getTime();
  let age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const url = window.location.pathname.split("/");
  const userId = url.slice(-1)[0];

  const getProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      const profile = response.data;

      const birthday = new Date(
        profile.birth_year,
        profile.birth_month,
        profile.birth_day
      );
      profile["age"] = calculate_age(birthday);
      setProfileData(profile);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [userId]);

  return (
    <>
      {profileData ? (
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="w-full md:w-auto md:min-w-[380px] md:max-w-[50%] h-[80vh] max-h-[80vh] md:h-auto md:max-h-[100vh] overflow-hidden relative md:rounded-2xl md:m-3 shadow-none md:shadow-xl ">
            <img
              src={profileData?.url1}
              alt={profileData?.first_name + "profile photo"}
              className="object-center object-cover mx-auto w-full h-full"
            />

            <div className="flex md:hidden bg-gradient-to-t from-white to-transparent absolute bottom-0 w-full left-0 h-32 z-10"></div>
          </div>
          <div className="p-3 w-full">
            <div className="border-b-2 border-gray-100 py-4 mb-4 flex gap-1 px-3">
              <h2 className="font-extrabold text-2xl capitalize">
                {profileData.first_name}
              </h2>
              <p className="font-semibold text-xl">~</p>
              <p className="font-semibold text-xl">{profileData.age}</p>
            </div>

            <div className="p-3 m-1 mb-4">
              <h3 className="font-bold text-xl mt-4 mb-2">About</h3>
              <p className="text-sm text-gray-500">{profileData.about}</p>
            </div>

            <div className="p-3 m-1 mb-4">
              <h3 className="font-bold text-xl mt-4 mb-2">Profile</h3>
              <div className="font-semibold text-gray-800 text-sm flex flex-col gap-1">
                <p className="flex gap-1 ">
                  Gender :{" "}
                  <span className="text-gray-400">
                    {profileData.gender_identity}
                  </span>
                </p>
                <p className="flex gap-1">
                  Interested in :{" "}
                  <span className="text-gray-400">
                    {profileData.gender_interest}
                  </span>
                </p>
                <p className="flex gap-1">
                  Matches :{" "}
                  <span className="text-gray-400">
                    {profileData.matches.length}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading height="h-full" />
      )}
    </>
  );
};
export default Profile;
