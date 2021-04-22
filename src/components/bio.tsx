import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

interface IBio {
  author: {
    name: string,
    image: any,
  };
}

export default function Bio({ author }: IBio) {
  const {
    site: {
      siteMetadata: {
        social: { twitter },
      },
    },
  } = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          social {
            twitter
          }
        }
      }
    }
  `)

  return (
    <div className="bio">
      <GatsbyImage
        alt={author?.name}
        className="bio-avatar"
        height={50}
        image={getImage(author?.image)}
        layout="fixed"
        quality={95}
        width={50}
      />
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong>{" "}
          {author?.shortBio?.shortBio || null}
          {` `}
          <a href={`https://twitter.com/${twitter || "jack"}`} target="_blank">
            You should follow them on Twitter
          </a>
        </p>
      )}
    </div>
  )
}
