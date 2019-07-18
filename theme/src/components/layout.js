import React, { Fragment } from 'react'

import Header from './header'
import Hero from './hero'

import '../styles/custom.scss'

export default ({ children, ...props }) => (
  <Fragment>
    <Header {...props} />
    <Hero />
    <div>
      <div>{children}</div>
    </div>
  </Fragment>
)
