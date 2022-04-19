import React, { FC } from 'react'

import LogoSrc from '../../public/logo.png'

interface LogoProps {
  className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => (
  <img className={className} width={80} height={50} src={LogoSrc} alt="Logo" />
)
