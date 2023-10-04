import React from 'react';
import {
  Form as FormStyles,
  PostUser,
  ContainerForm,
  BackFormOpacity,
  ContainerScroll,
  PreviousImage,
  ContainerSvgForm,
  ContainerPreviewAudio,
  LabelForm
} from './styles';
import { useGlobal } from '../../../src/hooks/useGlobal';
import { usePost } from '../../../src/hooks/usePost';
import { useAuth } from '../../../src/hooks/useAuth';
import { Auth, MyPostTypes, StateUpdater } from '../../../src/context/types';
import Close from '../../public/assets/close.svg';
import { ImageSvg } from './ImageSvg';
import { AudioSvg } from './AudioSvg';
import { AlertMessage } from '../alert';
import { PREVIEW_IMAGE } from '../../../src/context/constants';

export const Form = (): JSX.Element => {

  const { auth } = useAuth();
  const { previewImage, handleFile, previewAudio, dispatch } = useGlobal();

  const {
    handlePost,
    myPost,
    handleChange,
    formRef,
    textAreaRef,
    setMyPost,
    setShowForm,
    setCloseImage,
    setCloseAudio,
  } = usePost();

  const CloseForm = () => {
    dispatch({type: PREVIEW_IMAGE, payload: false});
    setTimeout(() => {
      setShowForm(false);
    }, 10);
  }


  let sizePreviewAudio = "";
  sizePreviewAudio = String(Math.round(previewAudio?.size / 1048576));

  const url = `${auth?.image
    ? `${process.env.BACKEND_URL}/${auth?.image}`
    : `https://api.multiavatar.com/${auth?.name.trim()}.svg`}`

  return (
    <BackFormOpacity>
      <ContainerForm>
        <FormStyles ref={formRef} onSubmit={handlePost} encType='multipart/form-data'>
          <img onClick={CloseForm} className='CloseForm' src={Close} alt="Close Form" />
          <PostUser className='PostUser'>
            <img src={url} alt="User Auth" />
            <p>{auth?.name}</p>
            <AlertMessage data={{id: "fileError"}} />
          </PostUser>
          <ContainerScroll>
            <div className='ContainerInputTextarea'>
              <textarea
                ref={textAreaRef}
                id="content"
                name="content"
                style={{width: "300px", height: "100px"}}
                placeholder='¿Sobre qué quieres hablar?'
                value={myPost.content}
                onChange={handleChange}
                required
              />
              <PreviousImage>
                { previewImage ?
                  (
                    <>
                    <img onClick={() => setCloseImage(true)} src={Close} alt="Cancel Image" />
                    <img src={`${previewImage}`} alt="Imagen Previa del Post" />
                    </>
                  ) : null
                }
                { previewAudio?.name ?
                  (
                    <ContainerPreviewAudio style={{alignSelf: "flex-center"}}>
                      <img onClick={() => setCloseAudio(true)} src={Close} alt="Cancel Audio" />
                      <p>{previewAudio?.name}</p>
                      <small>{sizePreviewAudio} MB</small>
                    </ContainerPreviewAudio>
                  ) : null
                }
                <ContainerSvgForm style={{alignSelf: "flex-start"}}>
                  <LabelForm htmlFor="image">
                    <ImageSvg />
                    <input
                      type="file"
                      style={{display: "none"}}
                      name="image"
                      id="image"
                      accept="image/png, image/gif, image/jpeg, image/jpg"
                      onChange={(event) =>
                        handleFile(
                          event,
                          setMyPost as StateUpdater<Auth | MyPostTypes>,
                        )}
                    />
                  </LabelForm>
                  <LabelForm htmlFor="audio">
                    <AudioSvg />
                    <input
                      type="file"
                      style={{display: "none"}}
                      name="audio"
                      id="audio"
                      accept="audio/mpeg, audio/wav, audio/mp3"
                      onChange={(event) =>
                        handleFile(
                          event,
                          setMyPost as StateUpdater<Auth | MyPostTypes>,
                        )}
                    />
                  </LabelForm>
                  <p>Inspíranos con tu arte 🎨🎶</p>
                </ContainerSvgForm>
              </PreviousImage>
            </div>
          </ContainerScroll>
          <div>
            <button aria-label='Publicar'>Publicar</button>
          </div>
        </FormStyles>
     </ContainerForm>
    </BackFormOpacity>

  )
}
