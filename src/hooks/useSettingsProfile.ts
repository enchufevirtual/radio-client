import { useEffect, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useAuth } from "./useAuth";
import { useGlobal } from "./useGlobal";
import { Auth } from "../context/types";

type InputChangeEvent = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export function useSettingsProfile() {

  const initialState = {
    id: "",
    createAt: "",
    name: "",
    username: "",
    email: "",
    description: "",
    image: '',
    role: "",
    social: {
      facebook: '',
      instagram: '',
      twitter: '',
      github: ''
    }
  }

  const [profile, setProfile] = useState<Auth>(initialState);
  const { auth, updateProfile, isUpdating } = useAuth();
  const [previewImage, setPreviewImage] = useState(null);
  const { messageNotification } = useGlobal();

  const onChange: InputChangeEvent = (event) => {
    let { name, value } = event.target;

    setProfile({
      ...profile,
      [name]: value
    });
  }

  const onChangeSocial: InputChangeEvent = event => {
    const { name, value } = event.target;
    if(name.includes('social')) {
      const social = { ...profile.social, [name.split('.')[1]]: value };
      setProfile({ ...profile, social });
    }
  }

  const handleFile: ChangeEventHandler<HTMLInputElement> = event => {
    const { name, files } = event.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      }
      reader.readAsDataURL(files[0]);
    }
    setProfile({
      ...profile,
      [name]: files && files[0] ? files[0] : ''
    })
  }

  useEffect(() => {
    setProfile(auth)
  }, [auth])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { name, email, username } = profile;

    if (!name.trim()) {
      messageNotification('name', 'El nombre es obligatorio');
      messageNotification('send', '');
      return;
    } else if (!regexName(name)) {
      messageNotification('name', 'El campo "Nombre" solo acepta letras y espacios.');
      messageNotification('send', '');
      return;
    }
    if (username) {
      if (!regexUsername(username)) {
        messageNotification('username', 'Contiene caracteres que no son válidos..');
        messageNotification('send', '');
        return;
      }
    }
    if (!email.trim()) {
      messageNotification('email', 'Este campo no puede ir vacío');
      messageNotification('send', '');
      return;
    } else if (!isEmail(email)) {
      messageNotification('email', 'El campo "Email" contiene un formato no válido.');
      messageNotification('send', '');
      return;
    }
    updateProfile(profile);
    if (!isUpdating) return
    setProfile(auth);
  }
  const regexName = (name: string): boolean => {
    return /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(name);
  }
  const regexUsername = (username: string) => {
    return /^[A-Za-z0-9]+$/.test(username);
  };
  const isEmail = (email: string): boolean => {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
  }

  return {
    onChange,
    onChangeSocial,
    handleFile,
    handleSubmit,
    previewImage,
    profile,
    setProfile
  }
}
