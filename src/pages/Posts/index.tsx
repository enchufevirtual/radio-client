import React, { useEffect } from 'react';
import { ContainerPosts, ParagraphLogin, ButtonNextPrev, SkeletonCard, SkeletonCircle, SkeletonHeader, SkeletonLine } from './styles';
import { CardContainerPost } from '../../../src/components/posts/CardContainerPost';
import { useAuth } from '../../../src/hooks/useAuth';
import { usePost } from '../../../src/hooks/usePost';
import { PostAccess } from '../../../src/components/posts/PostAccess';
import { Form } from '../../../src/components/posts/Form';
import { Comments } from '../../../src/components/comments';

type AllAllowedPost = { allAllowedPost: boolean}

export const Posts = ({allAllowedPost}: AllAllowedPost): JSX.Element => {

  const { auth, profile, loadingPage } = useAuth();

  const {
    hasMoreResults,
    dataPosts,
    sendPost,
    nextQuery,
    showForm
  } = usePost();

  const showAuthSkeleton = loadingPage && allAllowedPost;

  return (
    <ContainerPosts>
      {showAuthSkeleton ? (
        <SkeletonCard>
          <SkeletonHeader>
            <SkeletonCircle />
            <SkeletonLine width="45%" />
          </SkeletonHeader>
          <SkeletonLine width="90%" />
          <SkeletonLine width="80%" />
          <SkeletonLine width="60%" />
        </SkeletonCard>
      ) : auth?.id && allAllowedPost ? (
        <PostAccess />
      ) : null}

      {auth?.id == profile.id && !allAllowedPost
        ? <PostAccess />
        : null
      }
      {
        loadingPage
        ? null
        : auth?.id
          ? null
          : (
            <ParagraphLogin>
              <a href="/login">Inicia sesión</a>
              para comenzar a publicar
            </ParagraphLogin>
          )
      }
      {showForm && <Form />}
      <CardContainerPost allAllowedPost={allAllowedPost} />
      {/* { hasMoreResults ? <ButtonNextPrev onClick={() => handleNextPrev("next")}>Next</ButtonNextPrev> : null }<br/>
      { nextPrev.offset ? <ButtonNextPrev onClick={() => handleNextPrev("prev")}>Prev</ButtonNextPrev> : null } */}
    </ContainerPosts>
  )
}
