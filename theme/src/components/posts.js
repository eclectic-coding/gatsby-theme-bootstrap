import React, { Fragment } from 'react'
import { Link } from 'gatsby'
// import { Styled, css } from 'theme-ui'
import { FaCalendarDay as Date } from 'react-icons/fa'
import { Container } from 'semantic-ui-react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Footer from '../components/home-footer'

const Posts = ({ location, posts, siteTitle, socialLinks }) => (
  <Layout location={location} title={siteTitle}>
    <Container fluid style={{ width: `80vw`, margin: `0 auto` }}>
      {posts.map(({ node }) => {
        const title = node.title || node.slug
        const keywords = node.keywords || []
        return (
          <Fragment key={node.slug}>
            <SEO title="Home" keywords={keywords} />
            <div className="mt-4">
              <h2>
                <Link style={{ textDecoration: `none` }} to={`/${node.slug}`}>
                  {title}
                </Link>
              </h2>
              <Date className="primary mr-2 mb-2" />
              <small className="mb-2">{node.date}</small>
              <p className="mb-4">{node.excerpt}</p>
            </div>
          </Fragment>
        )
      })}
    </Container>
    <Footer socialLinks={socialLinks} />
  </Layout>
)

export default Posts
