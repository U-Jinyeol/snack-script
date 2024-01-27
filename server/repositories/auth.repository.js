import Auth from "../models/auth.model.js";

export const getUserByUsernameRepository = async (email, password) => {
  const user = await Auth.findOne({ email });
  return user;
};
