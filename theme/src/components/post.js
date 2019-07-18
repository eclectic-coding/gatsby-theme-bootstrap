import React from 'react'
import { FaCalendar } from 'react-icons/fa'

// import PostFooter from "../components/post-footer"
import Layout from '../components/layout'
import SEO from '../components/seo'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import '../styles/custom.scss'
import { Container } from 'reactstrap'

const Post = ({
  data: {
    post,
    site: {
      siteMetadata: { title },
    },
  },
  location,
  previous,
  next,
}) => (
  <Layout location={location} title={title}>
    <SEO title={post.title} description={post.excerpt} />
    <Container className="primary mt-4">
      <h1>{post.title}</h1>
      <p>
        <FaCalendar className="text-primary mr-2" />
        <small>{post.date}</small>
      </p>
      <MDXRenderer>{post.body}</MDXRenderer>
    </Container>
    {/* <PostFooter {...{ previous, next }} /> */}
  </Layout>
)

export default Post
