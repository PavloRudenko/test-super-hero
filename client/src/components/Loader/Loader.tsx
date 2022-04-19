import React, { FC } from 'react'
import { Variant } from 'react-bootstrap/esm/types'
import { Spinner } from 'react-bootstrap'

interface LoaderProps {
  isLoading: boolean
  variant?: Variant
  size?: 'sm'
}

export const Loader: FC<LoaderProps> = ({
  isLoading,
  size,
  variant = 'primary',
}) => (
  <Spinner
    variant={variant}
    hidden={!isLoading}
    animation="border"
    role="status"
    size={size}
  />
)
