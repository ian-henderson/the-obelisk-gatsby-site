import { graphql, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
// prettier-ignore
import { BlogPostList, BuyMeACoffeeLink, CryptoAddress, Layout, SEO } from "../components"
import { ContentfulBlogPost, ContentfulPerson } from "../types"

type DataProps = {
  allContentfulBlogPost: {
    edges: Array<{ node: ContentfulBlogPost }>
  }
  author: ContentfulPerson
}

export default function AuthorPage({
  data: {
    allContentfulBlogPost: { edges: posts },
    author,
  },
  location,
}: PageProps<DataProps>): JSX.Element {
  function Support() {
    const { bitcoinAddress, buyMeACoffeeUsername } = author || {}
    if (!bitcoinAddress && !buyMeACoffeeUsername) return null

    return (
      <SupportSection>
        <h2>Support my writing</h2>
        {bitcoinAddress && (
          <>
            <h5>With Bitcoin</h5>
            <CryptoAddress address={bitcoinAddress} name="BTC" />
          </>
        )}
        {buyMeACoffeeUsername && (
          <h5>
            <BuyMeACoffeeLink
              text="With coffee"
              username={buyMeACoffeeUsername}
            />
          </h5>
        )}
      </SupportSection>
    )
  }

  return (
    <Layout {...{ location }}>
      <SEO description={author?.shortBio?.shortBio} title={author?.name} />
      <article itemScope itemType="http://schema.org/Article">
        <Header itemProp="headline">
          <Image
            alt={`${author?.name} profile picture`}
            image={getImage(author?.image)}
          />
          <H1>{author?.name}</H1>
          <Subtitle>{author?.shortBio?.shortBio}</Subtitle>
        </Header>
        <Support />
        <hr />
        <section>
          <h2>Articles</h2>
          <BlogPostList showPublishDate {...{ posts }} />
        </section>
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
      bitcoinAddress
      buyMeACoffeeUsername
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
  text-align: center;
  margin: inherit;
  margin-bottom: var(--spacing-6);
`

const Subtitle = styled.p`
  font-size: var(--fontSize-2);
  margin-bottom: var(--spacing-4);
`

const Image = styled(GatsbyImage)`
  img {
    border-radius: 100%;
  }
  height: 8rem;
  width: 8rem;
  margin-bottom: var(--spacing-12);
`

const SupportSection = styled.section`
  padding-bottom: 2.5rem;
`
