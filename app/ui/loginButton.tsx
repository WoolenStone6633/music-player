'use client'

import gsap from "gsap";
import { useEffect, useRef } from "react";
import SplitType from "split-type";

type props = {
  text: string, 
}

export default function LoginButton({text}: props) {
 const button = useRef<HTMLAnchorElement>(null)

  const handleClick = () => {
    if (button.current) {
      button.current.text = 'Loading . . .'
      button.current.style.pointerEvents = 'none'
      button.current.style.cursor = 'default'
      const text = new SplitType(button.current)

      if (text.chars) {
        text.chars[7].classList.remove('char')
        text.chars[8].classList.remove('char')
        text.chars[9].classList.remove('char')
        text.chars[7].classList.add('period1')
        text.chars[8].classList.add('period2')
        text.chars[9].classList.add('period3')
      }

      const tl = gsap.timeline({ repeat: -1, defaults: {duration: 0.4}, repeatDelay: 0.25 })
      const tweenTime = '<0.23'
      tl.to('.period1', { y: -5 }, tweenTime)
      tl.to('.period2', { y: -5 }, tweenTime)
      tl.to('.period3', { y: -5 }, tweenTime)
      tl.to('.period1', { y: 0 }, tweenTime)
      tl.to('.period2', { y: 0 }, tweenTime)
      tl.to('.period3', { y: 0 }, tweenTime)
    }
  }

  useEffect(() => {
    window.addEventListener('popstate', (e) => {
      console.log(e)
      if (button.current) {
        button.current.text = text
        button.current.style.pointerEvents = 'auto'
        button.current.style.cursor = 'pointer'
      }
    })
    return () => window.removeEventListener('popstate', () => {})
  }, [])

  return (
    <a className='text-2xl inline-block py-2 px-4 rounded-xl bg-green-500' 
    href="/login/spotify" ref={button} onClick={handleClick}>{text}</a>
  );
}