import { graphql, Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { ContentfulBlogPost } from "../types"

interface IBlogPostList {
  posts: Array<{ node: ContentfulBlogPost }>;
  showAuthorInfo?: boolean;
  showPublishDate?: boolean;
}

export default function BlogPostList({
  posts = [],
  showAuthorInfo,
  showPublishDate,
}: IBlogPostList): JSX.Element {
  interface IRenderBlogPost {
    node: ContentfulBlogPost;
  }

  function renderBlogPost({
    node: { author, publishDate, slug, title },
  }: IRenderBlogPost) {
    return (
      <li key={slug}>
        <ListItem itemScope itemType="http://schema.org/Article">
          <header>
            <h2>
              <Link to={`/${author?.slug}/${slug}`} itemProp="url">
                <span itemProp="headline">{title}</span>
              </Link>
            </h2>
            <p>
              {showAuthorInfo && (
                <span>
                  By <A to={`/${author?.slug}`}>{author?.name}</A>
                  {showPublishDate && (
                    <span style={{ margin: "auto 0.25rem" }}>•</span>
                  )}
                </span>
              )}
              {showPublishDate && publishDate}
            </p>
          </header>
        </ListItem>
      </li>
    )
  }

  //

  return <ol style={{ listStyle: `none` }}>{posts.map(renderBlogPost)}</ol>
}

export const fragment = graphql`
  fragment BlogPostListItem on ContentfulBlogPost {
    author {
      name
      slug
    }
    publishDate(formatString: "MMMM Do, YYYY")
    slug
    title
  }
`

const ListItem = styled.article`
  margin-bottom: var(--spacing-8);
  margin-top: var(--spacing-8);

  p {
    margin-bottom: var(--spacing-0);
  }

  h2 {
    font-size: var(--fontSize-4);
    color: var(--color-primary);
    margin-bottom: var(--spacing-2);
    margin-top: var(--spacing-0);
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
