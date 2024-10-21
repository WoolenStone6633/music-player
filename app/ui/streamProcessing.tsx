'use client'

import { useEffect, useRef, useState } from "react";
import StreamOptionButton from "./streamOptionButton";
import ArtGraphic from "./artGraphic";

export default  function streamProcessing() {
  const displayMediaOptions = {
    video: true,
    audio: true,
    preferCurrentTab: true,
    surfaceSwitching: 'exclude',
    systemAudio: "exclude",
  }

  const [startStream, setStartStream] = useState(true)
  const streamOptionRef = useRef<HTMLButtonElement>(null)
  const audioStream = useRef<MediaStream>()
  const analyser = useRef<AnalyserNode>()
  const bufferLength = useRef<number>(0)
  const dataArray = useRef<Uint8Array>()

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
    // if ((!audioStream.current?.active || audioStream.current) && !startStream) {
    //   audioStream.current = undefined
    //   setStartStream(false)
    // }
    if (audioStream.current?.active !== undefined)
      setStartStream(audioStream.current?.active)
  }, [audioStream.current?.active])

  return (
      <>
        <ArtGraphic analyser={analyser.current} bufferLength={bufferLength.current} dataArray={dataArray.current} stop={!startStream} audioStream={audioStream.current}/>
        {/* <StreamOptionButton startStream={startStream} ref={streamOptionRef} setStartStream={setStartStream}/> */}
        {!startStream ? <button ref={streamOptionRef} onClick={() => setStartStream(true)}>Start Stream Again?</button> : null}
      </>
  )
}