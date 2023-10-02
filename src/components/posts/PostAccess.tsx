import React, { useEffect, useState, useRef } from 'react';
import { PostAccessStyles, PostHistory, ContainerSvg, DisplaySvg, Label } from './styles';
import { useAuth } from '../../../src/hooks/useAuth';
import { usePost } from '../../../src/hooks/usePost';
import { useGlobal } from '../../../src/hooks/useGlobal';
import { Auth, MyPostTypes, StateUpdater } from '../../../src/context/types';
import { ImageSvg } from './ImageSvg';
import { AudioSvg } from './AudioSvg';

export const PostAccess = (): JSX.Element => {

  const { previewImage, previewAudio, handleFile } = useGlobal();
  const { auth } =  useAuth();
  const { handleShowForm, setMyPost } = usePost();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if(!mounted) {
      setMounted(true)
      return;
    }
    handleShowForm()
  }, [previewImage, previewAudio])

  const url = `${auth?.image
    ? `${process.env.BACKEND_URL}/${auth?.image}`
    : `https://api.multiavatar.com/${auth?.name ? auth?.name.trim() : "radio-ev"}.svg`}`


  return (
    <PostAccessStyles>
      <PostHistory onClick={handleShowForm}>
        <img src={url} alt="User" />
        <p>Crear publicación</p>
      </PostHistory>
      <hr />
      <ContainerSvg>
        <DisplaySvg>
          <Label onClick={handleShowForm} htmlFor="image">
            <ImageSvg />
            <p>Foto</p>
          </Label>
          <input
            style={{display: "none"}}
            type="file"
            name="image"
            id="image"
            accept="image/png, image/gif, image/jpeg, image/jpg"
            onChange={(event) =>
              handleFile(
                event,
                setMyPost as StateUpdater<Auth | MyPostTypes>,
              )}
          />
        </DisplaySvg>
        <DisplaySvg>
          <Label onClick={handleShowForm} htmlFor="audio">
            <AudioSvg />
            <p>Audio</p>
          </Label>
          <input
            style={{display: "none"}}
            type="file"
            name="audio"
            id="audio"
            accept="audio/mpeg, audio/wav, audio/mp3"
            onChange={(event) =>
              handleFile(
                event,
                setMyPost as StateUpdater<Auth | MyPostTypes>,
              )}
          />
        </DisplaySvg>
      </ContainerSvg>
    </PostAccessStyles>
  )
}
