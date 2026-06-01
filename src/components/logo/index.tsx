import React from 'react'
import { SvgStyle, LogoContainer } from './styles'

export const Logo = (): JSX.Element => {
  return (
    <LogoContainer className='Logo' to='/'>
      <SvgStyle
        version="1.0" xmlns="http://www.w3.org/2000/svg"  width="600.000000pt" height="600.000000pt" viewBox="0 0 600.000000 600.000000"  preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"> <path d="M0 3000 l0 -3000 3000 0 3000 0 0 3000 0 3000 -3000 0 -3000 0 0 -3000z m3610 1210 l0 -270 -904 -2 -905 -3 146 -252 146 -253 609 0 c340 0 608 -4 606 -9 -1 -4 -70 -126 -153 -269 l-150 -261 -630 0 -630 0 -457 791 c-252 435 -456 794 -454 797 2 3 628 5 1390 3 l1386 -2 0 -270z m1524 202 c-144 -259 -605 -1065 -1523 -2660 l-306 -532 -290 2 -289 3 -238 410 c-131 226 -283 488 -337 583 l-100 172 348 0 349 0 133 -230 c74 -126 136 -230 139 -230 7 0 541 917 1048 1800 l427 745 330 5 c182 3 334 3 338 2 4 -2 -9 -34 -29 -70z"/> </g>
      </SvgStyle>
      <span>Radio</span>
    </LogoContainer>
  )
}
