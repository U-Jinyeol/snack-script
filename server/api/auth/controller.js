import { signInService, signUpService } from "./services.js";

export const authSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  const signInResponse = {
    token: "",
    userId: 0,
  };
  try {
    const token = await signInService(email, password);

    return next({ ok: true, message: "SUCCESS", data: token, code: 0 });
  } catch (error) {
    return next({
      ok: false,
      message: "로그인에 실패하였습니다.",
      code: 10000,
    });
  }
};

export const authSignUp = async (req, res, next) => {
  const { email, password, confirm_password } = req.body;

  try {
    await signUpService(email, password, confirm_password);
    return next({ ok: true, message: "SUCCESS", code: 0 });
  } catch (error) {
    return next({
      ok: false,
      message: "회원가입에 실패하였습니다.",
      code: 10001,
    });
  }
};
