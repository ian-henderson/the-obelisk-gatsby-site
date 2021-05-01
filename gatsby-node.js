const path = require("path")

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const createAuthorPages = new Promise((resolve, reject) => {
    const component = path.resolve("./src/templates/author-page.tsx")

    const query = `
      query AllPersons {
        allContentfulPerson {
          edges {
            node {
              slug
            }
          }
        }
      }
    `

    function handleResult(result) {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      const persons = result.data.allContentfulPerson.edges

      persons.forEach(({ node: { slug } }, i) => {
        createPage({
          component,
          context: { slug },
          path: `/${slug}`,
        })
      })
    }

    resolve(graphql(query).then(handleResult))
  })

  const createBlogPosts = new Promise((resolve, reject) => {
    const component = path.resolve("./src/templates/blog-post.tsx")

    const query = `
      query BlogPosts {
        allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
          edges {
            node {
              author {
                slug
              }
              id
              slug
              title
            }
          }
        }
      }
    `

    function handleResult(result) {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      const posts = result.data.allContentfulBlogPost.edges

      posts.forEach(({ node: { author, id, slug } }, i) => {
        createPage({
          component,
          context: {
            id,
            nextPostId: i === posts.length - 1 ? null : posts[i + 1].node.id,
            previousPostId: i === 0 ? null : posts[i - 1].node.id,
          },
          path: `/${author.slug}/${slug}`,
        })
      })
    }

    resolve(graphql(query).then(handleResult))
  })

  return Promise.all([createAuthorPages, createBlogPosts])
}
