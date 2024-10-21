'use client'

import { useEffect, useRef } from "react"

type props = {
  analyser?: AnalyserNode, 
  bufferLength: number,
  dataArray?: Uint8Array,
  audioStream?:MediaStream, 
  stopStream(): void,
}

export default  function ArtGraphic({analyser, bufferLength, dataArray, audioStream, stopStream}: props) {
  const canRef = useRef<HTMLCanvasElement>(null)

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
        const barWidth = canvas.width/bufferLength
        draw(ctx, canvas, analyser, bufferLength, dataArray, barWidth)
        if (audioStream?.active)
          animationFrameId = requestAnimationFrame(animate)
        else {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          stopStream()
        }
      }
      animate()
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [draw])

  return <canvas ref={canRef} width={200} height={500}/>
}