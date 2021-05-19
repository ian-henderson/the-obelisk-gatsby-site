import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { ContentfulBlogPost } from "../types"

interface IBlogPostList {
  posts: Array<{ node: ContentfulBlogPost }>
  showAuthorInfo?: boolean
  showPublishDate?: boolean
}

export default function BlogPostList({
  posts = [],
  showAuthorInfo,
  showPublishDate,
}: IBlogPostList): JSX.Element {
  interface IRenderBlogPost {
    node: ContentfulBlogPost
  }

  function renderBlogPost({
    node: { author, heroImage, publishDate, slug, title },
  }: IRenderBlogPost) {
    return (
      <li key={slug}>
        <ListItem itemScope itemType="http://schema.org/Article">
          <ImageContainer>
            <Link to={`/${author?.slug}/${slug}`} itemProp="url">
              <GatsbyImage
                alt={heroImage?.description || "hero image"}
                image={getImage(heroImage?.gatsbyImageData)}
              />
            </Link>
          </ImageContainer>
          <header>
            <h2>
              <Link to={`/${author?.slug}/${slug}`} itemProp="url">
                <span itemProp="headline">{title}</span>
              </Link>
            </h2>
            <small>
              {showAuthorInfo && (
                <span>
                  By <A to={`/${author?.slug}`}>{author?.name}</A>
                  {showPublishDate && (
                    <span style={{ margin: "auto 0.25rem" }}>•</span>
                  )}
                </span>
              )}
              {showPublishDate && publishDate}
            </small>
          </header>
        </ListItem>
      </li>
    )
  }

  return <ol style={{ listStyle: `none` }}>{posts.map(renderBlogPost)}</ol>
}

export const fragment = graphql`
  fragment BlogPostListItem on ContentfulBlogPost {
    author {
      name
      slug
    }
    heroImage {
      description
      gatsbyImageData(aspectRatio: 1.5, width: 250)
    }
    publishDate(formatString: "MMMM Do, YYYY")
    slug
    title
  }
`

const ImageContainer = styled.div`
  margin-right: var(--spacing-5);
  min-width: 115px;
`

const ListItem = styled.article`
  display: flex;
  flex-direction: row;
  margin-bottom: var(--spacing-8);
  margin-top: var(--spacing-8);

  h2 {
    margin-bottom: var(--spacing-2);
    margin-top: var(--spacing-0);
  }

  @media (max-width: 500px) {
    h2 {
      font-size: var(--fontSize-1);
    }
  }

  @media (min-width: 500px) {
    h2 {
      font-size: var(--fontSize-3);
    }
  }

  header {
    margin-bottom: var(--spacing-4);
  }
`

const A = styled(Link)`
  font-weight: var(--fontWeight-semibold);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
