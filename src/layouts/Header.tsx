"use client";

import CommonButton from "@/components/Common/Button";
import isLogin from "@/utils/isLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const moveToLogin = () => {
    router.push("/login");
  };

  const moveToSignUp = () => {
    router.push("/signup");
  };

  useEffect(() => {
    if (isLogin()) {
      setIsLoggedIn(true);
    }
  });

  return (
    <header className="fixed z-50 inset-x-0 flex items-center p-4 h-60px bg-navy-700">
      <div className="flex items-center justify-between w-full">
        <Link href={"/"} className="text-gray-500">
          SNACK SCRIPT
        </Link>
        {isLoggedIn ? (
          <></>
        ) : (
          <div className="flex gap-2">
            <CommonButton type="button" label="SignIn" onClick={moveToLogin} />
            <CommonButton type="button" label="SignUp" onClick={moveToSignUp} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
