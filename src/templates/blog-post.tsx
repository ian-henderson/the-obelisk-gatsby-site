import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"

// prettier-ignore
import { Bio, Layout, SEO } from "../components"

type DataProps = {
  contentfulBlogPost: {
    author: {
      image: {
        gatsbyImageData: any
      }
      name: string
      shortBio: {
        shortBio: string
      }
      title: string
    }
    body: {
      childMarkdownRemark: {
        html: string
      }
    }
    description: {
      internal: {
        content: string
      }
    }
    publishDate: string
    title: string
  }
  next: {
    slug: string
    title: string
  }
  previous: {
    slug: string
    title: string
  }
  site: {
    siteMetadata: {
      title: string
    }
  }
}

export default function BlogPost({ data, location }: PageProps<DataProps>) {
  const { contentfulBlogPost: post, next, previous } = data
  return (
    <Layout title={data?.site?.siteMetadata?.title} {...{ location }}>
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
              <Link to={`/article/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/article/${next.slug}`} rel="next">
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
      slug
      title
    }
    previous: contentfulBlogPost(id: { eq: $previousPostId }) {
      slug
      title
    }
  }
`
