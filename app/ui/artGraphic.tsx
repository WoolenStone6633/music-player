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
  const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, bufferLength: number, barWidth: number, dataArray: Uint8Array) => {
    let x = 0
    let bar = 0
    let barHeight: number

    for (let i = 0; i < bufferLength; i++){ 
      // base bar graph for frequencies
      // barHeight = dataArray[i]
      // ctx.fillStyle = 'black'
      // ctx.fillRect(x , canvas.height - barHeight, barWidth, barHeight)
      // bar += barWidth

      // inner range for circle
      if (i >= 50 && i <= 60) {
        let rotation = 90
        for (let j = 0; j < 5; j++){
          barHeight = dataArray[i]
          ctx.save()
          ctx.translate(canvas.width/2, canvas.height/2)
          ctx.rotate((i * 34.5 + rotation) * Math.PI / 180)
          const hue = i * 10
          ctx.fillStyle = `hsl(${hue},100%,${barHeight/3}%`
          ctx.fillRect(-1 * barWidth/2, -1 * barWidth/2, barWidth, barHeight)
          x += barWidth
          ctx.restore()
          rotation += 90
        }
      }

      // outer range for circle
      if (i < 11 && i > 0) {
        let rotation = 90
        for (let j = 0; j < 5; j++){
          barHeight = dataArray[i]
          // change the speed that the bar decays
          // if (dataArray[i] > barHeight)
          //   barHeight = dataArray[i]
          // else
          //   barHeight -= barHeight * 0.5
          ctx.save()
          ctx.translate(canvas.width/2, canvas.height/2)
          ctx.rotate((i * 34.5 + rotation) * Math.PI / 180)
          const hue = i * 5
          ctx.fillStyle = `hsl(${hue},100%,${barHeight/3}%`
          ctx.fillRect(-1 * barWidth/2, -1 * barWidth/2, barWidth, barHeight)
          x += barWidth
          ctx.restore()
          rotation += 90
        }
      }
      // barHeight = dataArray[i]
      // ctx.save()
      // ctx.translate(canvas.width/2, canvas.height/2)
      // ctx.rotate((i * 35 + 270) * Math.PI / 180)
      // const hue = i * 5
      // ctx.fillStyle = `hsl(${hue},100%,${barHeight/3}%`
      // ctx.fillRect(-1 * barWidth/2, -1 * barWidth/2, barWidth, barHeight)
      // x += barWidth
      // ctx.restore()
    }
  }

  useEffect(() => {
    const canvas = canRef.current
    const ctx = canvas?.getContext('2d')
    let animationFrameId: number

    if (canvas) {
      const animate = () => {
        if (!ctx) return
        const barWidth = canvas.width/bufferLength + 4

        // setting up and draws frame
        if (analyser && bufferLength && dataArray) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
          ctx.fillStyle = 'black'
          analyser.getByteFrequencyData(dataArray)

          draw(ctx, canvas, bufferLength, barWidth, dataArray) // visualizer graphic
        }
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

  return <canvas ref={canRef} width={588} height={463} 
  className="border-2 border-black rounded-lg"/>

  // for reactive sizing canvas
  // return <canvas ref={canRef} width={(window.innerWidth)/3} height={window.innerHeight/3} 
  // className="border-2 border-black rounded-lg"/>
}