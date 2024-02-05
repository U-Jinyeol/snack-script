import Auth from "../models/auth.model.js";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import authRepository from "../repositories/auth.repository.js";

const signIn = async (email, password) => {
  const user = await authRepository.getUserByUsername(email);
  if (!user) {
    throw new Error("이메일 또는 패스워드가 틀렸습니다.");
  }

  const isVerified = await argon2.verify(user.password, password);

  if (!isVerified) {
    throw new Error("이메일 또는 패스워드가 틀렸습니다.");
  }

  const token = createAccessToken(user.email);
  if (!token) {
    throw new Error("토큰 생성 실패");
  }

  return { token };
};

const createUser = async (email, password) => {
  const user = await authRepository.getUserByUsername(email);

  if (user) {
    throw new Error("이미 가입된 이메일입니다.");
  }

  const hashPassword = await argon2.hash(password);

  const newUser = new Auth({
    email: email,
    password: hashPassword,
    level: "USER",
  });

  return authRepository.createUser(newUser);
};

const createAccessToken = (email) => {
  const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return accessToken;
};

const signInValidation = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!emailRegExp.test(email)) {
    return res.status(400).send("이메일 형식이 아닙니다.");
  }
  if (password.length < 8 || password.length > 16) {
    return res.status(400).send("비밀번호는 8자리 이상 16자리 이하입니다.");
  }
  next();
};

export default { signIn, createUser, signInValidation };
