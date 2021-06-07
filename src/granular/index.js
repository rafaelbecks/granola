import p5 from 'p5'
import 'p5/lib/addons/p5.sound'
import Granular from 'granular-js'

import Oscilloscope from '../lib/oscilloscope'
import { flattenArray, writeUTFBytes, interleave } from '../buffer'

let recorder
window.granular = null
window.granularId = null
let leftchannel = []
let rightchannel = []
let recordingLength = 0
const sampleRate = 44100
const maxSampleSize = 5
let selectedSize = 0
let sampleSize = 0
let voiceInit = false
window.granularStop = false
window.sampleSize = 50

const initGranularEngine = async () => {
  const context = p5.prototype.getAudioContext()
  const source = context.createMediaStreamSource(window.audioStream)
  const processor = context.createScriptProcessor(1024, 1, 1)

  window.gain = context.createGain()
  window.gain.gain.value = 0.8
  window.gain.connect(context.destination)

  source.connect(window.gain)

  const oscilloscope = new Oscilloscope('#js-oscilloscope', context)
  window.gain.connect(oscilloscope.analyserNode)
  oscilloscope.start()

  source.connect(processor)
  processor.connect(context.destination)

  const bufferSize = 2048
  const numberOfInputChannels = 2
  const numberOfOutputChannels = 2

  if (context.createScriptProcessor) {
    recorder = context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels)
  } else {
    recorder = context.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)
  }

  window.granular = new Granular({
    audioContext: context,
    envelope: {
      attack: 0.5,
      decay: 0.5
    },
    density: 0.3,
    spread: 0.5,
    pitch: 1
  })

  window.gainNode = window.granular.context.createGain()

  window.delay = new p5.Delay()

  window.delay.process(window.granular, 0.5, 0.5, 3000)

  window.reverb = new p5.Reverb()

  window.reverb.drywet(1)

  window.reverb.process(window.delay, 3, 6)

  window.reverb.amp(6)

  const compressor = new p5.Compressor()

  compressor.process(oscilloscope, 0.005, 6, 10, -24, 0.05) // [attack], [knee], [ratio], [threshold], [release]

  // granular.on('settingBuffer', () => console.log('setting buffer'))
  // granular.on('bufferSet', () => console.log('buffer set'))
  // granular.on('grainCreated', () => console.log('grain created'))

  recorder.onaudioprocess = async function (e) {
    leftchannel.push(new Float32Array(e.inputBuffer.getChannelData(0)))
    rightchannel.push(new Float32Array(e.inputBuffer.getChannelData(1)))
    recordingLength += bufferSize

    selectedSize++
    if (selectedSize % window.sampleSize === 0 && !window.granularStop) {
      console.log('sampling')
      sampleSize++
      const leftBuffer = flattenArray(leftchannel, recordingLength)
      const rightBuffer = flattenArray(rightchannel, recordingLength)
      const interleaved = interleave(leftBuffer, rightBuffer)

      const buffer = new ArrayBuffer(44 + interleaved.length * 2)

      const view = new DataView(buffer)

      // RIFF chunk descriptor
      writeUTFBytes(view, 0, 'RIFF')
      view.setUint32(4, 44 + interleaved.length * 2, true)
      writeUTFBytes(view, 8, 'WAVE')
      // FMT sub-chunk
      writeUTFBytes(view, 12, 'fmt ')
      view.setUint32(16, 16, true) // chunkSize
      view.setUint16(20, 1, true) // wFormatTag
      view.setUint16(22, 2, true) // wChannels: stereo (2 channels)
      view.setUint32(24, sampleRate, true) // dwSamplesPerSec
      view.setUint32(28, sampleRate * 4, true) // dwAvgBytesPerSec
      view.setUint16(32, 4, true) // wBlockAlign
      view.setUint16(34, 16, true) // wBitsPerSample
      // data sub-chunk
      writeUTFBytes(view, 36, 'data')
      view.setUint32(40, interleaved.length * 2, true)

      // write the PCM samples
      let index = 44
      const volume = 1
      for (let i = 0; i < interleaved.length; i++) {
        view.setInt16(index, interleaved[i] * (0x7FFF * volume), true)
        index += 2
      }

      const blob = new window.Blob([view], { type: 'audio/wav' })
      const finalBuffer = await blob.arrayBuffer()

      if (sampleSize === maxSampleSize) {
        leftchannel = []
        rightchannel = []
        recordingLength = 0
        sampleSize = 0
      }
      await window.granular.setBuffer(finalBuffer)

      if (!voiceInit) {
        voiceInit = true
        window.granularId = window.granular.startVoice({
          position: 0.5,
          volume: 0.9,
          gain: 0.9
        })
      }
    }
  }

  // we connect the recorder
  compressor.connect(recorder)
  recorder.connect(context.destination)
}

export { initGranularEngine }
