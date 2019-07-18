import React from 'react'
import { Link } from 'gatsby'
import { Container } from 'semantic-ui-react'

const rootPath = `${__PATH_PREFIX__}/`

const Title = ({ children }) => {
  return (
    <h1 style={{ padding: `1rem 0` }}>
      <Link to={`/`}>{children}</Link>
    </h1>
  )
}

export default ({ children, title, ...props }) => {
  return (
    <Container>
      <header>
        <div>
          <div>
            <Title {...props}>{title}</Title>
            {children}
          </div>
          {props.location.pathname === rootPath}
        </div>
      </header>
    </Container>
  )
}
