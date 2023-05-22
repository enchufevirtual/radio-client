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
    const { name, value } = event.target;
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
      [name]: files![0]
    })
  }

  useEffect(() => {
    setProfile(auth)
  }, [auth])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { name, email } = profile;

    if (!name.trim()) {
      return messageNotification('name', 'El nombre es obligatorio');
    } else if (!regexName(name)) {
      return messageNotification('name', 'El campo "Nombre" solo acepta letras y espacios.');
    }
    if (!email.trim()) {
      return messageNotification('email', 'Este campo no puede ir vacío');
    } else if (!isEmail(email)) {
      return messageNotification('email', 'El campo "Email" contiene un formato no válido.');
    }
    updateProfile(profile);
    if (!isUpdating) return
    setProfile(auth);
  }
  const regexName = (name: string): boolean => {
    return /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(name);
  }
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
