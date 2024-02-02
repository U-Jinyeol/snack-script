"use client";
import { useState } from "react";
import Input from "../Common/Input";
import CommonButton from "../Common/Button";
import { showWarningAlert } from "@/utils/alert";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const validateEmail = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = () => {
    if (password.length < 8 || password.length > 16) {
      return false;
    }

    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,16}$/;
    return regex.test(password);
  };

  const validateConfirmPassword = () => {
    return password === confirmPassword;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      return showWarningAlert({ text: "모든 항목을 입력해주세요." });
    }

    if (!validateConfirmPassword() || !validateEmail() || !validatePassword()) {
      return showWarningAlert({ text: "입력한 정보를 확인해주세요." });
    }

    console.log("Form submitted!");
  };

  return (
    <div className="flex flex-col mx-auto mt-100px max-w-400px w-full">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <Input
            label="Email"
            id="signup-email"
            value={email}
            onChange={handleEmailChange}
          />
          {!validateEmail() ? (
            <p className="mt-2 text-red-500 text-xs h-15px">
              유효한 이메일을 입력해주세요
            </p>
          ) : (
            <p className="mt-2 h-15px"></p>
          )}
        </div>

        <div>
          <Input
            label="Password"
            id="signup-password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
          {!validatePassword() ? (
            <p className="mt-2 text-red-500 text-xs h-15px">
              8~16자 영문 대/소문자, 숫자, 특수 문자를 모두 사용하여 구성
            </p>
          ) : (
            <p className="mt-2 h-15px"></p>
          )}
        </div>

        <div>
          <Input
            label="Confirm Password"
            id="signup-confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            type="password"
          />
          {!validateConfirmPassword() ? (
            <p className="mt-2 text-red-500 text-xs h-15px">
              비밀번호가 일치하지 않습니다
            </p>
          ) : (
            <p className="mt-2 h-15px"></p>
          )}
        </div>

        <CommonButton type="submit" label="Submit" />
      </form>
    </div>
  );
};

export default SignUpForm;
