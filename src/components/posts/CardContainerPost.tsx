import React from 'react';
import { usePost } from '../../../src/hooks/usePost';
import { CardPostItem } from './CardPostItem';
import { useAuth } from '../../../src/hooks/useAuth';
import { NoContent, SkeletonCard, SkeletonCircle, SkeletonHeader, SkeletonLine } from './styles';

type AllAllowedPost = { allAllowedPost: boolean}

export const CardContainerPost = ({allAllowedPost}: AllAllowedPost): JSX.Element => {

  const { posts, loadingPosts } = usePost();
  const { profile } = useAuth();
  let dataCard

  const filterPost = !allAllowedPost
  ? posts.filter(post => post.userId == profile.id)
  : posts;

  dataCard = filterPost.map((post, index) => (
    <CardPostItem
      key={post.id ?? index}
      id={post.id}
      user={post.user}
      image={post.image}
      audio={post.audio}
      nameAudio={post.nameAudio}
      content={post.content}
      createAt={post.createAt}
      />
    ))

  if (!filterPost.length && !loadingPosts) {
    return <NoContent>Aún no hay publicaciones</NoContent>
  }

  return (
    <>
      {dataCard}
      {loadingPosts && (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`}>
              <SkeletonHeader>
                <SkeletonCircle />
                <SkeletonLine width="40%" />
              </SkeletonHeader>
              <SkeletonLine width="80%" />
              <SkeletonLine width="95%" />
              <SkeletonLine width="60%" />
              <SkeletonLine width="100%" height="80px" />
            </SkeletonCard>
          ))}
        </>
      )}
    </>
  )
}
