import { graphql, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
// prettier-ignore
import { Bio, BlogPostList, Layout, SEO } from "../components"
import { BlogPost } from "../types"

type DataProps = {
  allContentfulBlogPost: {
    edges: Array<{ node: BlogPost }>,
  },
}

export default function AuthorPage({
  data: {
    author: {
      image,
      name,
      shortBio: { shortBio },
    },
    allContentfulBlogPost: { edges: posts },
  },
  location,
}: PageProps<DataProps>) {
  return (
    <Layout {...{ location }}>
      <SEO description={shortBio} title={name} />
      <article itemScope itemType="http://schema.org/Article">
        <Header itemProp="headline">
          <Image
            alt={`${name} profile picture`}
            image={getImage(image)}
            quality={100}
          />
          <H1>{name}</H1>
          <Subheader>{shortBio}</Subheader>
        </Header>
        <BlogPostList {...{ posts }} />
      </article>
    </Layout>
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
          ...BlogPostListItem
        }
      }
    }
    author: contentfulPerson(slug: { eq: $slug }) {
      image {
        gatsbyImageData(placeholder: BLURRED, width: 100)
      }
      name
      shortBio {
        shortBio
      }
    }
  }
`

const Header = styled.header`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const H1 = styled.h1`
  margin: inherit;
  margin-bottom: var(--spacing-4);
`

const Subheader = styled.p`
  font-size: var(--fontSize-2);
  margin-bottom: var(--spacing-4);
`

const Image = styled(GatsbyImage)`
  border-radius: 100%;
  height: 8rem;
  width: 8rem;
  margin-bottom: var(--spacing-6);
`
