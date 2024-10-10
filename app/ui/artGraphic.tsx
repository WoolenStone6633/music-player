'use client'

import { useEffect, useRef } from "react";

export default  function ArtGraphic() {
  // const displayMediaOptions = {
  //   video: true,
  //   audio: true,
  //   preferCurrentTab: true,
  //   surfaceSwitching: 'exclude',
  //   systemAudio: "exclude",
  // };

  // navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
  // .then((stream) => {
  //   const audioCtx = new AudioContext()
  //   const source = audioCtx.createMediaStreamSource(stream)
  //   const analyzer = audioCtx.createAnalyser()
  //   source.connect(analyzer)
  //   analyzer.fftSize = 64
  //   const dataArray = new Uint8Array(analyzer.frequencyBinCount)
  //   console.log(dataArray)
  // })

  const canRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    context.fillStyle='grey'
    context.fillRect(10, 10, 10, 10)
  })

  return (
      <canvas ref={canRef} width={200} height={200}/>
  )
}