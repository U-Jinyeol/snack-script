import { hasCookie } from "cookies-next";

const isLogin = () => {
  return hasCookie("token");
};

export default isLogin;
