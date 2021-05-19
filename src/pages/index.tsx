import { graphql, Link, PageProps } from "gatsby"
import React, { ReactNode } from "react"
import { BlogPostList, Layout, SEO } from "../components"
import { ContentfulBlogPost } from "../types"

type DataProps = {
  allContentfulBlogPost: {
    edges: Array<{ node: ContentfulBlogPost }>
  }
}

export default function Index({
  data: {
    allContentfulBlogPost: { edges: posts },
  },
  location,
}: PageProps<DataProps>): ReactNode {
  function Content() {
    if (posts.length === 0) return <p>No articles found.</p>

    return <BlogPostList showAuthorInfo {...{ posts }} />
  }

  return (
    <Layout {...{ location }}>
      <SEO />
      <Content />
      <h5>
        <Link to="/support">Support this site →</Link>
      </h5>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          ...BlogPostListItem
        }
      }
    }
  }
`
