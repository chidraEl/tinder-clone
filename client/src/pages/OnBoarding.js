import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { AiFillInfoCircle } from "react-icons/ai";

const OnBoarding = () => {
  const [cookies] = useCookies();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    birth_day: "",
    birth_month: "",
    birth_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    email: "",
    url1: "",
    about: "",
    matches: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8000/user", {
        formData,
      });
      const success = response.status === 200;
      if (success) {
        navigate("/dashboard");
        window.location.reload();
      }
      if (!success) setError(response.data);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Nav minimal={true} showModal={false} setShowModal={() => {}} />
      <div className="md:p-5 mt-6 md:m-6 ">
        <h2 className="text-2xl mx-10 md:mx-12 border-t-2 pt-8 border-gray-200 md:text-4xl uppercase font-bold text-center ">
          Create an account
        </h2>
        <div className="max-w-[900px] mx-auto my-10 md:rounded-2xl p-4 md:p-12 ">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 lg:gap-20 flex-col lg:flex-row">
              <section>
                <div className="field-container mb-6">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="First name"
                    required={true}
                    value={formData.first_name}
                    onChange={handleChange}
                    className="input normal mt-2"
                  />
                </div>

                <div className="field-container mb-6">
                  <label>Birthday</label>
                  <div className="field-container flex gap-4 mt-2 justify-start">
                    <input
                      type="number"
                      min="1"
                      max="31"
                      id="birth_day"
                      name="birth_day"
                      placeholder="DD"
                      required={true}
                      value={formData.birth_day}
                      onChange={handleChange}
                      className="input sm"
                    />
                    <input
                      type="number"
                      min="1"
                      max="12"
                      id="birth_month"
                      name="birth_month"
                      placeholder="MM"
                      required={true}
                      value={formData.birth_month}
                      onChange={handleChange}
                      className="input sm"
                    />

                    <input
                      type="number"
                      min="1950"
                      max="2022"
                      id="birth_year"
                      name="birth_year"
                      placeholder="YYYY"
                      required={true}
                      value={formData.birth_year}
                      onChange={handleChange}
                      className="input sm"
                    />
                  </div>
                </div>

                <div className="field-container mb-6">
                  <label htmlFor="first_name">Gender</label>
                  <div className="flex justify-start gap-6 mt-2">
                    <div className="flex gap-2 radio">
                      <input
                        type="radio"
                        id="gender-man"
                        name="gender_identity"
                        value="man"
                        required={true}
                        onChange={handleChange}
                        className="w-6"
                        checked={formData.gender_identity === "man"}
                      />
                      <label htmlFor="gender-man" className="content">
                        Man
                      </label>
                    </div>
                    <div className="flex gap-2 radio">
                      <input
                        type="radio"
                        id="gender-woman"
                        name="gender_identity"
                        value="woman"
                        required={true}
                        onChange={handleChange}
                        className="w-6"
                        checked={formData.gender_identity === "woman"}
                      />
                      <label htmlFor="gender-woman" className="content">
                        Woman
                      </label>
                    </div>
                    <div className="flex gap-2 radio">
                      <input
                        type="radio"
                        id="gender-other"
                        name="gender_identity"
                        value="other"
                        required={true}
                        onChange={handleChange}
                        className="w-6"
                        checked={formData.gender_identity === "other"}
                      />
                      <label htmlFor="gender-other" className="content">
                        Other
                      </label>
                    </div>
                  </div>
                </div>

                <div className="field-container flex gap-3 mb-6">
                  <input
                    type="checkbox"
                    id="show_gender"
                    name="show_gender"
                    onChange={handleChange}
                    className="w-5 h-5 mt-1"
                    checked={formData.show_gender}
                  />
                  <label htmlFor="show_gender" className="content mt-0.5">
                    Show gender on my profile
                  </label>
                </div>

                <div className="field-container mb-6">
                  <label>Show me</label>
                  <div className="field-container flex gap-3 mt-2">
                    <div className="flex gap-3 radio">
                      <input
                        type="radio"
                        id="interestedin_men"
                        name="gender_interest"
                        required={true}
                        value="man"
                        onChange={handleChange}
                        className="w-6"
                        checked={formData.gender_interest === "man"}
                      />
                      <label htmlFor="interestedin_men" className="content">
                        Men
                      </label>
                    </div>
                    <div className="flex gap-3 radio">
                      <input
                        type="radio"
                        id="interestedin_women"
                        name="gender_interest"
                        required={true}
                        value="woman"
                        onChange={handleChange}
                        className="w-6"
                        checked={formData.gender_interest === "woman"}
                      />
                      <label htmlFor="interestedin_women" className="content">
                        Women
                      </label>
                    </div>
                    <div className="flex gap-3 radio">
                      <input
                        type="radio"
                        id="interestedin_everyone"
                        name="gender_interest"
                        required={true}
                        value="everyone"
                        onChange={handleChange}
                        className="w-6"
                        checked={formData.gender_interest === "everyone"}
                      />
                      <label
                        htmlFor="interestedin_everyone"
                        className="content"
                      >
                        Everyone
                      </label>
                    </div>
                  </div>
                </div>

                <div className="field-container  mb-6">
                  <label htmlFor="about">About me</label>
                  <textarea
                    type="text"
                    id="about"
                    name="about"
                    required={true}
                    value={formData.about}
                    placeholder="I like long walks.."
                    onChange={handleChange}
                    className="input normal mt-2"
                  />
                </div>
              </section>

              <section>
                <div className="field-container mb-6">
                  <label htmlFor="profile_photo">Profile Photo</label>
                  <div className="flex gap-4 mt-4 flex-col">
                    <div>
                      <input
                        type="text"
                        id="url1"
                        className="input"
                        onChange={handleChange}
                        name="url1"
                        placeholder="Photo Link"
                      />
                    </div>
                    {formData.url1.length > 5 && (
                      <div>
                        <img
                          src={formData.url1}
                          alt="Profile pic preview"
                          className="max-w-full max-h-80 md:max-w-full md:max-h-full rounded-2xl"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
            {error !== null && (
              <div className="text-red-600 p-2 flex gap-1">
                <AiFillInfoCircle className="mt-1" />
                <p>{error}</p>
              </div>
            )}
            <div className="text-center">
              <button type="submit" className="btn-primary">
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default OnBoarding;
