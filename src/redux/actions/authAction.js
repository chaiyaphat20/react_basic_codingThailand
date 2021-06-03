import axios from "axios";

export const GET_PROFILE = "GET_PROFILE";
export const GET_VERSION = "GET_VERSION";

//action ไว้เขียน logic
export const updateProfile = (data) => {
  return {
    type: GET_PROFILE,
    payload: {
      profile: data,
    },
  };
};

//action ไว้เขียน logic
export const getVersion = () => {

  // ส่งแบบ asynchonous
  return async (dispatch) => {
    const res = await axios.get("https://api.codingthailand.com/api/version");
    dispatch({
      type: GET_VERSION,
      payload: {
        version: res.data.data.version,
      },
    });
  };
  //  แบบ ธรรมดา
  // return {
  //   type: GET_VERSION,
  //   payload: {
  //     version: "1.0.0",
  //   },
  // };
};
