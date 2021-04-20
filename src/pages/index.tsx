import * as React from "react"
import { Link, graphql } from "gatsby"

import { Layout, SEO } from "../components"

export default function Index({ data, location }) {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteDescription = data.site.siteMetadata?.description || `Description`
  const posts = data.allContentfulBlogPost.edges

  if (posts.length === 0) {
    return (
      <Layout title={siteTitle} {...{ location }}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No articles posts found. Add markdown posts to "content/article" (or
          the directory you specified for the "gatsby-source-filesystem" plugin
          in gatsby-config.js).
        </p>
      </Layout>
    )
  }

  function renderPost({ node: { description, publishDate, slug, title } }) {
    return (
      <li key={slug}>
        <article
          className="post-list-item"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h2>
              <Link to={`article/${slug}`} itemProp="url">
                <span itemProp="headline">{title || "Title"}</span>
              </Link>
            </h2>
            <small>{publishDate}</small>
          </header>
          <section>
            <p
              dangerouslySetInnerHTML={{
                __html: description?.childMarkdownRemark?.html || "",
              }}
              itemProp="description"
            />
          </section>
        </article>
      </li>
    )
  }

  return (
    <Layout title={siteTitle} {...{ location }}>
      <SEO title="All posts" />
      <div className="bio">{siteDescription}</div>
      <ol style={{ listStyle: `none` }}>{posts.map(renderPost)}</ol>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        description
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
