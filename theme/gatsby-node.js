const fs = require('fs')
const path = require(`path`)
const mkdirp = require('mkdirp')
const crypto = require(`crypto`)
const Debug = require(`debug`)
const { urlResolve } = require(`gatsby-core-utils`)

const debug = Debug(`gatsby-theme-bootstrap`)

// These are customizable theme options we only need to check once
let basePath
let contentPath
let assetPath

// These templates are simply data-fetching wrappers that import components
const PostTemplate = require.resolve(`./src/templates/post`)
const PostsTemplate = require.resolve(`./src/templates/posts`)

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState()

  basePath = themeOptions.basePath || `/`
  contentPath = themeOptions.contentPath || `content/posts`
  assetPath = themeOptions.assetPath || `content/assets`

  const dirs = [
    path.join(program.directory, contentPath),
    path.join(program.directory, assetPath),
  ]

  dirs.forEach(dir => {
    debug(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}
exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions
  createTypes(
    schema.buildObjectType({
      name: `BlogPost`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`,
        },
        slug: {
          type: `String!`,
        },
        date: { type: `Date`, extensions: { dateformat: {} } },
        tags: { type: `[String]!` },
        category: { type: `[String!]` },
        keywords: { type: `[String]!` },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
      },
      interfaces: [`Node`],
    })
  )
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      site {
        siteMetadata {
          title
          social {
            name
            url
          }
        }
      }
      mdxPages: allBlogPost(
        sort: { fields: [date, title], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            id
            excerpt
            slug
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic('<==== Error loading MDX files =====>', result.errors)
  }

  // Create Posts and Post pages.
  const {
    mdxPages,
    site: { siteMetadata },
  } = result.data
  const posts = mdxPages.edges
  const { title: siteTitle, social: socialLinks } = siteMetadata

  // Create a page for each Post
  posts.forEach(({ node: post }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    const { slug } = post
    createPage({
      path: slug,
      component: PostTemplate,
      context: {
        ...post,
        siteTitle,
        socialLinks,
        previous,
        next,
      },
    })
  })

  // // Create the Posts page
  createPage({
    path: basePath,
    component: PostsTemplate,
    context: {
      posts,
      siteTitle,
      socialLinks,
    },
  })
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNode, createParentChildLink } = actions

  const toPostPath = node => {
    const { dir } = path.parse(node.relativePath)
    return urlResolve(basePath, dir)
  }

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (node.internal.type === `Mdx` && source === contentPath) {
    const slug = toPostPath(fileNode).substring(13)

    const fieldData = {
      title: node.frontmatter.title,
      tags: node.frontmatter.tags || [],
      category: node.frontmatter.category || [],
      slug,
      date: node.frontmatter.date,
    }
    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> BlogPost`),
      parent: node.id,
      children: [],
      internal: {
        type: `BlogPost`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Blog Posts`,
      },
    })
    createParentChildLink({ parent: fileNode, child: node })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '../../theme.config$': path.join(
          __dirname,
          'src/semantic/theme.config'
        ),
      },
    },
  })
}
