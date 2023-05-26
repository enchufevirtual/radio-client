import React from 'react';
import HeroImage from '../../public/assets/hero.webp';
import { ContainerHero } from './styles';

const Hero = () => {
  return (
    <ContainerHero>
      <img src={HeroImage} alt="Hero Enchufe Virtual" />
    </ContainerHero>
  )
}

export default Hero
