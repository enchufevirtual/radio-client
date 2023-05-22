import React from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "../components/logo";
import { Main } from "./styles";

export const AuthLayout = (): JSX.Element => {
  return (
    <>
      <Main>
        <Logo />
        <Outlet />
      </Main>
    </>
  )
}
