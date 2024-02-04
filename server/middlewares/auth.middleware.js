import jwt from "jsonwebtoken";
import Auth from "../models/auth.model.js";

export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      message: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  try {
    const { email } = jwt.verify(authToken, process.env.JWT_SECRET);
    Auth.findOne({ email: email }).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    res.status(401).send({
      message: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};
