import React from "react";
import Link from "next/link";

import { useUserContext } from "../../contexts/userContext";
import Button from "@components/Button/Button.component";
import CartPopOver from "@components/PopOverCart/CartPopOver.component";
import style from "./Navbar.module.scss";
import DropDownMenu from "@components/DropdownMenu/DropDownMenu.component";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const userCtx = useUserContext();
  const router = useRouter();
  return (
    <div className={style.mainContainer}>
      <div className={style.navbar}>
        <div className={style.header}>
          <Link href="/">
            <h1>Modern Walk ST</h1>
          </Link>
        </div>
        <div className={style.btnContainer}>
          {!userCtx?.user ? (
            <div>
              <Button name="Sign in" onClick={() => router.push("/signIn")} />
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
