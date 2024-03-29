import React, { useState } from 'react';
import {
  ContainerInputs,
  SettingsInput,
  SettingsInputImage,
  SettingsTextarea,
  SettingsButton,
  ContainerSettings,
  ContainerImage,
  SocialInputIcon,
  Form,
  Title,
  ContainerSocialUrl
} from './styles';
import { GroupInput, Label } from '../../styles/Form/styles';
import { useSettingsProfile } from '../../hooks/useSettingsProfile';
import { useGlobal } from '../../../src/hooks/useGlobal';
import { useAuth } from '../../hooks/useAuth';
import { AlertMessage } from '../alert';
import { Auth, MyPostTypes, StateUpdater } from '../../../src/context/types';
import { PreviousImage } from '../posts/styles';

export const SettingsProfile = (): JSX.Element => {

  const { profile, onChange, onChangeSocial, handleSubmit, setProfile } = useSettingsProfile();

  const { success } = useAuth();
  const { handleFile, previewImage } = useGlobal();
  const { name, username, description, email, social, image } = profile;

  const api = process.env.API_AVATAR;
  const key = process.env.API_KEY;

  const newImage = `${previewImage == null && !image
    ? `${api}/${name}.png?apikey=${key}`
    : `${process.env.BACKEND_URL}/${image}`}`

  if (!profile.id) return null;

  return (
    <ContainerSettings>
      <Title>Perfil Público</Title>
      <Form onSubmit={handleSubmit} autoComplete='off' encType='multipart/form-data'>
        <ContainerInputs>
          <div className="containerForm">
            <GroupInput>
              <Label htmlFor="name">Nombre</Label>
              <SettingsInput
                type="text"
                id='name'
                name='name'
                value={name}
                onChange={onChange}
              />
              <AlertMessage data={{id: 'name'}} />
            </GroupInput>
            <GroupInput>
              <Label htmlFor="username">Nombre de usuario</Label>
              <p>radio.enchufevirtual.com/{username}</p>
              <br/>
              <SettingsInput
                type="text"
                id='username'
                name='username'
                value={username ?? ''}
                onChange={onChange}
              />
              <AlertMessage data={{id: 'username'}} />
            </GroupInput>
            <GroupInput>
              <Label htmlFor="description">Descripción</Label>
              <SettingsTextarea
                id='description'
                name='description'
                placeholder='Escribe sobre ti...'
                value={description ?? ''}
                onChange={onChange}
              />
            </GroupInput>
            <GroupInput>
              <Label htmlFor="email">Email</Label>
              <SettingsInput
                id='email'
                name='email'
                value={email}
                onChange={onChange}
              />
              <AlertMessage data={{id: 'email'}} />
            </GroupInput>
            <GroupInput>
              <Label>Redes Sociales</Label>
              <ContainerSocialUrl>
                <p>En la URL, por ejemplo: <code>facebook.com/<span>enchufevirtual</span></code></p>
                <p>Después de la barra " / ", el texto resaltado en color celeste es lo que debes agregar.</p>
              </ContainerSocialUrl>
              <SocialInputIcon>
                <SettingsInput
                  id='facebook'
                  name='social.facebook'
                  value={social ? social.facebook ?? "" : ""}
                  onChange={onChangeSocial}
                />
                <i className='fa fa-facebook'></i>
              </SocialInputIcon>
              <SocialInputIcon>
                <SettingsInput
                  id='instagram'
                  name='social.instagram'
                  value={social ? social.instagram ?? "" : ""}
                  onChange={onChangeSocial}
                />
                <i className='fa fa-instagram'></i>
              </SocialInputIcon>
              <SocialInputIcon>
                <SettingsInput
                  id='github'
                  name='social.github'
                  value={social ? social.github ?? "" : ""}
                  onChange={onChangeSocial}
                />
                <i className='fa fa-github'></i>
              </SocialInputIcon>
              <SocialInputIcon>
                <SettingsInput
                  id='twitter'
                  name='social.twitter'
                  value={social ? social.twitter ?? "" : ""}
                  onChange={onChangeSocial}
                />
                <i className='fa fa-twitter'></i>
              </SocialInputIcon>
            </GroupInput>
          </div>
          <ContainerImage className="editImage">
            <Label htmlFor="image">Imagen de Perfil</Label>
            {previewImage !== null ? (
              <img src={`${previewImage}`} alt="Imagen Previa del Perfil" />
            ) : (
              <img src={`${newImage}`} alt="Imagen de Perfil" />
            )}
            <label htmlFor="image" className="custom-upload-button">
              {previewImage ? "Cambiar Imagen" : "Subir Imagen"}
            </label>
            <SettingsInputImage
              type="file"
              name="image"
              id="image"
              accept="image/png, image/gif, image/jpeg, image/jpg"
              onChange={ (event) =>
                handleFile(
                  event,
                  setProfile as StateUpdater<Auth | MyPostTypes>,
                  )
                }
            />
            <AlertMessage data={{id: 'image-alert'}} />
            <p>El formato debe ser JPEG, PNG o GIF y no puede superar los 10 MB.</p>
          </ContainerImage>
        </ContainerInputs>
        <SettingsButton aria-label='update' type='submit'>Actualizar Perfil</SettingsButton>
        <AlertMessage data={{id: 'send', success: success}} />
      </Form>
    </ContainerSettings>
  )
}
