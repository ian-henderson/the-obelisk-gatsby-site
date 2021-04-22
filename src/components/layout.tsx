import React, { FocusEvent } from "react"
import { Link, PageRendererProps } from "gatsby"
import moon from "../images/moon.png"
import sun from "../images/sun.png"
import logo from "../images/obelisk-5.svg"
import Toggle from "./toggle"

declare const __PATH_PREFIX__: string
declare const window: any

interface ILayout extends PageRendererProps {
  children: React.ReactNode
  title: String
}

export default function Layout({ children, location, title }: ILayout) {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const [theme, setTheme] = React.useState(null)
  React.useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => setTheme(window.__theme)
  }, [setTheme])

  function renderHeader() {
    if (isRootPath) {
      return (
        <h1 className="main-heading">
          <Link style={{ display: "flex", flexDirection: "row" }} to="/">
            <img
              alt="The Obelisk Logo"
              className="logo"
              height="50"
              src={logo}
            />
            {title}
          </Link>
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
          alt="moon"
          height="16"
          src={moon}
          style={{ pointerEvents: "none" }}
          width="16"
        />
      ),
      unchecked: (
        <img
          alt="sun"
          height="16"
          src={sun}
          style={{ pointerEvents: "none" }}
          width="16"
        />
      ),
    }

    function onChange(event: FocusEvent<HTMLInputElement>) {
      window.__setPreferredTheme(event.target.checked ? "dark" : "light")
    }

    // @ts-ignore
    return <Toggle checked={theme === "dark"} {...{ icons, onChange }} />
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {renderHeader()}
        {renderToggle()}
      </header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  )
}
