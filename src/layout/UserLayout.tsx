import React from "react";
import { Outlet } from "react-router-dom";
import { MainUser } from "./styles";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { Radio } from "../components/radio";
import { useGlobal } from "../hooks/useGlobal";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/loading/Loading";

export const UserLayout = (): JSX.Element => {

  const { isFooter } = useGlobal();
  const { loadingPage } = useAuth();

  return (
    <>
      <MainUser>
        { loadingPage && <Loading /> }
        <Nav />
        <Outlet />
        <Radio />
        {isFooter && <Footer />}
      </MainUser>
    </>
  )
}
