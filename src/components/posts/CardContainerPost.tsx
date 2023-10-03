import React from 'react';
import { usePost } from '../../../src/hooks/usePost';
import { CardPostItem } from './CardPostItem';
import { useAuth } from '../../../src/hooks/useAuth';
import { NoContent } from './styles';

type AllAllowedPost = { allAllowedPost: boolean}

export const CardContainerPost = ({allAllowedPost}: AllAllowedPost): JSX.Element => {

  const { posts } = usePost();
  const { profile } = useAuth();
  let dataCard

  const filterPost = !allAllowedPost
  ? posts.filter(post => post.userId == profile.id)
  : posts;

  dataCard = filterPost.map((post, index) => (
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
       { dataCard.length
        ? dataCard
        : <NoContent>Aún no hay publicaciones</NoContent>
       }
    </>
  )
}
