import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { MainUser } from "./styles";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { Radio } from "../components/radio";
import { useGlobal } from "../hooks/useGlobal";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/loading/Loading";
import { Chat } from "../components/chat/Chat";

export const UserLayout = (): JSX.Element => {

  const { isFooter, openChat } = useGlobal();
  const { loadingPage } = useAuth();

  useEffect(() => {
    if (openChat) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = null;
    }
    return () => {
      document.body.style.overflow = null;
    };
  }, [openChat]);

  return (
    <>
      <MainUser>
        { loadingPage && <Loading /> }
        <Nav />
        <Outlet />
        <Radio />
        { openChat ? <Chat /> : null }
        {isFooter && <Footer />}
      </MainUser>
    </>
  )
}
