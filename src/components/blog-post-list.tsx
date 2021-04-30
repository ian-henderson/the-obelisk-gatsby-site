import { graphql, Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { BlogPost } from "../types"

interface IBlogPostList {
  posts: Array<{ node: BlogPost }>;
  showAuthorInfo: boolean;
}

export default function BlogPostList({
  posts = [],
  showAuthorInfo,
}: IBlogPostList) {
  interface IRenderBlogPost {
    node: BlogPost;
  }

  function renderBlogPost({
    node: { author, description, publishDate, slug, title },
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
              {publishDate}
              {showAuthorInfo && (
                <>
                  <span style={{ margin: "auto 0.25rem" }}>•</span>
                  <A to={`/${author?.slug}`}>{author?.name}</A>
                </>
              )}
            </p>
          </header>
          <section>
            <p>{description?.childMarkdownRemark?.excerpt}</p>
          </section>
        </ListItem>
      </li>
    )
  }

  return <ol style={{ listStyle: `none` }}>{posts.map(renderBlogPost)}</ol>
}

export const query = graphql`
  fragment BlogPostListItem on ContentfulBlogPost {
    author {
      name
      slug
    }
    description {
      childMarkdownRemark {
        excerpt
      }
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
  text-decoration: none;
`