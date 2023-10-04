import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CardPost, PostAuthor, AudioControl, PostContent } from './styles';
import { formatDateTime } from '../../../src/helpers/formatDateTime';
import { CardPostItemTypes } from '../../../src/context/types';
import { useGlobal } from '../../../src/hooks/useGlobal';
import { useAuth } from '../../../src/hooks/useAuth';
import { Comments } from '../comments';

export const CardPostItem = ({ user, audio, nameAudio, id, image, content, createAt }: CardPostItemTypes): JSX.Element => {

  const [timeAgo, setTimeAgo] = useState("");
  const { toggleAudio } = useGlobal();
  const { auth } = useAuth();

  let newNameAudio = ""
  newNameAudio = nameAudio.split('.').slice(0, -1).join('.')
  if (!nameAudio.match(/\.mp3$/i)) {
    newNameAudio = nameAudio
  }

  const url = `${user?.image
    ? `${process.env.BACKEND_URL}/${user?.image}`
    : `https://api.multiavatar.com/${user?.name.trim()}.svg`}`;

  const postImage = `${image
    ? `${process.env.BACKEND_URL}/${image}`
    : null }`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeAgo = formatDateTime(createAt);
      setTimeAgo(newTimeAgo);
    }, 60000); // Updated every minute

    const initialTimeAgo = formatDateTime(createAt);
    setTimeAgo(initialTimeAgo);

    return () => clearInterval(intervalId);
  }, [createAt]);


  return (
    <CardPost className='ContentPost'>
      <PostAuthor>
        <Link to={`${auth?.id}` ? `/${user?.username}` : ""}><img src={url} alt="Author" /></Link>
        <div className='Author'>
          <Link to={`${auth?.id}` ? `/${user?.username}` : ""}>
            {user?.username ?? 'Autor desconocido'}
          </Link>
          <p>{timeAgo}</p>
        </div>
      </PostAuthor>
      <PostContent>
        <p>{content}</p>
      </PostContent>
      { image && <img src={postImage} alt="Post Image" /> }
      { audio && (
        <AudioControl key={audio}>
          <p>{newNameAudio}</p>
          <button data-id={id} onClick={() => toggleAudio(audio)}>Play</button>
        </AudioControl>
      )}
      <Comments />
    </CardPost>
  )
}
