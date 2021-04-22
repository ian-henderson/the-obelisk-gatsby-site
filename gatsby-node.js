const path = require("path")

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const blogPost = path.resolve("./src/templates/blog-post.tsx")

  const query = `
    {
      allContentfulBlogPost {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
    }
  `

  return new Promise((resolve, reject) => {
    function handleResult(result) {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      const posts = result.data.allContentfulBlogPost.edges

      posts.forEach(({ node: { id, slug } }, i) => {
        console.log(id, slug)

        const nextPostId = i === posts.length - 1 ? null : posts[i + 1].node.id
        const previousPostId = i === 0 ? null : posts[i - 1].node.id

        createPage({
          path: `/article/${slug}/`,
          component: blogPost,
          context: { id, nextPostId, previousPostId },
        })
      })
    }

    resolve(graphql(query).then(handleResult))
  })
}
