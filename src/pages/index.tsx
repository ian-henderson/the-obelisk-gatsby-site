import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"

import { Layout, SEO } from "../components"
import { Site } from "../types"

type DataProps = {
  allContentfulBlogPost: {
    edges: Array<any>
  }
  site: Site
}

export default function Index({ data, location }: PageProps<DataProps>) {
  const siteTitle = data.site?.siteMetadata?.title || `Title`
  const siteDescription = data.site?.siteMetadata?.description || `Description`
  const posts = data.allContentfulBlogPost.edges

  if (posts.length === 0) {
    return (
      <Layout title={siteTitle} {...{ location }}>
        <SEO />
        <p>No articles found.</p>
      </Layout>
    )
  }

  function renderPost({
    node: {
      author: { slug: authorSlug },
      description,
      publishDate,
      slug,
      title,
    },
  }) {
    return (
      <li key={slug}>
        <article
          className="post-list-item"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h2>
              <Link to={`${authorSlug}/${slug}`} itemProp="url">
                <span itemProp="headline">{title || "Title"}</span>
              </Link>
            </h2>
            <small>{publishDate}</small>
          </header>
          <section>
            <p>{description?.childMarkdownRemark?.excerpt}</p>
          </section>
        </article>
      </li>
    )
  }

  return (
    <Layout title={siteTitle} {...{ location }}>
      <SEO />
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
          author {
            slug
          }
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          description {
            childMarkdownRemark {
              excerpt
            }
          }
        }
      }
    }
  }
`
