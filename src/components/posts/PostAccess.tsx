import React, { useEffect, useState, useRef } from 'react';
import { PostAccessStyles, PostHistory, ContainerSvg, DisplaySvg, Label } from './styles';
import { useAuth } from '../../../src/hooks/useAuth';
import { usePost } from '../../../src/hooks/usePost';
import { useGlobal } from '../../../src/hooks/useGlobal';
import { Auth, MyPostTypes, StateUpdater } from '../../../src/context/types';
import { ImageSvg } from './ImageSvg';
import { AudioSvg } from './AudioSvg';
import { getAvatarUrl } from '../../helpers/getAvatarUrl';

export const PostAccess = (): JSX.Element => {

  const { previewImage, previewAudio, handleFile, messageNotification } = useGlobal();
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

  const url = getAvatarUrl(auth?.image, auth?.username);

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
          <Label
            onClick={() => messageNotification('fileError', 'por ahora no podemos ponernos romanticos')}
          >
            <AudioSvg />
            <p>Audio</p>
          </Label>
        </DisplaySvg>
      </ContainerSvg>
    </PostAccessStyles>
  )
}
