import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import { formGroups } from './formGroup'
import {
  SuperHero,
  SuperHeroForInputKeys,
} from '../../entities/superhero.types'
import { Loader } from '../Loader'

import styles from './SuperHeroForm.module.scss'

interface SuperHeroFormProps {
  setShowAlert(value: boolean): void
  superHero: SuperHero
  setSuperHero(superHero: SuperHero): void
  method: 'POST' | 'PATCH'
  url: string
  textSubmitBnt: string
  isShow: boolean
}

export const SuperHeroForm: FC<SuperHeroFormProps> = ({
  superHero,
  setSuperHero,
  setShowAlert,
  method,
  url = '',
  textSubmitBnt,
  isShow,
}) => {
  const history = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const keys = Object.keys(superHero).slice(1, 6)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)
    const { currentTarget: form } = e
    const body = new FormData(form)

    if (method === 'PATCH') {
      body.append('imageNames', JSON.stringify(superHero.imageNames))
    }

    const data: SuperHero = await fetch(
      `http://localhost:3001/super-hero${url}`,
      {
        method,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3001',
        },
        body,
      }
    ).then(res => res.json())
    setIsLoading(false)
    form.reset()
    setShowAlert(true)
    setSuperHero(data)
  }

  const onDelete = async () => {
    setIsLoading(true)
    setIsLoading(false)

    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure?')) {
      await fetch(
        `http://localhost:3001/super-hero${url}?imageNames=${JSON.stringify(
          superHero.imageNames
        )}`,
        {
          method: 'DELETE',
        }
      )

      history('/super-hero')
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      className={[styles.AddSuperHeroForm, isShow && styles.show].join(' ')}
    >
      {formGroups.map(
        (
          {
            controlId,
            placeholder,
            labelText,
            type = 'text',
            multiple,
            accept,
            required,
          },
          i
        ) => {
          const key = keys[i] as SuperHeroForInputKeys
          if (method === 'PATCH' && type === 'file') {
            required = false
          }

          return (
            <Form.Group key={i} className="mb-3" controlId={controlId}>
              <Form.Label>{labelText}</Form.Label>
              <Form.Control
                name={controlId}
                required={required}
                accept={accept}
                multiple={multiple}
                type={type}
                placeholder={placeholder}
                defaultValue={superHero[key]}
              />
            </Form.Group>
          )
        }
      )}
      <div className="d-flex justify-content-between">
        <Button
          className="mr-2"
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          <Loader variant="secondary" isLoading={isLoading} size="sm" />
          {isLoading ? '  Loading...' : `${textSubmitBnt} superhero`}
        </Button>
        {method === 'PATCH' && (
          <Button
            onClick={onDelete}
            type="button"
            variant="danger"
            disabled={isLoading}
          >
            <Loader isLoading={isLoading} size="sm" />
            {isLoading ? '  Loading...' : 'Delete superhero'}
          </Button>
        )}
      </div>
    </Form>
  )
}
