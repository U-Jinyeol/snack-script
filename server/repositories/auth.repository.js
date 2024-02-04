import Auth from "../models/auth.model.js";

const getUserByUsername = async (email) => {
  const user = await Auth.findOne({ email });
  return user;
};

const createUser = async (newUser) => {
  try {
    return await newUser.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { getUserByUsername, createUser };
