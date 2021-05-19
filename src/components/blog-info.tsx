import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { ContentfulPerson } from "../types.d"

interface IBlogInfo {
  author: ContentfulPerson
  publishDate: string
}

export default function BlogInfo(props: IBlogInfo): JSX.Element {
  const authorUrl = `/${props.author.slug}`
  return (
    <OutterContainer>
      <InnerContainer>
        <Link to={authorUrl}>
          <Image
            alt={`${props.author.name} profile image`}
            image={getImage(props.author.image)}
          />
        </Link>
        <Column>
          <p>
            <A to={authorUrl}>{props.author.name}</A>
          </p>
          <p>{props.publishDate}</p>
        </Column>
      </InnerContainer>
      <A to={authorUrl}>Support my writing →</A>
    </OutterContainer>
  )
}

export const fragment = graphql`
  fragment BlogInfo on ContentfulBlogPost {
    author {
      image {
        gatsbyImageData(placeholder: BLURRED, width: 40)
      }
      name
      slug
    }
    publishDate(formatString: "MMMM Do, YYYY")
  }
`

const OutterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: var(--spacing-4);
`

const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-right: 0.5rem;
  margin-bottom: 0.75rem;

  p {
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
  font-weight: var(--fontWeight-semibold);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
