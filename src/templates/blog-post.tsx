import * as React from "react"
import { Link, graphql } from "gatsby"

// prettier-ignore
import { Layout, SEO } from "../components"

export default function BlogPostTemplate({ data, location }) {
  const post = data.contentfulBlogPost
  const siteTitle = data.site?.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout title={siteTitle} {...{ location }}>
      <SEO
        description={post?.description?.internal?.content}
        title={post?.title}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post?.title}</h1>
          <p>{post?.publishDate}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{
            __html: post?.body?.childMarkdownRemark?.html,
          }}
          itemProp="articleBody"
        />
        <hr />
        <footer></footer>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      description {
        childMarkdownRemark {
          html
        }
        internal {
          content
        }
      }
    }
  }
`
