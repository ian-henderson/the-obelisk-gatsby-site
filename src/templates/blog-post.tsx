import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { Bio, BlogInfo, Layout, SEO } from "../components"
import { BlogPost as BlogPostType } from "../types"

type DataProps = {
  post: BlogPostType,
  nextPost: BlogPostType,
  previousPost: BlogPostType,
}

export default function BlogPost({
  data: {
    post: { author, body, description, heroImage, publishDate, title },
    nextPost,
    previousPost,
  },
  location,
}: PageProps<DataProps>) {
  return (
    <Layout {...{ location }}>
      <SEO description={description?.internal?.content} {...{ title }} />
      <article itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{title}</h1>
          <Description
            dangerouslySetInnerHTML={{
              __html: description?.childMarkdownRemark?.html,
            }}
          />
          <BlogInfo
            authorImage={author?.image}
            authorName={author?.name}
            authorSlug={author?.slug}
            publishDate={publishDate}
          />
        </header>
        <HeroImage
          alt={heroImage?.description || "hero image"}
          image={getImage(heroImage?.gatsbyImageData)}
          layout="fixed"
          quality={100}
        />
        <section
          dangerouslySetInnerHTML={{
            __html: body?.childMarkdownRemark?.html,
          }}
          itemProp="articleBody"
        />
        <footer></footer>
      </article>
      <BlogPostNav>
        <ul>
          <li>
            {previousPost && (
              <Link
                to={`/${previousPost.author?.slug}/${previousPost.slug}`}
                rel="prev"
              >
                ← {previousPost.title}
              </Link>
            )}
          </li>
          <li style={{ textAlign: "right" }}>
            {nextPost && (
              <Link
                to={`/${nextPost.author?.slug}/${nextPost.slug}`}
                rel="next"
              >
                {nextPost.title} →
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
    post: contentfulBlogPost(id: { eq: $id }) {
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
    nextPost: contentfulBlogPost(id: { eq: $nextPostId }) {
      author {
        slug
      }
      slug
      title
    }
    previousPost: contentfulBlogPost(id: { eq: $previousPostId }) {
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
