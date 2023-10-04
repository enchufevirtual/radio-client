import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "./useGlobal";
import { ErrorResponse } from "types/types";
import { clientAxios } from "../config/axios";
import { useAuth } from "./useAuth";
import { useMediaQuery } from "./useMediaQuery";
import { ZINDEX_LOADING, OPEN_CHAT } from "../../src/context/constants";

export function useUser() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState(null);
  const [userExists, setUserExists] = useState(true);

  const match = useMediaQuery('(min-width: 768px)')

  const { dispatch } = useGlobal();
  const { setProfile, setLoadingPage } = useAuth();

  async function handleUser(username: string): Promise<void> {
    dispatch({type: ZINDEX_LOADING, payload: 8})
    const token = localStorage.getItem('token_ev');

    if (!token) {
      return null;
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      let id;

       if (username.includes(" ")) {
        const parts = username.split(" ");
        id = parts[parts.length - 1].replace(/\s/g, "");
      } else if (username.includes("-")) {
        const parts = username.split("-");
        id = parts[parts.length - 1].replace(/\s/g, "");
      } else {
        id = username;
      }
      setLoadingPage(true);
      const { data } = await clientAxios(`/users/${id.toLowerCase()}`, config);
      setUserExists(true);
      setProfile(data);
      setUserId(data.id)
      const modifiedUsername = data.name.replace(/\s+/g, "-");
      navigate(`/${data.username ?? modifiedUsername + '-' + id}`);
      setLoadingPage(false);
    } catch (error) {
      const { message } = (error as ErrorResponse).response.data;
      setUserExists(false);
    } finally {
      setLoadingPage(false);
      // if (!match)  dispatch({type: OPEN_CHAT, payload: false})
    }
  }
  return {
    handleUser,
    userId,
    userExists
  }

}
