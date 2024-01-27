import jwt from "jsonwebtoken";
import Auth from "../api/auth/schema";

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
    const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);
    User.findById(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    res.status(401).send({
      message: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};
