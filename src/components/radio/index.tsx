import React, { useState, useRef, useEffect, MouseEventHandler } from 'react';
import { Radio as RadioStyle, DjRadioDetails, ChatRadioEv, PlayPause, AdminDetails, MarqueeText, MarqueeContainer, ChatLogoStyle, ContainerPlayVolume } from './styles';
import { useGlobal } from '../../hooks/useGlobal';
import { RadioLogo } from './RadioLogo';
import { ChatLogo } from './ChatLogo';
import { VolumeLogo } from './VolumeLogo';
import { Volume } from './Volume';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { PLAY, IS_PLAYING } from '../../../src/context/constants';

export const Radio = () => {

  const { toggleAudio, play, audioRef, setAudioRef, openChat, handleChat, currentSong, dispatch, streamUrl, currentAudio, audioTitle, playingFrom, switchToRadio } = useGlobal();

  const [openVolume, setOpenVolume] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const textRef = useRef(null);
  const volumeLogoRef = useRef(null);
  const containerVolumeRef = useRef(null);

  const match = useMediaQuery('(min-width: 991px)');

  useEffect(() => {
    textRef.current.style.animationPlayState = 'running';
  }, []);

  const handlePlay = () => {
    dispatch({type: PLAY, payload: false});
    dispatch({type: IS_PLAYING, payload: false});
  }

  const displayTitle = playingFrom === 'radio' ? currentSong : audioTitle;

  const handleLogoClick = () => {
    switchToRadio();
  }

  const handleOpenVolume = () => {
    setOpenVolume(!openVolume);
  }

  const handleClickOutsideVolume = (event: MouseEvent) => {
    if (volumeLogoRef.current &&
      !volumeLogoRef.current.contains(event.target as Node) &&
      containerVolumeRef.current &&
      !containerVolumeRef.current.contains(event.target)
    ) {
      setOpenVolume(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideVolume);

    return () => {
      document.removeEventListener('click', handleClickOutsideVolume);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentAudio && streamUrl) {
      audio.src = streamUrl;
    }
  }, [streamUrl, currentAudio]);

  return (
    <RadioStyle className="Radio">
      <DjRadioDetails>
        <RadioLogo onClick={handleLogoClick} />
        <AdminDetails>
          <h2>Radio Ev</h2>
          <MarqueeContainer>
            <MarqueeText ref={textRef}>{displayTitle}</MarqueeText>
          </MarqueeContainer>
        </AdminDetails>
      </DjRadioDetails>
      <audio 
        onEnded={handlePlay} 
        ref={setAudioRef}
        crossOrigin="anonymous"
        preload="auto"
      />
      <ContainerPlayVolume className='box'>
       <div
          style={{
            color: 'white',
            fontSize: '12px'
          }}
        >
          Estado Global: {play ? 'PLAYING' : 'PAUSED'}

          <br />

          Audio Ref: {audioRef.current ? 'EXISTE' : 'NULL'}
        </div>
        <PlayPause aria-label='PlayPause' type='button' onClick={() => toggleAudio()}>
            <span className={play ? "play active" : "play"}></span>
            <span className={play ? "pause active" : "pause"}></span>
        </PlayPause>
        {match && <VolumeLogo handleOpenVolume={handleOpenVolume} volumeLogoRef={volumeLogoRef} />}
        {openVolume && match && <Volume containerVolumeRef={containerVolumeRef} />}
      </ContainerPlayVolume>
      <ChatRadioEv className="chat">
        <ChatLogoStyle>
          <ChatLogo handleChat={handleChat} />
          { mouseOver || openChat  ? <span></span> : null }
        </ChatLogoStyle>
      </ChatRadioEv>
    </RadioStyle>
  )
}
