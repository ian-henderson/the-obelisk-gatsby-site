import React, { useState } from "react"
import Popup from "reactjs-popup"
import QrCode from "qrcode.react"
import styled from "styled-components"
import copySvg from "../images/copy.svg"
import qrCodeSvg from "../images/qr-code.svg"

type Props = {
  address: string,
  label: string,
}

export default function cryptoAddress({ address, label }: Props): JSX.Element {
  const [showCopiedButtonPopup, setShowCopiedButtonPopup] = useState(false)

  function onButtonPopupOpen() {
    function handleSuccess() {
      setShowCopiedButtonPopup(true)
      setTimeout(() => setShowCopiedButtonPopup(false), 3000)
    }
    navigator.clipboard.writeText(address).then(handleSuccess)
  }

  const contentStyle = {
    backgroundColor: "rgb(21, 61, 52)", // dark green
    border: "1px solid lightgrey",
    boxShadow:
      "rgb(0 0 0 / 8%) 0px 16px 40px 0px, rgb(0 0 0 / 4%) 0px 8px 24px 0px",
    color: "lightgrey",
    textAlign: "center",
    width: "auto",
  }

  const copyPopupProps = {
    arrow: false,
    contentStyle,
    position: "top",
  }

  return (
    <Container>
      <DesktopLabel>
        {label} Address: <Address>{address}</Address>
      </DesktopLabel>
      <Popup
        onOpen={onButtonPopupOpen}
        open={showCopiedButtonPopup}
        trigger={<DesktopSvg alt="Copy Button" src={copySvg} width={18} />}
        {...copyPopupProps}
      >
        ✓ Copied!
      </Popup>
      <Popup
        {...copyPopupProps}
        contentStyle={{
          ...contentStyle,
          backgroundColor: window.__theme === "light" ? "white" : "#181a1b",
        }}
        trigger={<DesktopSvg alt="QR Code Button" src={qrCodeSvg} width={18} />}
      >
        <QrCode value={address} />
      </Popup>
      <Popup
        {...copyPopupProps}
        trigger={
          <MobileCopyButton>
            Copy {label} Address <MobileSvg src={copySvg} width={18} />
          </MobileCopyButton>
        }
        {...{ contentStyle }}
      >
        ✓ Copied!
      </Popup>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & > :not(last-child) {
    margin-right: 0.75rem;
  }
  & > * {
    margin-bottom: 0.5rem;
  }
`

const DesktopLabel = styled.label`
  @media (max-width: 35rem) {
    display: none;
  }
`

const Address = styled.code`
  @media (max-width: 35rem) {
    display: none;
  }
`

const Svg = styled.img`
  filter: var(--logo-color);
  &:hover {
    cursor: pointer;
  }
`

const DesktopSvg = styled(Svg)`
  @media (max-width: 35rem) {
    display: none;
  }
`

const MobileSvg = styled(Svg)`
  @media (min-width: 35rem) {
    display: none;
  }
  margin-left: 0.5rem;
`

const MobileCopyButton = styled.div`
  @media (min-width: 35rem) {
    display: none;
  }
  align-items: center;
  display: flex;
  flex-direction: row;
`
