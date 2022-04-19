import React, { FC } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar } from 'react-bootstrap'

import styles from './header.module.scss'

import { Logo } from '../Logo'

export const Header: FC = () => (
  <header>
    <Navbar bg="primary" variant="dark">
      <Container>
        <Logo className={styles.logo} />
        <LinkContainer to="/">
          <Navbar.Brand>Superhero</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/super-hero">
            <Nav.Link>Heros</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  </header>
)
