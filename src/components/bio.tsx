import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { ContentfulPerson } from "../types"

interface IBio {
  author: ContentfulPerson
}

export default function Bio({ author }: IBio): JSX.Element {
  const {
    site: {
      siteMetadata: {
        social: { twitter },
      },
    },
  } = useStaticQuery(staticQuery)

  return (
    <Container>
      <Image
        alt={author?.name}
        height={35}
        image={getImage(author?.image)}
        layout="fixed"
        quality={100}
        width={35}
      />
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong>.{" "}
          {author?.shortBio?.shortBio || null}
          {` `}
          <a href={`https://twitter.com/${twitter || "jack"}`} target="_blank">
            You should follow them on Twitter!
          </a>
        </p>
      )}
    </Container>
  )
}

const staticQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        social {
          twitter
        }
      }
    }
  }
`

const Container = styled.div`
  display: flex;
  margin-bottom: var(--spacing-16);

  p {
    margin-bottom: var(--spacing-0);
  }
`

const Image = styled(GatsbyImage)`
  margin-right: var(--spacing-4);
  margin-bottom: var(--spacing-0);
  min-width: 50px;
  border-radius: 100%;
`
