'use client'

import { useEffect, useRef, useState } from "react";
import ArtGraphic from "./artGraphic";
import { refreshAccessToken } from "../lib/apiCalls";

export default  function streamProcesser() {
  const displayMediaOptions = {
    video: true,
    audio: true,
    preferCurrentTab: true,
    surfaceSwitching: 'exclude',
    systemAudio: "exclude",
  }

  const [sharingStream, setSharingStream] = useState(false)
  const [audioStream, setAudioStream] = useState<MediaStream>()
  const streamOptionRef = useRef<HTMLButtonElement>(null)
  const analyser = useRef<AnalyserNode>()
  const bufferLength = useRef<number>(0)
  const dataArray = useRef<Uint8Array>()

  const startStream = () => {
    setSharingStream(true)
  }

  const stopStream = () => {
    if (audioStream) {
      let tracks = audioStream?.getTracks()
      tracks.forEach((track) => track.stop());
      setSharingStream(false)
    }
  }

  // Gets permission to use audio from user and processes it
  useEffect(() => {
    refreshAccessToken()
    if (sharingStream) {
      navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
      .then((stream) => {
        setAudioStream(stream)
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
          setSharingStream(false)
        }
      })
    } else{
      setAudioStream(undefined)
    }
  }, [sharingStream])

  return (
      <>
        <ArtGraphic analyser={analyser.current} bufferLength={bufferLength.current} dataArray={dataArray.current} audioStream={audioStream} stopStream={stopStream}/>
        {!sharingStream ? 
        <button ref={streamOptionRef} onClick={() => startStream()}>Start Streaming</button> 
        : <button ref={streamOptionRef} onClick={() => stopStream()}>Stop Streaming</button> }
      </>
  )
}