import React from 'react';
import { useGlobal } from '../../hooks/useGlobal';
import { IS_FOOTER } from '../../../src/context/constants';
import { Posts } from '../Posts';

export const Home = (): JSX.Element => {

  const { dispatch, openChat } = useGlobal();

  const handleFooter = () => {
    dispatch({type: IS_FOOTER, payload: false})
  }

  return (
     <Posts allAllowedPost={true} />
  )
}
