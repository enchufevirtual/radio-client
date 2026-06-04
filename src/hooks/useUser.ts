import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "./useGlobal";
import { clientAxios } from "../config/axios";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { useMediaQuery } from "./useMediaQuery";
import { ZINDEX_LOADING } from "../../src/context/constants";
import { Auth } from "../context/types";

export function useUser() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);
  const [userExists, setUserExists] = useState(true);
  const [userProfile, setUserProfile] = useState<Auth | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const match = useMediaQuery('(min-width: 768px)');

  const { dispatch } = useGlobal();

    async function handleUser(username?: string): Promise<void> {
        if (!username) return;
    dispatch({type: ZINDEX_LOADING, payload: 8});
    const token = localStorage.getItem('token_ev');

    if (!token) {
      // If there is no token, do not force the global page loader for profile lookup.
      // Depending on your API, the profile call may work without authorization.
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      }
    };

    try {
      setLoadingUser(true);
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

      const { data } = await clientAxios(`/users/${id.toLowerCase()}`, config);
      setUserExists(true);
      setUserProfile(data);
      setUserId(data.id);
      const modifiedUsername = data.name.replace(/\s+/g, "-");
          navigate(`/${data.username ?? modifiedUsername + '-' + id}`, { replace: true });
    } catch (error) {
      const message = getErrorMessage(error);
      setUserExists(false);
      setUserProfile(null);
      // Navigate to explicit 404 page when API indicates the user does not exist
      try {
        navigate('/404', { replace: true });
      } catch (e) {
        // ignore navigation errors
      }
    } finally {
      setLoadingUser(false);
      // if (!match)  dispatch({type: OPEN_CHAT, payload: false})
    }
  }
  return {
    handleUser,
    userId,
    userExists,
    userProfile,
    loadingUser
  };
}
