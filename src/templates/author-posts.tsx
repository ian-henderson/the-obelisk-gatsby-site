import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"

// prettier-ignore
import { Bio, Layout, SEO } from "../components"

type DataProps = {}

export default function AuthorPosts({ data, location }: PageProps<DataProps>) {
  return (
    <Layout title={data.site?.siteMetadata?.title} {...{ location }}></Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostsByAuthor($slug: String!) {
    allContentfulBlogPost(
      filter: { author: { slug: { eq: $slug } } }
      sort: { fields: publishDate, order: DESC }
    ) {
      edges {
        node {
          slug
          title
        }
      }
    }
    contentfulPerson(slug: { eq: $slug }) {
      name
    }
  }
`
