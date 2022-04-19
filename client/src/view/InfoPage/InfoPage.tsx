import React, { FC, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { SuperHeroForm } from '../../components/SuperHeroForm'
import { Loader } from '../../components/Loader'
import { SuperHero } from '../../entities/superhero.types'

import styles from './InfoPage.module.scss'
import defaultImage from '../../public/default-superhero.jpg'
import { defaultSuperHero } from '../../default'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'

interface InfoPageProps {}

export const InfoPage: FC<InfoPageProps> = () => {
  const { id } = useParams()
  const [showAlert, setShowAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [superHero, setSuperHero] = useState<SuperHero>(defaultSuperHero)
  const [isShowContent, setIsShowContent] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsShowContent(true)
    }, 150)

    return () => {
      setIsShowContent(false)
    }
  }, [])

  useEffect(() => {
    const getSuperHeroById = async (): Promise<void> => {
      setIsLoading(true)
      const data: SuperHero = await fetch(
        `http://localhost:3001/super-hero/${id}`
      ).then(data => data.json())
      setIsLoading(false)
      setSuperHero(data)
    }
    getSuperHeroById()
  }, [id])

  const handleClickImage = (id: string): void => {
    setSuperHero(prev => ({
      ...prev,
      imageNames: prev.imageNames.map(name =>
        name._id === id ? { ...name, needDelete: !name.needDelete } : name
      ),
    }))
  }

  return (
    <Container>
      <main className={styles.InfoPage}>
        <LinkContainer className="align-self-start" to="/super-hero">
          <Button>Back</Button>
        </LinkContainer>
        <h1 className="mb-4">Info page</h1>
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <div className="d-flex flex-column align-items-center">
            <div
              className={[
                styles.imageWrapper,
                isShowContent && styles.show,
                'd-flex',
                'mb-4',
              ].join(' ')}
            >
              <ul className={styles.infoList}>
                <li>Leave</li>
                <li>Delete</li>
              </ul>
              {superHero.imageNames.length ? (
                superHero.imageNames.map(name => (
                  <div
                    key={name._id}
                    className={[
                      styles.imageBox,
                      name.needDelete && styles.pickImage,
                    ].join(' ')}
                    onClick={() => handleClickImage(name._id)}
                  >
                    <img
                      alt="Superhero"
                      width={150}
                      src={`http://localhost:3001/${name._id}`}
                    />
                  </div>
                ))
              ) : (
                <img width={100} src={defaultImage} alt="Default" />
              )}
            </div>
            <SuperHeroForm
              isShow={isShowContent}
              textSubmitBnt="Update"
              method="PATCH"
              url={`/${superHero._id}`}
              setShowAlert={setShowAlert}
              setSuperHero={setSuperHero}
              superHero={superHero}
            />
          </div>
        )}
      </main>
      <Alert
        title={superHero.realName}
        body={`Your superhero ${superHero.nickname} has been updated`}
        setShow={setShowAlert}
        show={showAlert}
      />
    </Container>
  )
}
