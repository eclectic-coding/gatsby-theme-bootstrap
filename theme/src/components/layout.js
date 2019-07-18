import React from 'react'
import { css, Styled } from 'theme-ui'
import Header from './header'
import Hero from './hero'

export default ({ children, ...props }) => (
  <Styled.root>
    <Header {...props} />
    <Hero />
    <div>
      <div
        css={css({
          maxWidth: `container`,
          mx: `auto`,
          //   px: 3,
          py: 1,
        })}
      >
        {children}
      </div>
    </div>
  </Styled.root>
)
