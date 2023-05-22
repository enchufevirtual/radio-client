import React from "react";
import { Outlet } from "react-router-dom";
import { MainUser } from "./styles";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { Radio } from "../components/radio";
import { useGlobal } from "../hooks/useGlobal";

export const UserLayout = (): JSX.Element => {

  const { isFooter } = useGlobal();

  return (
    <>
      <MainUser>
        <Nav />
        <Outlet />
        <Radio />
        {isFooter && <Footer />}
      </MainUser>
    </>
  )
}
