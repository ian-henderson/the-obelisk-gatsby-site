import React, {
  FocusEventHandler,
  InputHTMLAttributes,
  MouseEvent,
  useRef,
  useState,
} from "react"
import "./toggle.css"

type IconType = "checked" | "unchecked"

interface IToggle extends InputHTMLAttributes<HTMLInputElement> {
  icons: Record<IconType, JSX.Element>
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
}

export default function Toggle({
  className,
  icons,
  ...inputProps
}: IToggle): JSX.Element {
  const inputRef = useRef<HTMLInputElement>()
  function ref(r: HTMLInputElement) {
    inputRef.current = r
  }
  const [checked, setChecked] = useState<boolean>(
    Boolean(inputProps.checked || inputProps.defaultChecked)
  )
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [hadFocusAtTouchStart, setHadFocusAtTouchStart] = useState<boolean>()
  const [previouslyChecked, setPreviouslyChecked] = useState<boolean>()
  const [startX, setStartX] = useState<number>()
  const [touchMoved, setTouchMoved] = useState<boolean>()
  const [touchStarted, setTouchStarted] = useState<boolean>()

  const classes =
    "react-toggle" +
    (checked ? " react-toggle--checked" : "") +
    (hasFocus ? " react-toggle--focus" : "") +
    (inputProps.disabled ? " react-toggle--disabled" : "") +
    (className ? " " + className : "")

  function getIcon(type: IconType) {
    return icons?.[type]
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

  function onInputBlur(event) {
    const { onBlur } = inputProps
    if (onBlur) onBlur(event)
    setHadFocusAtTouchStart(false)
    setHasFocus(false)
  }

  function onInputFocus(event) {
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

  function onTouchEnd(event) {
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

  function onTouchMove(event) {
    if (!touchStarted) return
    setTouchStarted(true)
    if (startX !== null) {
      const currentX = pointerCoord(event).x
      if (checked && currentX + 15 < (startX as number)) {
        setChecked(false)
        setStartX(currentX)
        return
      }
      if (!checked && currentX - 15 > (startX as number)) {
        setChecked(true)
        setStartX(currentX)
      }
    }
  }

  function onTouchStart(event) {
    setStartX(pointerCoord(event).x)
    setTouchStarted(true)
    setHadFocusAtTouchStart(hasFocus)
    setHasFocus(true)
  }

  return (
    <div
      className={classes}
      {...{ onClick, onTouchCancel, onTouchEnd, onTouchMove, onTouchStart }}
    >
      <div className="react-toggle-track">
        <div className="react-toggle-track-check">{getIcon("checked")}</div>
        <div className="react-toggle-track-x">{getIcon("unchecked")}</div>
      </div>
      <div className="react-toggle-thumb" />
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
function pointerCoord(event: TouchEvent & MouseEvent) {
  if (!event) return { x: 0, y: 0 }
  const { changedTouches } = event
  if (changedTouches?.length) {
    const { clientX: x, clientY: y } = changedTouches[0]
    return { x, y }
  }
  const { pageX: x, pageY: y } = event
  return { x, y }
}
