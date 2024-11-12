'use client'

import { useRef } from "react";

type props = {
  text: string, 
}

export default function LoginButton({text}: props) {
 const button = useRef<HTMLAnchorElement>(null)

  const handleClick = () => {
    if (button.current) {
      button.current.text = 'Loading...'
      button.current.style.pointerEvents = 'none'
      button.current.style.cursor = 'default'
    }
  }

  return (
    <a href="/login/spotify" ref={button} onClick={handleClick}>{text}</a>
  );
}