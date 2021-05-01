import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { Bio, BlogInfo, Layout, SEO } from "../components"
import { BlogPost as BlogPostType } from "../types"

type DataProps = {
  contentfulBlogPost: BlogPostType,
  next: BlogPostType,
  previous: BlogPostType,
}

export default function BlogPost({
  data: { contentfulBlogPost: post, next, previous },
  location,
}: PageProps<DataProps>) {
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
          <hr />
          <BlogInfo
            authorImage={post?.author?.image}
            authorName={post?.author?.name}
            authorSlug={post?.author?.slug}
            publishDate={post?.publishDate}
          />
        </header>
        <HeroImage
          alt={post?.heroImage?.description || "hero image"}
          image={getImage(post?.heroImage?.gatsbyImageData)}
          layout="fixed"
          quality={100}
        />
        <section
          dangerouslySetInnerHTML={{
            __html: post?.body?.childMarkdownRemark?.html,
          }}
          itemProp="articleBody"
        />
        <hr />
        <footer></footer>
      </article>
      <BlogPostNav>
        <ul>
          <li>
            {previous && (
              <Link
                to={`/${previous.author?.slug}/${previous.slug}`}
                rel="prev"
              >
                ← {previous.title}
              </Link>
            )}
          </li>
          <li style={{ textAlign: "right" }}>
            {next && (
              <Link to={`/${next.author?.slug}/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </BlogPostNav>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $nextPostId: String
    $previousPostId: String
  ) {
    contentfulBlogPost(id: { eq: $id }) {
      author {
        image {
          gatsbyImageData(placeholder: BLURRED, width: 40)
        }
        name
        slug
      }
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
      publishDate(formatString: "MMMM Do, YYYY")
      title
    }
    next: contentfulBlogPost(id: { eq: $nextPostId }) {
      author {
        slug
      }
      slug
      title
    }
    previous: contentfulBlogPost(id: { eq: $previousPostId }) {
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
    margin: var(--spacing-0) var(--spacing-0) var(--spacing-8) var(--spacing-0);
  }
`

const HeroImage = styled(GatsbyImage)``

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
