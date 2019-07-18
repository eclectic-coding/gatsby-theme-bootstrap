import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import { Styled, css } from 'theme-ui'
import { FaCalendarDay as Date } from 'react-icons/fa'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Footer from '../components/home-footer'

const Posts = ({ location, posts, siteTitle, socialLinks }) => (
  <Layout location={location} title={siteTitle}>
    <main>
      {posts.map(({ node }) => {
        const title = node.title || node.slug
        const keywords = node.keywords || []
        return (
          <Fragment key={node.slug}>
            <SEO title="Home" keywords={keywords} />
            <div
              css={css({
                px: `1rem`,
                mt: `2rem`,
              })}
            >
              <Styled.h2
                css={css({
                  mb: 1,
                })}
              >
                <Styled.a
                  as={Link}
                  css={{
                    textDecoration: `none`,
                  }}
                  to={`/${node.slug}`}
                >
                  {title}
                </Styled.a>
              </Styled.h2>
              <Date
                css={css({
                  color: `primary`,
                  mr: 2,
                  md: 1,
                })}
              />
              <small
                css={css({
                  mb: 2,
                })}
              >
                {node.date}
              </small>
              <Styled.p
                css={css({
                  mt: 1,
                })}
              >
                {node.excerpt}
              </Styled.p>
            </div>
          </Fragment>
        )
      })}
    </main>
    <Footer socialLinks={socialLinks} />
  </Layout>
)

export default Posts
