import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { HeaderWrapper } from '../../components/HeaderWrapper'
import { HerosPage } from '../Heros'
import { HomePage } from '../HomePage'
import { InfoPage } from '../InfoPage'
import './App.scss'

export const App = () => {
  return (
    <Routes>
      <>
        <Route
          path="/"
          element={
            <HeaderWrapper>
              <HomePage />
            </HeaderWrapper>
          }
        />
        <Route
          path="/super-hero"
          element={
            <HeaderWrapper>
              <HerosPage />
            </HeaderWrapper>
          }
        />
        <Route
          path="/super-hero/:id"
          element={
            <HeaderWrapper>
              <InfoPage />
            </HeaderWrapper>
          }
        />
      </>
    </Routes>
  )
}
