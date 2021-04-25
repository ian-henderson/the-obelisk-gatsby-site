import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"

// prettier-ignore
import { Bio, Layout, SEO } from "../components"
import { BlogPost as BlogPostType, Site } from "../types"

type DataProps = {
  contentfulBlogPost: BlogPostType
  next: BlogPostType
  previous: BlogPostType
  site: Site
}

export default function BlogPost({
  data: { contentfulBlogPost: post, next, previous, site },
  location,
}: PageProps<DataProps>) {
  return (
    <Layout title={site?.siteMetadata?.title} {...{ location }}>
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
        <footer>
          <Bio author={post?.author} />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link
                to={`/${previous.author?.slug}/${previous.slug}`}
                rel="prev"
              >
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.author?.slug}/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $nextPostId: String
    $previousPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(id: { eq: $id }) {
      author {
        image {
          gatsbyImageData
        }
        name
        title
        shortBio {
          shortBio
        }
      }
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
    next: contentfulBlogPost(id: { eq: $nextPostId }) {
      author {
        slug
      }
      slug
      title
    }
    previous: contentfulBlogPost(id: { eq: $previousPostId }) {
      author {
        slug
      }
      slug
      title
    }
  }
`
