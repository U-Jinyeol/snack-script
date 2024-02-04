"use client";
import LoginForm from "@/components/Login/\bForm";
import { showWarningAlert } from "@/utils/alert";
import isLogin from "@/utils/isLogin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    if (isLogin()) {
      showWarningAlert({ text: "이미 로그인되어 있습니다." });
      router.push("/");
    }
  }, []);

  if (isLogin()) {
    return null;
  }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
