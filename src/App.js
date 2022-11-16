import { useEffect, useState, useRef } from 'react'

import './App.css'
import Layout from './ui/Layout'
import { initGranularEngine } from './granular'
function App () {
  const player = useRef(null)
  const [audioDevices, setAudioDevices] = useState([])
  const [selectedAudioDevice, selectAudioDevice] = useState(-1)
  window.audioStream = null

// eslint-disable-next-line
  useEffect(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const audioDevices = devices.filter((d) => d.kind === 'audioinput')
    setAudioDevices(audioDevices)
  }, [])

  useEffect(() => {
    console.log('audioDevices', audioDevices)
  }, [audioDevices])

  const playSoundFromDevice = async (index) => {
    if (index >= 0) {
      const stream = await navigator.mediaDevices
        .getUserMedia({
          audio: {
            deviceId: audioDevices[index].deviceId
          },
          video: false
        })

      window.audioStream = stream
    }
  }

  const onSelectAudioDevice = async (value) => {
    selectAudioDevice(value)
    if (value < 0) {
      return
    }
    await playSoundFromDevice(value)
    await initGranularEngine()
  }

  return (
    <div className='App'>
      <Layout
        audioDevices={audioDevices}
        selectedAudioDevice={selectedAudioDevice}
        onSelectAudioDevice={onSelectAudioDevice}
        player={player}
      />
    </div>
  )
}

export default App
