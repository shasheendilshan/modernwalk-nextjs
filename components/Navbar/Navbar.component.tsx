import React from "react";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";

import { useUserContext } from "../../contexts/userContext";
import Button from "@components/Button/Button.component";
import CartPopOver from "@components/PopOverCart/CartPopOver.component";
import style from "./Navbar.module.scss";
import DropDownMenu from "@components/DropdownMenu/DropDownMenu.component";

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
        <div className={style.btnContainer}>
          {!userCtx?.user ? (
            <div>
              <Link href="/signIn">
                <Button name="Sign in" />
              </Link>
            </div>
          ) : (
            <>
              <div className={style.nameContainer}>
                <span>
                  <h2>{userCtx.user?.firstName?.charAt(0)}</h2>
                </span>
                <h3>Welcome {userCtx.user?.firstName}!</h3>
              </div>

              <DropDownMenu logout={userCtx.removeUserDetails} />
            </>
          )}
          <CartPopOver />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Navbar);
