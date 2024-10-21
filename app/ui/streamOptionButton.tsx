'use client'

import { useRef } from "react"

type props = {
  startStream: boolean, 
  ref:  React.RefObject<HTMLButtonElement>,
  setStartStream(set: boolean): void
}

export default  function StreamOptionButton({startStream, ref, setStartStream}: props){
  return (
      !startStream ? <button ref={ref} onClick={() => setStartStream(true)}>Start Stream Again?</button> : null
  )
}