import { graphql, Link, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { ReactNode } from "react"
import styled from "styled-components"
import { BlogInfo, Layout, SEO } from "../components"
import { ContentfulBlogPost } from "../types"

type DataProps = {
  post: ContentfulBlogPost
  nextPost: ContentfulBlogPost
  previousPost: ContentfulBlogPost
}

export default function BlogPost({
  data: { post, nextPost, previousPost },
  location,
}: PageProps<DataProps>): ReactNode {
  return (
    <Layout {...{ location }}>
      <SEO
        description={post?.description?.internal?.content}
        title={post?.title}
      />
      <article itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post?.title}</h1>
          <Description
            dangerouslySetInnerHTML={{
              __html: post?.description?.childMarkdownRemark?.html,
            }}
          />
          <BlogInfo author={post?.author} publishDate={post?.publishDate} />
        </header>
        <GatsbyImage
          alt={post?.heroImage?.description || "hero image"}
          image={getImage(post?.heroImage?.gatsbyImageData)}
        />
        <small>{post?.heroImage?.description}</small>
        <section
          dangerouslySetInnerHTML={{
            __html: post?.body?.childMarkdownRemark?.html,
          }}
          itemProp="articleBody"
        />
        <footer></footer>
      </article>
      <BlogPostNav>
        <ul>
          <li>
            {previousPost && (
              <A
                to={`/${previousPost.author?.slug}/${previousPost.slug}`}
                rel="prev"
              >
                ← {previousPost.title}
              </A>
            )}
          </li>
          <li style={{ textAlign: "right" }}>
            {nextPost && (
              <A to={`/${nextPost.author?.slug}/${nextPost.slug}`} rel="next">
                {nextPost.title} →
              </A>
            )}
          </li>
        </ul>
      </BlogPostNav>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    $nextPostSlug: String
    $previousPostSlug: String
  ) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      ...BlogInfo
      body {
        childMarkdownRemark {
          html
        }
      }
      description {
        childMarkdownRemark {
          html
        }
        internal {
          content
        }
      }
      heroImage {
        description
        gatsbyImageData
      }
      title
    }
    nextPost: contentfulBlogPost(id: { eq: $nextPostSlug }) {
      author {
        slug
      }
      slug
      title
    }
    previousPost: contentfulBlogPost(id: { eq: $previousPostSlug }) {
      author {
        slug
      }
      slug
      title
    }
  }
`

const Description = styled.p`
  p {
    font-size: var(--fontSize-2);
    font-style: italic;
    margin: var(--spacing-0) var(--spacing-0) var(--spacing-8) var(--spacing-0);
  }
`

const BlogPostNav = styled.nav`
  ul {
    display: flex;
    flexwrap: wrap;
    justify-content: space-between;
    list-style: none;
    margin: var(--spacing-0);
    padding: 0;
  }
`

const A = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
