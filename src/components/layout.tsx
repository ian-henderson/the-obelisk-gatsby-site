import { graphql, Link, PageRendererProps, useStaticQuery } from "gatsby"
import React, { FocusEvent, ReactNode, useEffect, useState } from "react"
import styled from "styled-components"
import moon from "../images/moon.png"
import sun from "../images/sun.png"
import logo from "../images/obelisk-5.svg"
import GlobalStyle from "./global-style"
import Toggle from "./toggle"

declare const __PATH_PREFIX__: string
declare const __theme: "light" | "dark"
declare const __setPreferredTheme: (t: string) => void
declare let __onThemeChange: () => void

interface ILayout extends PageRendererProps {
  children: ReactNode
}

export default function Layout(props: ILayout): JSX.Element {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useStaticQuery(staticQuery)

  const [theme, setTheme] = useState(null)
  useEffect(() => {
    setTheme(__theme)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    __onThemeChange = () => setTheme(__theme)
  }, [setTheme])

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = props.location.pathname === rootPath

  function renderHeader() {
    if (isRootPath) {
      return (
        <MainHeading>
          <Link style={{ display: "flex", flexDirection: "row" }} to="/">
            <Logo alt="The Obelisk Logo" height="40" src={logo} />
            {title}
          </Link>
        </MainHeading>
      )
    }

    return <HeaderLinkHome to="/">{title}</HeaderLinkHome>
  }

  function renderToggle() {
    if (theme === null) return <div style={{ height: "24px" }} />

    const icons = {
      checked: <img alt="moon" height="16" src={moon} width="16" />,
      unchecked: <img alt="sun" height="16" src={sun} width="16" />,
    }

    function onChange(event: FocusEvent<HTMLInputElement>) {
      __setPreferredTheme(event.target.checked ? "dark" : "light")
    }

    return <Toggle checked={theme === "dark"} {...{ icons, onChange }} />
  }

  return (
    <>
      <GlobalStyle />
      <GlobalWrapper>
        <GlobalHeader>
          {renderHeader()}
          {renderToggle()}
        </GlobalHeader>
        <main>{props.children}</main>
        <footer>© {new Date().getFullYear()}</footer>
      </GlobalWrapper>
    </>
  )
}

const staticQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const GlobalWrapper = styled.div`
  margin: var(--spacing-0) auto;
  max-width: var(--maxWidth-wrapper);
  padding: var(--spacing-10) var(--spacing-5);
`

const GlobalHeader = styled.header`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 52px;
  justify-content: space-between;
  margin-bottom: var(--spacing-12);
`

const MainHeading = styled.h1`
  font-size: var(--fontSize-6);
  margin: 0;
`

const HeaderLinkHome = styled(Link)`
  font-family: var(--font-heading);
  font-size: var(--fontSize-4);
  font-weight: var(--fontWeight-bold);
  text-decoration: none;
`

const Logo = styled.img`
  margin-right: var(--spacing-2);
  margin-bottom: var(--spacing-0);
  min-width: 50px;
  filter: var(--logo-color);
  @media (max-width: 24rem) {
    display: none;
  }
`
