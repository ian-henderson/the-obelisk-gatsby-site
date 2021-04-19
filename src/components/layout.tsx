import * as React from "react"
import { Link } from "gatsby"
import moon from "../images/moon.png"
import sun from "../images/sun.png"
import Toggle from "./toggle"

export default function Layout({ children, location, title }) {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const [theme, setTheme] = React.useState(null)
  React.useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => setTheme(window.__theme)
  })

  function renderHeader() {
    if (isRootPath) {
      return (
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
      )
    }

    return (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  function renderToggle() {
    if (theme === null) return <div style={{ height: "24px" }} />

    const icons = {
      checked: (
        <img
          src={moon}
          width="16"
          height="16"
          role="presentation"
          style={{ pointerEvents: "none" }}
        />
      ),
      unchecked: (
        <img
          src={sun}
          width="16"
          height="16"
          role="presentation"
          style={{ pointerEvents: "none" }}
        />
      ),
    }

    function onChange(event) {
      window.__setPreferredTheme(event.target.checked ? "dark" : "light")
    }

    return <Toggle checked={theme === "dark"} {...{ icons, onChange }} />
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {renderHeader()}
        {renderToggle()}
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}
