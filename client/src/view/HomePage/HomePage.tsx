import React, { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import { SuperHeroForm } from '../../components/SuperHeroForm'
import { Alert } from '../../components/Alert'
import { defaultSuperHero } from '../../default'
import { SuperHero } from '../../entities/superhero.types'

import styles from './HomePage.module.scss'

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [superHero, setSuperHero] = useState<SuperHero>(defaultSuperHero)
  const [isShowContent, setIsShowContent] = useState(false)

  useEffect(() => {
    setIsShowContent(true)

    return () => {
      setIsShowContent(false)
    }
  }, [])

  return (
    <Container>
      <main className={styles.HomePage}>
        <h1>Add your Superhero</h1>
        <SuperHeroForm
          isShow={isShowContent}
          textSubmitBnt="Add"
          url=""
          method="POST"
          setShowAlert={setShowAlert}
          setSuperHero={setSuperHero}
          superHero={defaultSuperHero}
        />
      </main>
      <Alert
        setShow={setShowAlert}
        show={showAlert}
        title={superHero.realName}
        body={`Your superhero ${superHero.nickname} has been created`}
      />
    </Container>
  )
}
