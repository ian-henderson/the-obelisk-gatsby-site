import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"

interface IBlogInfo {
  authorName: string;
  image: any;
  publishDate: string;
}

export default function BlogInfo({
  authorImage,
  authorName,
  publishDate,
}: IBlogInfo) {
  return (
    <Container>
      <Image
        alt={`${authorName} profile image`}
        image={getImage(authorImage)}
        layout="fixed"
        quality={100}
      />
      <Column>
        <p>{authorName}</p>
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
  border-radius: 100%;
  height: 40px;
  margin-right: var(--spacing-4);
  width: 40px;
`
