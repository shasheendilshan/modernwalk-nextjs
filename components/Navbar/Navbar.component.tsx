import React from "react";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";

import { useUserContext } from "../../contexts/userContext";
import Button from "@components/Button/Button.component";
import CartPopOver from "@components/PopOverCart/CartPopOver.component";
import style from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  const userCtx = useUserContext();
  return (
    <div className={style.mainContainer}>
      <div className={style.navbar}>
        <div className={style.header}>
          <Link href="/">
            <h1>Modern Walk</h1>
          </Link>
        </div>
        <div className="items-center  h-full flex justify-end flex-1 space-x-3 mr-5  ">
          {!userCtx?.user ? (
            <div>
              <Link href="/sign-in">
                <Button name="Sign in" />
              </Link>
            </div>
          ) : (
            <div className="flex lg:space-x-10 item-center">
              <div className="items-center px-2 group inline-block relative cursor-pointer">
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-300 text-blue-700 h-[35px] w-[35px] flex items-center justify-center rounded-full">
                    <h2 className="text-xl ">
                      {userCtx.user?.firstName?.charAt(0)}
                    </h2>
                  </span>
                  <h3 className="text-md lg:text-xl">
                    Welcome {userCtx.user?.firstName} !
                  </h3>
                </div>

                <ul className="absolute w-[150px] h-[100px] text-gray-700 pt-1  p-2 rounded-md shadow-lg hidden group-hover:block bg-white">
                  <li
                    onClick={userCtx.removeUserDetails}
                    className="flex items-center rounded-sm justify-center hover:bg-[#27c39e] "
                  >
                    <AiOutlineLogout size={25} />
                    <a
                      className="rounded  py-2 px-2 block whitespace-no-wrap"
                      href="/"
                    >
                      log out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <CartPopOver />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Navbar);
