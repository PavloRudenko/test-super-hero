import React, { FC, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { Loader } from '../../components/Loader'
import { MyPagination } from '../../components/MyPagination'
import { SuperHeroCard } from '../../components/SuperHeroCard'
import { SuperHero } from '../../entities/superhero.types'

import styles from './Heros.module.scss'

export const HerosPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [superHeros, setSuperHeros] = useState<SuperHero[]>([])
  const [offset, setOffset] = useState(1)

  useEffect(() => {
    const getSuperHeros = async () => {
      setIsLoading(true)
      const data: SuperHero[] = await fetch(
        `http://localhost:3001/super-hero`
      ).then(data => data.json())
      setIsLoading(false)
      setSuperHeros(data)
    }
    getSuperHeros()
  }, [])

  return (
    <Container>
      <main className={styles.HerosPage}>
        <h1 className="mb-4">Superheros</h1>
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : superHeros.length ? (
          <div className={styles.container}>
            <Row xs={1} md={2} lg={5} className="g-3 mb-5">
              {superHeros.slice((offset - 1) * 5, offset * 5).map(superHero => (
                <Col key={superHero._id}>
                  <SuperHeroCard superHero={superHero} />
                </Col>
              ))}
            </Row>
            <Row>
              {superHeros.length > 5 && (
                <MyPagination
                  active={offset}
                  setActive={setOffset}
                  itemsLength={superHeros.length}
                />
              )}
            </Row>
          </div>
        ) : (
          <p className={styles.noHeros}>We don't have any superheros</p>
        )}
      </main>
    </Container>
  )
}
