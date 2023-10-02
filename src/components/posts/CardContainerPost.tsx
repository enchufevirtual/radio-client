import React, { useRef } from 'react';
import { usePost } from '../../../src/hooks/usePost';
import { CardPostItem } from './CardPostItem';
import { useAuth } from '../../../src/hooks/useAuth';

type AllAllowedPost = { allAllowedPost: boolean}

export const CardContainerPost = ({allAllowedPost}: AllAllowedPost): JSX.Element => {

  const { posts } = usePost();
  const { profile } = useAuth();

  const filterPost = !allAllowedPost
    ? posts.filter(post => post.userId == profile.id)
    : posts;

  const dataCard = filterPost.map((post, index) => (
    <CardPostItem
      key={index}
      id={post.id}
      user={post.user}
      image={post.image}
      audio={post.audio}
      nameAudio={post.nameAudio}
      content={post.content}
      createAt={post.createAt}
      />
    ))

  return (
    <>
       {dataCard}
    </>
  )
}
