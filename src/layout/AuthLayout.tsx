import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "../components/logo";
import { Main } from "./styles";
import { useGlobal } from "../hooks/useGlobal";
import { PLAY, IS_PLAYING } from "../context/constants";

export const AuthLayout = (): JSX.Element => {
  const { dispatch, audioRef } = useGlobal();

  useEffect(() => {
    // Pause audio when entering login/register
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    dispatch({ type: PLAY, payload: false });
    dispatch({ type: IS_PLAYING, payload: false });
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
