import React, { useState, useEffect, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import { clientAxios } from "../config/axios";
import { GlobalProviderTypes, Auth } from "./types";
import { useGlobal } from "../hooks/useGlobal";
import { ErrorResponse, Data } from "../../types/types";

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

  const [auth, setAuth] = useState<Auth>(initialState);
  const [profile, setProfile] = useState<Auth>(initialState);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [invalidToken, setInvalidToken] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  const { messageNotification } = useGlobal();

  async function authUser() {
    const token = localStorage.getItem('token_ev')
    if (!token) {
      setLoading(false);
      setLoadingPage(false);
      return;
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
    try {
      setLoadingPage(true)
      const { data } = await clientAxios('/users/profile', config);
      setAuth(data);
      setProfile(data);
      setLoadingPage(false)
    } catch (error) {
      const { message } = (error as ErrorResponse).response.data;
      if (message === 'Invalid Token') {
        localStorage.removeItem('token_ev');
        setInvalidToken(message);
        setLoadingPage(false);
      } else {
        setInvalidToken('');
      }
      setAuth(null);
      setProfile(null);
    }
    setLoading(false);
  }

  useEffect(() => {

    if (!mounted) {
      setMounted(true);
      return;
    }

    authUser();
  }, [mounted]);

  const logOut = () => {
    localStorage.removeItem('token_ev');
    setAuth(null);
    location.href = '/';
  }

  const updateProfile = async (updateData: Auth) => {
    const { name, username, description, email, social, image, id } = updateData;

    const token = localStorage.getItem('token_ev');
    if (!token) {
      setLoading(false);
      return;
    };
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    }
    setIsUpdating(true);
    try {
      setLoadingPage(true)
      const formData = new FormData();
      formData.append('name', name);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('description', description);
      formData.append('social', JSON.stringify(social));
      formData.append('image', image);

      const url = `/users/${id}`;
      const { data } = await clientAxios.put(url, formData, config);
      messageNotification('image-alert', '');
      messageNotification('send', 'Perfil Actualizado Correctamente');
      setAuth(data);
      setSuccess(true);
      setLoadingPage(false)
    } catch (error) {
      const { message } = (error as ErrorResponse).response.data;
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
      const { message } = (error as ErrorResponse).response.data;
      if (message == "Lo siento, la contraseña que ha ingresado no es correcta.") {
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
