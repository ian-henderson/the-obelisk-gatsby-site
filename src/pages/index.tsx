import { graphql, PageProps } from "gatsby"
import React from "react"
import { BlogPostList, Layout, SEO } from "../components"
import { BlogPost } from "../types"

type DataProps = {
  allContentfulBlogPost: {
    edges: Array<{ node: BlogPost }>,
  },
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
