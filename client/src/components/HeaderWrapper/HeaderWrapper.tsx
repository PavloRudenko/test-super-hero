import React, { FC } from 'react'

import { Header } from '../Header'

interface HeaderWrapperProps {
  children: JSX.Element[] | JSX.Element
}

export const HeaderWrapper: FC<HeaderWrapperProps> = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
)
