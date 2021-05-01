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
}: PageProps<DataProps>): JSX.Element {
  if (posts.length === 0) {
    return (
      <Layout {...{ location }}>
        <SEO />
        <p>No articles found.</p>
      </Layout>
    )
  }

  return (
    <Layout {...{ location }}>
      <SEO />
      <BlogPostList showAuthorInfo {...{ posts }} />
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
