'use client'

import { useEffect, useRef, useState } from "react";

export default  function ArtGraphic() {
  const displayMediaOptions = {
    video: true,
    audio: true,
    preferCurrentTab: true,
    surfaceSwitching: 'exclude',
    systemAudio: "exclude",
  };

  const [startStream, setStartStream] = useState(true)
  const streamOptionRef = useRef<HTMLButtonElement>(null)
  const canRef = useRef<HTMLCanvasElement>(null)
  const audioStream = useRef<MediaStream>()
  const analyser = useRef<AnalyserNode>()
  const bufferLength = useRef<number>(0)
  const dataArray = useRef<Uint8Array>()

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

  // Gets permission to use audio from user and processes it
  useEffect(() => {
    if (startStream) {
      navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
      .then((stream) => {
        audioStream.current = stream
        const audioCtx = new AudioContext()
        const source = audioCtx.createMediaStreamSource(stream)
        analyser.current = audioCtx.createAnalyser()
        source.connect(analyser.current)
        analyser.current.fftSize = 128
        bufferLength.current = analyser.current.frequencyBinCount
        dataArray.current = new Uint8Array(bufferLength.current)
      })
      .catch((err) => { //produces and error when the promise fails
        if (err instanceof DOMException) {
          console.log('There was an error getting the media stream')
          setStartStream(false)
        }
      })
    }
  }, [startStream])

  useEffect(() => {
    const canvas = canRef.current
    const ctx = canvas?.getContext('2d')
    let animationFrameId: number

    if (canvas) {
      const animate = () => {
        if (!ctx) return
        console.log(audioStream.current?.active)
        const barWidth = canvas.width/bufferLength.current
        draw(ctx, canvas, analyser.current, bufferLength.current, dataArray.current, barWidth)
        if ((audioStream.current?.active || !audioStream.current) && startStream)
          animationFrameId = requestAnimationFrame(animate)
        else {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
          audioStream.current = undefined
          setStartStream(false)
        }
      }
      animate()
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [draw])

  return (
      <>
        <canvas ref={canRef} width={200} height={500}/>
        {!startStream ? <button ref={streamOptionRef} onClick={() => setStartStream(true)}>Start Stream Again?</button> : null}
      </>
  )
}