import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  ContainerProfile,
  ContainerInfoProfile,
  ContainerImage,
  ContainerName,
  ContainerAbout,
  ContainerSocial,
  AccountCreationDate,
  ButtonEditProfile,
  ContainerPostProfile,
  SkeletonCard,
  SkeletonNoMarginCard,
  ContainerSkeletonProfile,
  SkeletonHeader,
  SkeletonCircle,
  SkeletonLine
} from './styles';
import { Social } from '../../components/profile/Social';
import { formatDate } from '../../helpers/formatDate';
import { useGlobal } from '../../hooks/useGlobal';
import { useUser } from '../../hooks/useUser';
import { NotFound } from '../NotFound';
import { IS_FOOTER } from '../../../src/context/constants';
import { Posts } from '../Posts';
import { getAvatarUrl } from '../../helpers/getAvatarUrl';

export const Profile = () => {

  const params = useParams();
  const usernameParam = params.username;
  const sanitizedUsername = usernameParam ? String(usernameParam).split('/').pop() : undefined;
  const { profile, auth } = useAuth();
  const { dispatch } = useGlobal();

  const { handleUser, userId, userExists, userProfile, loadingUser } = useUser();

  const routeId = useMemo(() => {
    if (!sanitizedUsername) return null;
    if (sanitizedUsername.includes(' ')) return sanitizedUsername.split(' ').pop()?.trim() || null;
    if (sanitizedUsername.includes('-')) return sanitizedUsername.split('-').pop()?.trim() || null;
    return sanitizedUsername;
  }, [sanitizedUsername]);

  useEffect(() => {
    if (routeId) handleUser(routeId)
  }, [routeId])

  // Debug logging removed

  const isOwnRoute = Boolean(
    routeId &&
    (routeId === auth.username || String(routeId) === String(auth.id))
  );

  const selectedProfile = userProfile ?? (isOwnRoute ? profile : null);

  if (loadingUser) {
    return (
      <ContainerProfile>
        <ContainerSkeletonProfile>
          <SkeletonCard>
            <SkeletonHeader>
              <SkeletonLine width="40%" />
              <SkeletonCircle />
            </SkeletonHeader>
            <SkeletonLine width="80%" />
            <SkeletonLine width="95%" />
            <SkeletonLine width="60%" />
          </SkeletonCard>
        </ContainerSkeletonProfile>
        <ContainerPostProfile>
          <SkeletonNoMarginCard>
            <SkeletonLine width="90%" />
            <SkeletonLine width="100%" height="120px" />
          </SkeletonNoMarginCard>
        </ContainerPostProfile>
      </ContainerProfile>
    )
  }

  if (!selectedProfile) return null;

  const { username, description, createAt, image, name } = selectedProfile;
  const url = getAvatarUrl(image, username);

  const socialmedia = selectedProfile.social
    ? (Object.keys(selectedProfile.social) as Array<keyof typeof selectedProfile.social>)
        .filter((key) => {
          const value = selectedProfile.social?.[key];
          return value !== undefined && value !== null && value !== '';
        })
        .map((key) => (
          <Social
            key={key}
            property={key}
            value={selectedProfile.social?.[key] ?? ''}
          />
        ))
    : null;


  const handleFooter = () => {
    dispatch({type: IS_FOOTER, payload: true})
  }

  if (!userExists) return <NotFound />

  return (
    <ContainerProfile hasTopMargin={!auth.id} onLoad={handleFooter}>
      <ContainerInfoProfile>
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
      </ContainerInfoProfile>
      <ContainerPostProfile>
        <Posts allAllowedPost={false} />
      </ContainerPostProfile>
    </ContainerProfile>
  )
}
