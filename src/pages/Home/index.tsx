import React from 'react';
import Hero from '../../components/home/Hero';
import Description from '../../components/home/Description';
import { ContainerHome } from './styles';
import { useGlobal } from '../../hooks/useGlobal';

export const Home = (): JSX.Element => {

  const { setIsFooter } = useGlobal();

  return (
    <div onLoad={() => setIsFooter(false)}>
      <Hero />
      <ContainerHome>
        <h1 >Radio <br/> Enchufe Virtual</h1>
        <div className='full-width'>
          <Description />

        </div>
      </ContainerHome>
    </div>
  )
}
