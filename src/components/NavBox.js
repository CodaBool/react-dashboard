import React, { useRef, useEffect, useState } from 'react'
import _debounce from 'lodash.debounce'

const mq = window.matchMedia( "(max-width: 991px)" )

export default function NavBox() {
  const [width, setWidth] = useState(window.innerWidth)
  const imgHome = useRef(null)
  const imgCode = useRef(null)
  const home = useRef(null)
  const code = useRef(null)

  useEffect(() => {
    imgCode.current.style.height = "0px"
    imgHome.current.style.height = "0px"

    if (window.innerWidth <= 991) {
      home.current.innerText = "HOME"
      code.current.innerText = "CODE"
    } else {
      home.current.innerText = "GO HOME"
      code.current.innerText = "SEE CODE"
    }

    const handleResize = _debounce(() => {
      setWidth(window.innerWidth)
      if (window.innerWidth <= 991) {
        home.current.innerText = "HOME"
        code.current.innerText = "CODE"
      } else {
        home.current.innerText = "GO HOME"
        code.current.innerText = "SEE CODE"
      }
    }, 100)
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  

  function expand(ref) {
    if (mq.matches) { // Small, screen width <= 991px
      if (ref.current.id === "img-code") {
        imgCode.current.style.height = "70%"
      } else {
        imgHome.current.style.height = "100%"
      }
    } else { // Large, screen width > 991px
      if (ref.current.id === "img-code") {
        imgCode.current.style.height = "160%"
      } else {
        imgHome.current.style.height = "160%"
      }
    }
  }

  function contract(ref) {
    if (ref.current.id === "img-code") {
      imgCode.current.style.height = "0%"
    } else {
      imgHome.current.style.height = "0%"
    }
  }

  return (
    <div className="navBox">
      <img src='/navBox-home.png' ref={imgHome} id="img-home" />
      <a href="https://codabool.com/projects" ref={home} className="navBox-btn" id="btn-home" onMouseEnter={() => expand(imgHome)} onMouseLeave={() => contract(imgHome)}>GO HOME</a>
      <a href="https://github.com/CodaBool/react-dashboard" ref={code} className="navBox-btn" id="btn-code" onMouseEnter={() => expand(imgCode)} onMouseLeave={() => contract(imgCode)}>SEE CODE</a>
      <img src="/navBox-code.png" ref={imgCode} id="img-code" />
    </div>
  )
}
