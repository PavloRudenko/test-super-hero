import React, { FC } from 'react'
import { Pagination } from 'react-bootstrap'

import styles from './MyPagination.module.scss'

interface MyPaginationProps {
  itemsLength: number
  active: number
  setActive: (item: number) => void
}

export const MyPagination: FC<MyPaginationProps> = ({
  itemsLength,
  active,
  setActive,
}) => {
  const items: number[] = []

  for (let i = 1; i < itemsLength / 5 + 1; i++) {
    items.push(i)
  }

  return (
    <Pagination className="justify-content-center">
      {items.map(item => (
        <Pagination.Item
          onClick={() => setActive(item)}
          key={item}
          active={item === active}
        >
          {item}
        </Pagination.Item>
      ))}
    </Pagination>
  )
}
