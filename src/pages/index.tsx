import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import styled from "styled-components"
import { Layout, SEO } from "../components"
import { BlogPost, Site } from "../types"

type DataProps = {
  allContentfulBlogPost: {
    edges: Array<{ node: BlogPost }>
  }
  site: Site
}

export default function Index({
  data: {
    allContentfulBlogPost: { edges: posts },
    site: {
      siteMetadata: { title: siteTitle = "Title" },
    },
  },
  location,
}: PageProps<DataProps>) {
  if (posts.length === 0) {
    return (
      <Layout title={siteTitle} {...{ location }}>
        <SEO />
        <p>No articles found.</p>
      </Layout>
    )
  }

  interface IRenderPost {
    node: BlogPost
  }

  function renderPost({
    node: { author, description, publishDate, slug, title },
  }: IRenderPost) {
    return (
      <li key={slug}>
        <PostListItem itemScope itemType="http://schema.org/Article">
          <header>
            <h2>
              <Link to={`${author?.slug}/${slug}`} itemProp="url">
                <span itemProp="headline">{title || "Title"}</span>
              </Link>
            </h2>
            <small>{publishDate}</small>
          </header>
          <section>
            <p>{description?.childMarkdownRemark?.excerpt}</p>
          </section>
        </PostListItem>
      </li>
    )
  }

  return (
    <Layout title={siteTitle} {...{ location }}>
      <SEO />
      <ol style={{ listStyle: `none` }}>{posts.map(renderPost)}</ol>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          author {
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
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const PostListItem = styled.article`
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
