import React, { Fragment } from 'react'

import '../styles/custom.scss'
import { Row, Col } from 'reactstrap'

const Footer = ({ socialLinks }) => (
  <footer>
    <Row className="fluid bg-light px-0 mx-0 w-100 mt-5 mb-0">
      <Col className="mx-auto text-center">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        {` `}&bull;{` `}
        {socialLinks.map((platform, i, arr) => (
          <Fragment key={platform.url}>
            <a href={platform.url} target="_blank" rel="noopener noreferrer">
              {platform.name}
            </a>
            {arr.length - 1 !== i && (
              <Fragment>
                {` `}&bull;{` `}
              </Fragment>
            )}
          </Fragment>
        ))}
      </Col>
    </Row>
  </footer>
)
export default Footer
