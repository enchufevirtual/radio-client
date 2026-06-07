import React, { useState, useEffect, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import { clientAxios } from "../config/axios";
import { GlobalProviderTypes, Auth, StateUpdater } from "./types";
import { useGlobal } from "../hooks/useGlobal";
import { useHandleState } from "../../src/hooks/useHandleState";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { normalizeImageValue } from "../helpers/getAvatarUrl";
import { Data, ErrorRequest } from "../../types/types";

export const AuthProvider = ({children}: GlobalProviderTypes) => {

  const initialState = {
    createAt: "",
    description: "",
    email: "",
    id: "",
    image: '',
    name: "",
    username: "",
    role: "",
    social: {
      facebook: '',
      instagram: '',
      twitter: '',
      github: ''
    }
  }

  const [auth, setAuth] = useHandleState<Auth | null>(null);
const [profile, setProfile] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [invalidToken, setInvalidToken] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  const { messageNotification } = useGlobal();

  async function authUser() {
  const token = localStorage.getItem('token_ev');

  if (!token) {
    setLoadingPage(false);
    setLoading(false);
    return;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  };

  try {
    setLoadingPage(true);

    const { data } = await clientAxios('/users/profile', config);
    const sanitizedAuthData = {
      ...data,
      image: normalizeImageValue(data.image) ?? '',
    };

    setAuth(sanitizedAuthData);
    setProfile(sanitizedAuthData);
    setInvalidToken('');

  } catch (error) {

    const errorMsg = error as ErrorRequest;
    const message = getErrorMessage(error);

    const isAuthError =
      message === 'Invalid Token' ||
      message === 'Token inválido' ||
      errorMsg.status === 401;

    // SOLO cerrar sesión cuando el token realmente sea inválido
    if (isAuthError) {
      console.warn('[AUTH] Invalid token. Logging out user.');

      localStorage.removeItem('token_ev');

      setAuth(null);
      setProfile(null);
      setInvalidToken(message);

      location.href = '/';
      return;
    }

    // Cualquier otro error NO debe cerrar sesión
    console.error('[AUTH] Failed to load profile:', error);

    // Mantener token y estado actual
    setInvalidToken('');

  } finally {
    setLoadingPage(false);
    setLoading(false);
  }
}

  useEffect(() => {
    authUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem('token_ev');
    setAuth(null);
    location.href = '/';
  }

  const updateProfile = async (updateData: Auth) => {

    const { name, username, description, email, social, image, id } = updateData;
    const descriptionString = description !== null && description ? description : '';
    const usernameString = username !== null ? username.trim() : '';
    const nameString = name !== null ? name.trim() : '';
    const emailString = email !== null ? email.trim() : '';

    const token = localStorage.getItem('token_ev');
    if (!token) {
      setLoading(false);
      return;
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    setIsUpdating(true);
    try {
      setLoadingPage(true)
      const formData = new FormData();
      formData.append('name', nameString);
      formData.append('username', usernameString);
      formData.append('email', emailString);
      formData.append('description', descriptionString);
      formData.append('social', JSON.stringify(social));
      if (image && typeof image !== 'string') {
        formData.append('image', image);
      }

      const url = `/users/${id}`;
      const { data } = await clientAxios.put(url, formData, config);
      const sanitizedAuthData = {
        ...data,
        image: normalizeImageValue(data.image) ?? '',
      };
      messageNotification('image-alert', '');
      messageNotification('send', 'Perfil Actualizado Correctamente');
      setAuth(sanitizedAuthData);
      setProfile(sanitizedAuthData);
      setSuccess(true);
      setLoadingPage(false)
    } catch (error) {
      const message = getErrorMessage(error);
      if (message === 'Este correo ya está registrado') {
        messageNotification('email', message);
        messageNotification('send', 'Hubo un error con el correo');
      }
      if (message === 'Este nombre de usuario no está disponible.') {
        messageNotification('username', message);
        messageNotification('send', 'Hubo un error con el nombre de usuario');
      }
      if (message === 'El archivo excede el límite - (MAX 10MB)') {
        messageNotification('image-alert', message);
        messageNotification('send', 'Hubo un error con la imagen');
      }
      setLoadingPage(false)
      setSuccess(false)
    } finally {
      setIsUpdating(false);
    }
  }

  const updateUserPassword = async (password: Data) => {

    const token = localStorage.getItem('token_ev');
    if (!token) {
      setLoading(false);
      return;
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const url = '/users/update-password'
      const { data } = await clientAxios.put(url, password, config);
      messageNotification('send', data.message)
    } catch (error) {
      console.clear();
      const message = getErrorMessage(error);
      if (message === "Lo siento, la contraseña que ha ingresado no es correcta.") {
        messageNotification('password', message);
      } else {
        messageNotification('send', 'Hubo un error');
      }
    }
  }

  const memoizedAuth = useMemo(() => auth, [auth]);
  const memoizedAuthProfile = useMemo(() => profile, [profile]);

  const value = {
    auth: memoizedAuth,
    profile: memoizedAuthProfile,
    setProfile,
    authUser,
    updateProfile,
    updateUserPassword,
    invalidToken,
    loadingPage,
    setLoadingPage,
    setAuth,
    logOut,
    loading,
    isUpdating,
    success
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
