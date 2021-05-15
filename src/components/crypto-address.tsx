import QrCode from "qrcode.react"
import React, { useEffect, useState } from "react"
import Popup from "reactjs-popup"
import styled from "styled-components"
import copySvg from "../images/copy.svg"
import qrCodeSvg from "../images/qr-code.svg"

interface ICryptoAddress {
  address: string
  name: string
}

export default function CryptoAddress(props: ICryptoAddress): JSX.Element {
  const defaultContentStyle = {
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
    contentStyle: defaultContentStyle,
    position: "top",
  }

  function CopyButtonPopup() {
    const [timeoutId, setTimeoutId] = useState()
    useEffect(
      () => () => {
        if (timeoutId) clearTimeout(timeoutId)
      },
      [timeoutId]
    )

    const [open, setOpen] = useState(false)
    function onOpen() {
      function handleSuccess() {
        if (open) return null
        setOpen(true)
        setTimeoutId(setTimeout(() => setOpen(false), 3000))
      }
      navigator.clipboard.writeText(props.address).then(handleSuccess)
    }

    const trigger = <Svg alt="Copy Button" src={copySvg} width={18} />

    return (
      <Popup {...{ ...copyPopupProps, onOpen, open, trigger }}>✓ Copied!</Popup>
    )
  }

  function QrCodePopup() {
    const contentStyle = {
      ...defaultContentStyle,
      backgroundColor: "var(--background-color)",
    }

    const trigger = <Svg alt="QR Code Button" src={qrCodeSvg} width={18} />

    return (
      <Popup {...{ ...copyPopupProps, contentStyle, trigger }}>
        <QrCode value={props.address} />
      </Popup>
    )
  }

  function MobileCopyButtonPopup() {
    const trigger = (
      <MobileCopyButton>
        Copy {props.name} Address <MobileSvg src={copySvg} width={18} />
      </MobileCopyButton>
    )

    return <Popup {...{ ...copyPopupProps, trigger }}>✓ Copied!</Popup>
  }

  return (
    <>
      <Container>
        <label>
          {props.name}: <code>{props.address}</code>
        </label>
        <CopyButtonPopup />
        <QrCodePopup />
      </Container>
      <Container mobile>
        <MobileCopyButtonPopup />
      </Container>
    </>
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

  @media (${(p) => (p.mobile ? "min" : "max")}-width: 35rem) {
    display: none;
  }
`

const Svg = styled.img`
  filter: var(--logo-color);
  &:hover {
    cursor: pointer;
  }
`

const MobileSvg = styled(Svg)`
  margin-left: 0.5rem;
`

const MobileCopyButton = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`
