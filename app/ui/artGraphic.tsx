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
  const backgroundColor = '#FC7472'

  // animation frame
  const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, bufferLength: number, barWidth: number, dataArray: Uint8Array) => {
    let x = 0
    let bar = 0
    let barHeight: number

    // background graph
    barWidth = canvas.width/15
    for (let i = 2; i < 17; i++){ 
      barHeight = dataArray[i] * 1.5
      const barGrad = ctx.createLinearGradient(0, canvas.height - 50, 0, 50)
      barGrad.addColorStop(0, "#2C0E13")
      barGrad.addColorStop(0.45, "#9F4750")
      barGrad.addColorStop(0.76, "#E26866")
      barGrad.addColorStop(1, backgroundColor)
      ctx.fillStyle = barGrad;
      ctx.fillRect(bar, canvas.height - barHeight - 50, barWidth, barHeight + 50)
      bar += barWidth
    }

    bar = 0
    for (let i = 2; i < 16; i++){ 
      ctx.fillStyle = '#FDDDF2'
      ctx.fillRect(bar + barWidth + 1, 0, 1, canvas.height)
      bar += barWidth
    }

    // base bar graph for frequencies
    // for (let i = 0; i < bufferLength; i++){ 
    //     barHeight = dataArray[i]
    //     ctx.fillStyle = 'black'
    //     ctx.fillRect(bar , canvas.height - barHeight, barWidth, barHeight)
    //     bar += barWidth - 4
    // }

    barWidth = canvas.width/bufferLength + 4
    for (let i = 0; i < bufferLength; i++){ 
      // inner range for circle
      if (i >= 50 && i <= 60) {
        let rotation = 90
        for (let j = 0; j < 5; j++){
          barHeight = dataArray[i]
          ctx.save()
          ctx.translate(canvas.width/2, canvas.height/2)
          ctx.rotate((i * 34.5 + rotation) * Math.PI / 180)
          const hue = i * 8 + 130
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
          ctx.save()
          ctx.translate(canvas.width/2, canvas.height/2)
          ctx.rotate((i * 34.5 + rotation) * Math.PI / 180)
          const hue = i * 5 + 24
          ctx.fillStyle = `hsl(${hue},100%,${barHeight/3}%`
          ctx.fillRect(-1 * barWidth/2, -1 * barWidth/2, barWidth, barHeight + 5)
          x += barWidth
          ctx.restore()
          rotation += 90
        }
      }

      // base circle
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
      if (!ctx) return
      canvas.style.background = backgroundColor
      const animate = () => {
        if (!ctx) return
        let barWidth = 0

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