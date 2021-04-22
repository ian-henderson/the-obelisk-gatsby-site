import React, { FocusEvent, MouseEvent, useRef, useState } from "react"
import "./toggle.css"

type IconType = "checked" | "unchecked"

interface IToggle extends HTMLInputElement {
  icons: Record<IconType, HTMLElement>
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
}

export default function Toggle({ className, icons, ...inputProps }: IToggle) {
  const inputRef = useRef<HTMLInputElement>()
  function ref(r: HTMLInputElement) {
    inputRef.current = r
  }
  const [checked, setChecked] = useState<Boolean>(
    Boolean(inputProps.checked || inputProps.defaultChecked)
  )
  const [hasFocus, setHasFocus] = useState<Boolean>(false)
  const [hadFocusAtTouchStart, setHadFocusAtTouchStart] = useState<Boolean>()
  const [previouslyChecked, setPreviouslyChecked] = useState<Boolean>()
  const [startX, setStartX] = useState<Number | null>()
  const [touchMoved, setTouchMoved] = useState<Boolean>()
  const [touchStarted, setTouchStarted] = useState<Boolean>()

  const classes =
    "react-toggle" +
    (checked ? " react-toggle--checked" : "") +
    (hasFocus ? " react-toggle--focus" : "") +
    (inputProps.disabled ? " react-toggle--disabled" : "") +
    (className ? " " + className : "")

  function getIcon(type: String) {
    return icons?.[type as IconType]
  }

  function onClick(event: MouseEvent<HTMLDivElement>) {
    const checkbox = inputRef.current
    if (!checkbox) return
    setPreviouslyChecked(checkbox.checked)
    if (event.target !== checkbox) {
      event.preventDefault()
      checkbox.focus()
      checkbox.click()
      return
    }
    setChecked(checkbox.checked)
  }

  function onInputBlur(event: FocusEvent<HTMLInputElement>) {
    const { onBlur } = inputProps
    if (onBlur) onBlur(event)
    setHadFocusAtTouchStart(false)
    setHasFocus(false)
  }

  function onInputFocus(event: FocusEvent<HTMLInputElement>) {
    const { onFocus } = inputProps
    if (onFocus) onFocus(event)
    setHadFocusAtTouchStart(true)
    setHasFocus(true)
  }

  function onTouchCancel() {
    if (startX != null) {
      setTouchStarted(false)
      setStartX(null)
      setTouchMoved(false)
    }
    if (!hadFocusAtTouchStart) {
      setHasFocus(false)
    }
  }

  function onTouchEnd(event: TouchEvent) {
    if (!touchMoved) return
    const checkbox = inputRef.current
    if (!checkbox) return
    event.preventDefault()
    if (startX != null) {
      if (previouslyChecked !== checked) checkbox.click()
      setTouchStarted(false)
      setStartX(null)
      setTouchMoved(false)
    }
    if (!hadFocusAtTouchStart) setHasFocus(false)
  }

  function onTouchMove(event: TouchEvent) {
    if (!touchStarted) return
    setTouchStarted(true)
    if (startX != null) {
      const currentX = pointerCoord(event).x
      if (checked && currentX + 15 < startX) {
        setChecked(false)
        setStartX(currentX)
        return
      }
      if (!checked && currentX - 15 > startX) {
        setChecked(true)
        setStartX(currentX)
      }
    }
  }

  function onTouchStart(event: TouchEvent) {
    setStartX(pointerCoord(event).x)
    setTouchStarted(true)
    setHadFocusAtTouchStart(hasFocus)
    setHasFocus(true)
  }

  return (
    // @ts-ignore
    <div
      className={classes}
      {...{ onClick, onTouchCancel, onTouchEnd, onTouchMove, onTouchStart }}
    >
      <div className="react-toggle-track">
        <div className="react-toggle-track-check">{getIcon("checked")}</div>
        <div className="react-toggle-track-x">{getIcon("unchecked")}</div>
      </div>
      <div className="react-toggle-thumb" />
      {/* @ts-ignore */}
      <input
        {...inputProps}
        aria-label="Switch between Dark and Light mode"
        className="react-toggle-screenreader-only"
        onBlur={onInputBlur}
        onFocus={onInputFocus}
        type="checkbox"
        {...{ ref }}
      />
    </div>
  )
}

// coordinates for either mouse click or touch depending on event
function pointerCoord(event: unknown) {
  if (!event) return { x: 0, y: 0 }
  const { changedTouches } = event as TouchEvent
  if (changedTouches?.length) {
    const { clientX: x, clientY: y } = changedTouches[0]
    return { x, y }
  }
  const { pageX: x, pageY: y } = event as MouseEvent<HTMLDivElement>
  return { x, y }
}
