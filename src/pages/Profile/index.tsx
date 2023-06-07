import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { useUser } from '../../hooks/useUser';
import { NotFound } from '../NotFound';

export const Profile = () => {

  const { username } = useParams();
  const { profile, auth } = useAuth();
  const { setIsFooter } = useGlobal();

  const { handleUser, userId, userExists } = useUser()

  const { name, description, createAt, image} = profile;

  const url = `${image
    ? `${process.env.BACKEND_URL}/${image}`
    : `https://api.multiavatar.com/${name.trim()}.svg`}`

  const socialmedia = profile.social
  ? Object.entries(profile.social)
      .filter(([key, value]) => key !== "createAt" &&
        key !== "id" &&
        key !== "userId" &&
        value !== null
      ).map(([key, value]) => <Social key={key} property={key} value={value} />)
  : null;

  useEffect(() => {
    handleUser(username)
  }, [username])

  if (!userExists) return <NotFound />

  return (
    <ContainerProfile onLoad={() => setIsFooter(true)}>
      <ContainerImage>
        <img src={url} alt="Perfil" />
        <ContainerName>
          <span>{name}</span>
        </ContainerName>
        {auth.id === userId && <ButtonEditProfile to='/settings/profile'>Editar Perfil</ButtonEditProfile>}
      </ContainerImage>
      <ContainerAbout>
        <h3>Acerca de {name}:</h3>
        <p>{description == 'null' ? '' : description}</p>
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
