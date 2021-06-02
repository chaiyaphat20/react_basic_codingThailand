export const GET_PROFILE = "GET_PROFILE";

//action ไว้เขียน logic 
export const updateProfile = (data) => {
  return {
    type: GET_PROFILE,
    payload: {
      profile: data,
    },
  };
};
