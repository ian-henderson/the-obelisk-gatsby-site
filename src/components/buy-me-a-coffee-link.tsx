import React from "react"
import styled from "styled-components"

interface IBuyMeACoffeeButton {
  text?: string
  username: string
}

export default function BuyMeACoffeeLink({
  text,
  username,
}: IBuyMeACoffeeButton): JSX.Element {
  return (
    <Link href={`https://buymeacoffee.com/${username}`}>
      <code>{text || "Buy me a coffee"} ☕ →</code>
    </Link>
  )
}

const Link = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
