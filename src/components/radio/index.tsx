import React, { useState, useRef, useEffect, MouseEventHandler } from 'react';
import { Radio as RadioStyle, DjRadioDetails, ChatRadioEv, PlayPause, AdminDetails, MarqueeText, MarqueeContainer, ChatLogoStyle, ContainerPlayVolume } from './styles';
import { useGlobal } from '../../hooks/useGlobal';
import { RadioLogo } from './RadioLogo';
import { ChatLogo } from './ChatLogo';
import { VolumeLogo } from './VolumeLogo';
import { Volume } from './Volume';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const Radio = () => {

  const { toggleAudio, play, audioRef, openChat, handleChat } = useGlobal();

  const [openVolume, setOpenVolume] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const textRef = useRef(null);
  const volumeLogoRef = useRef(null);
  const containerVolumeRef = useRef(null);

  const match = useMediaQuery('(min-width: 991px)');

  useEffect(() => {
    textRef.current.style.animationPlayState = 'running';
  }, []);

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

  return (
    <RadioStyle className="Radio">
      <DjRadioDetails>
        <RadioLogo />
        <AdminDetails>
          <h2>Radio Ev</h2>
          <MarqueeContainer>
            <MarqueeText ref={textRef}>Tu nueva experiencia musical</MarqueeText>
          </MarqueeContainer>
        </AdminDetails>
      </DjRadioDetails>
      <audio ref={audioRef}>
          <source src="https://stream.zeno.fm/ezj7hvwkfk2tv" type="audio/mpeg" />
      </audio>
      <ContainerPlayVolume className='box'>
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
