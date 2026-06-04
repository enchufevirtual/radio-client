import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "../components/logo";
import { Main } from "./styles";
import { useGlobal } from "../hooks/useGlobal";

export const AuthLayout = (): JSX.Element => {
  const { onPause } = useGlobal();

  useEffect(() => {
    // Pause audio when entering login/register
    onPause();
  }, []);

  return (
    <>
      <Main>
        <Logo />
        <Outlet />
      </Main>
    </>
  )
}
