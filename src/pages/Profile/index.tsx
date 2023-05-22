import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  ContainerProfile,
  ContainerImage,
  ContainerName,
  ContainerAbout,
  ContainerSocial,
  AccountCreationDate,
  ButtonEditProfile
} from './styles';
import { Social } from '../../components/profile/Social';
import { formatDate } from '../../helpers/formatDate';
import { useGlobal } from '../../hooks/useGlobal';

export const Profile = () => {

  const { auth } = useAuth();
  const { setIsFooter } = useGlobal();

  const { name, description, createAt, image} = auth;
  const url = `${process.env.BACKEND_URL}/${image ?? 'avatar.jpg'}`

  const socialmedia = auth.social
  ? Object.entries(auth.social)
      .filter(([key, value]) => key !== "createAt" &&
        key !== "id" &&
        key !== "userId" &&
        value !== null
      ).map(([key, value]) => <Social key={key} property={key} value={value} />)
  : null;

  return (
    <ContainerProfile onLoad={() => setIsFooter(true)}>
      <ContainerImage>
        <img src={url} alt="Perfil" />
        <ContainerName>
          <span>{name}</span>
        </ContainerName>
        <ButtonEditProfile to='/settings/profile'>Editar Perfil</ButtonEditProfile>
      </ContainerImage>
      <ContainerAbout>
        <h3>Acerca de {name}:</h3>
        <p>{description}</p>
      </ContainerAbout>
      <ContainerSocial>
        <h4>Redes Sociales:</h4>
        {socialmedia}
      </ContainerSocial>
      <AccountCreationDate>
        <h4>Fecha de creación de la cuenta:</h4>
        {formatDate(createAt)}
      </AccountCreationDate>
    </ContainerProfile>
  )
}
