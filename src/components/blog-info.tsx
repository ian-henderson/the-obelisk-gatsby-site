import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"

interface IBlogInfo {
  authorName: string;
  authorSlug: string;
  image: any;
  publishDate: string;
}

export default function BlogInfo({
  authorImage,
  authorName,
  authorSlug,
  publishDate,
}: IBlogInfo) {
  const authorUrl = `/${authorSlug}`
  return (
    <Container>
      <A to={authorUrl}>
        <Image
          alt={`${authorName} profile image`}
          image={getImage(authorImage)}
          layout="fixed"
          quality={100}
        />
      </A>
      <Column>
        <p>
          <A to={authorUrl}>{authorName}</A>
        </p>
        <p>{publishDate}</p>
      </Column>
    </Container>
  )
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: var(--spacing-8) auto var(--spacing-8);

  p {
    font-family: var(--font-heading);
    margin: inherit;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Image = styled(GatsbyImage)`
  img {
    border-radius: 100%;
  }
  height: 40px;
  margin-right: var(--spacing-4);
  width: 40px;
`

const A = styled(Link)`
  text-decoration: none;
`
