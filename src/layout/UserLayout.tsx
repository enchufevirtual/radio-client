import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { MainUser } from "./styles";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { Radio } from "../components/radio";
import { Chat } from "../components/chat/Chat";
import { useGlobal } from "../hooks/useGlobal";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const UserLayout = (): JSX.Element => {

  const { isFooter, openChat } = useGlobal();
  const match = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    if (!match && openChat) {
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
        <Radio />
        <Nav />
        <Outlet />
        { openChat ? <Chat /> : null }
        {isFooter && <Footer />}
      </MainUser>
    </>
  )
}
