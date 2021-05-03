import { graphql, PageProps } from "gatsby"
import React from "react"
import styled from "styled-components"
import { BlogPostList, CryptoAddress, Layout, SEO } from "../components"
import { BlogPost } from "../types"

type DataProps = {
  allContentfulBlogPost: {
    edges: Array<{ node: BlogPost }>,
  },
}

export default function Index({
  data: {
    allContentfulBlogPost: { edges: posts },
    site: {
      siteMetadata: { bitcoinAddress },
    },
  },
  location,
}: PageProps<DataProps>): JSX.Element {
  function renderContent() {
    if (posts.length === 0) return <p>No articles found.</p>

    return <BlogPostList showAuthorInfo {...{ posts }} />
  }

  return (
    <Layout {...{ location }}>
      <SEO />
      {renderContent()}
      <Container>
        <CryptoAddress address={bitcoinAddress} label="Bitcoin" />
      </Container>
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
    site {
      siteMetadata {
        bitcoinAddress
      }
    }
  }
`

const Container = styled.div`
  margin-top: 5rem;
`
