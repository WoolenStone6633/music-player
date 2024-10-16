'use client'

import { useEffect, useRef } from "react";

export default  function ArtGraphic() {
  const displayMediaOptions = {
    video: true,
    audio: true,
    preferCurrentTab: true,
    surfaceSwitching: 'exclude',
    systemAudio: "exclude",
  };

  const canRef = useRef<HTMLCanvasElement>(null)
  const analyser = useRef<AnalyserNode>()
  const bufferLength = useRef<number>(0)
  const dataArray = useRef<Uint8Array>()

  // let analyser: AnalyserNode
  // let bufferLength: number
  // let dataArray: Uint8Array
  // let audioCtx: AudioContext

  // Gets permission to use audio from user and processes it
  useEffect(() => {
    navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
    .then((stream) => {
      const audioCtx = new AudioContext()
      const source = audioCtx.createMediaStreamSource(stream)
      analyser.current = audioCtx.createAnalyser()
      source.connect(analyser.current)
      analyser.current.fftSize = 128
      bufferLength.current = analyser.current.frequencyBinCount
      dataArray.current = new Uint8Array(bufferLength.current)
    })
  }, [])

  // animation frame
  const draw = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    analyser: AnalyserNode | undefined, 
    bufferLength: number,
    dataArray: Uint8Array | undefined,
    barWidth: number,
  ) => {
    if (analyser && bufferLength && dataArray) {
      let x = 0
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.fillStyle = 'black'
      analyser.getByteFrequencyData(dataArray)
      for (let i = 0; i < bufferLength; i++){ // dataArray[i] is the bar height
        ctx.fillStyle = 'black'
        ctx.fillRect(x, canvas.height - dataArray[i], barWidth, dataArray[i])
        x += barWidth
      }
    }
  }

  useEffect(() => {
    const canvas = canRef.current
    const ctx = canvas?.getContext('2d')
    let animationFrameId: number

    if (canvas) {
      const animate = () => {
        if (!ctx) return
        const barWidth = canvas.width/bufferLength.current
        draw(ctx, canvas, analyser.current, bufferLength.current, dataArray.current, barWidth)
        animationFrameId = requestAnimationFrame(animate)
      }
      animate()
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [draw])

  return (
      <canvas ref={canRef} width={200} height={500}/>
  )
}