import React, { FC } from 'react'

import { Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { SuperHero } from '../../entities/superhero.types'

import styles from './SuperHeroCard.module.scss'
import defaultImage from '../../public/default-superhero.jpg'

interface SuperHeroCardProps {
  superHero: SuperHero
}

export const SuperHeroCard: FC<SuperHeroCardProps> = ({ superHero }) => {
  const { _id: id, nickname, realName, imageNames } = superHero
  const [name] = imageNames
  const imageUrl = name ? `http://localhost:3001/${name._id}` : defaultImage

  return (
    <LinkContainer className={styles.LinkContainer} to={`/super-hero/${id}`}>
      <Card>
        <Card.Img variant="top" src={imageUrl} alt={`${nickname} photo`} />
        <Card.Body className="d-flex align-items-end justify-content-center">
          <Card.Title className="text-center">{realName}</Card.Title>
        </Card.Body>
      </Card>
    </LinkContainer>
  )
}
