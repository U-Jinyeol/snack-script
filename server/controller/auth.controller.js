import authService from "../services/auth.service.js";

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await authService.signIn(email, password);

    res.status(200).json({
      success: true,
      message: "SUCCESS",
      data: token,
      code: 0,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { email, password, confirm_password } = req.body;

  try {
    const result = await authService.createUser(
      email,
      password,
      confirm_password
    );

    res.status(200).json({
      success: true,
      message: "SUCCESS",
      code: 0,
    });
  } catch (error) {
    next(error);
  }
};

export default { signIn, createUser };
