import { cookies } from "next/headers";

const isLogin = () => {
  const cookieStore = cookies();

  const token = cookieStore.get("token");
  return !!token;
};

export default isLogin;
