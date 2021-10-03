import React from 'react'
import Connect from './components/Connect'
import VideoPlayer from './components/VideoPlayer'
import NetFlow from './components/NetFlow'

function App() {
  return (
    <>
      <NetFlow />
      <Connect />
      <VideoPlayer url="https://cdn.livepeer.com/hls/8128fj2yk2qjnfi3/index.m3u8" />
    </>
  )
}

export default App
