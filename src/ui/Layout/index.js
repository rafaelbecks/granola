import { Fragment, useState, useRef } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import * as skins from 'react-rotary-knob-skin-pack'
import { Knob } from 'react-rotary-knob'

import circlesBottom from '../../assets/screw-circles-bottom.svg'
import granolaIcon from '../../assets/granola-icon.svg'
import greenScreen from '../../assets/green-screen.mov'
import oscilloscope from '../../assets/oscilloscope.png'

import {
  DeviceLayout,
  RightCircleBottom,
  LeftCircleBottom,
  DeviceName,
  DeviceSection,
  DeviceContent,
  DeviceColumn,
  GreenScreenContainer,
  GreenScreen,
  Row,
  SlidersContainer,
  KnobContainer,
  Control,
  Separator,
  DeviceSelect,
  OscilloscopeScreen,
  GridScreen,
  LissajousCanvas,
  SmallContainer
} from './styles'

import { Led } from '../Leds/styles'

import { Labels } from '../../components/SliderSwitch/styles'

const Screws = () => (
  <>
    <RightCircleBottom src={circlesBottom} />
    <LeftCircleBottom src={circlesBottom} />
  </>
)

const Layout = (
  {
    audioDevices,
    selectedAudioDevice,
    onSelectAudioDevice,
    player
  }
) => {
  const audioSelect = useRef(null)
  const [attack, setAttack] = useState(0.8)
  const [decay, setDecay] = useState(0.7)
  const [mix, setMix] = useState(1)
  const [pitch, setPitch] = useState(2)
  const [spread, setSpread] = useState(0.6)
  const [density, setDensity] = useState(0.8)
  const [reverb, setReverb] = useState(0.3)
  const [sampleSize, setSampleSize] = useState(50)
  const [reverbDecay, setReverbDecay] = useState(6)
  const [reverbTime, setReverbTime] = useState(3)


  return (
    <DeviceLayout>
      <Screws />
      <DeviceName>
        <div>
          <img src={granolaIcon} alt='granola-icon' />
          <h1>GRANOLA</h1>
        </div>
        <h3>
          real time granular <br />delay / reverb
        </h3>
      </DeviceName>
      <DeviceContent>
        <DeviceSection>
          <DeviceColumn>
            <h2>AUDIO SOURCE</h2>
            <Row style={{ marginBottom: 0 }}>
              <GreenScreenContainer>
                <GreenScreen
                  style={{ width: '150px' }}
                  onClick={() => {
                    audioSelect.current.focus()
                  }}
                >{audioDevices[selectedAudioDevice]
                  ? audioDevices[selectedAudioDevice].label.substring(0, audioDevices[selectedAudioDevice].label.indexOf('('))
                  : 'NO DEVICE SELECTED'}
                </GreenScreen>
                <DeviceSelect
                  ref={audioSelect} onChange={async (e) => {
                    await onSelectAudioDevice(Number(e.target.value))
                  }}
                  value={selectedAudioDevice}
                >
                  <option value='-1'>No device selected </option>
                  {audioDevices.map(({ id, label }, index) => (<option value={index} key={index}>{label}</option>))}
                </DeviceSelect>
              </GreenScreenContainer>
            </Row>

            <h2>GRANULAR ENGINE {window.status}</h2>
            <SlidersContainer>
              <div className='slider-vertical'>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  tooltip={false}
                  value={attack}
                  orientation='vertical'
                  onChange={(value) => {
                    if (window.granular) {
                      window.granular.state.envelope.attack = value
                    }
                    setAttack(value)
                  }}
                />
                <Labels><label>attack</label></Labels>
              </div>
              <div className='slider-vertical'>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  tooltip={false}
                  value={decay}
                  orientation='vertical'
                  onChange={(value) => {
                    if (window.granular) {
                      window.granular.state.envelope.decay = value
                    }
                    setDecay(value)
                  }}
                />
                <Labels><label>decay</label></Labels>
              </div>
              <div className='slider-vertical'>
                <Slider
                  min={10}
                  max={100}
                  tooltip={false}
                  step={10}
                  value={sampleSize}
                  orientation='vertical'
                  onChange={(value) => {
                    if (window.granular) {
                      window.sampleSize = value
                    }
                    setSampleSize(value)
                  }}
                />
                <Labels><label>sample size</label></Labels>
              </div>

            </SlidersContainer>
            <Row>
              <Control>
                <h3>DENSITY</h3>
                <KnobContainer>
                  <Knob
                    unlockDistance={0}
                    onChange={(val) => {
                      setDensity(val)
                      if (window.granular) {
                        window.granular.state.density = val
                      }
                    }}
                    min={0}
                    max={1}
                    value={density}
                    skin={skins.s13}
                    preciseMode={false}
                  />
                  <span>{density.toFixed(2)}</span>
                </KnobContainer>
              </Control>
              <Control>
                <h3>SPREAD</h3>
                <KnobContainer>
                  <Knob
                    unlockDistance={0}
                    onChange={(val) => {
                      setSpread(val)
                      if (window.granular) {
                        window.granular.state.spread = val
                      }
                    }}
                    min={0}
                    max={1}
                    value={spread}
                    skin={skins.s13}
                    preciseMode={false}
                  />
                  <span>{Math.round(spread * 100) / 100}</span>
                </KnobContainer>
              </Control>
              <Control>
                <h3>PITCH</h3>
                <KnobContainer>
                  <Knob
                    unlockDistance={0}
                    onChange={(val) => {
                      setPitch(Math.ceil(val))
                      if (window.granular) {
                        window.granular.state.pitch = Math.ceil(val)
                        window.stopAnimation()
                        window.startAnimation()
                      }
                    }}
                    min={0}
                    max={3}
                    step={1}
                    value={pitch}
                    skin={skins.s13}
                    preciseMode={false}
                    rotateDegrees={120}
                  />
                  <span>{Math.round(pitch * 100) / 100}</span>
                </KnobContainer>
              </Control>
            </Row>

            <Separator />

            <h2 style={{ marginBottom: '5px' }}>REVERB</h2>
            <Row>
              <Control>
                <h3>DECAY</h3>
                <KnobContainer>
                  <Knob
                    unlockDistance={0}
                    onChange={(val) => {
                      setReverbDecay(Math.ceil(val))
                      window.reverb._decay = Math.ceil(val)
                    }}
                    min={20}
                    max={1}
                    value={reverbDecay}
                    skin={skins.s13}
                    preciseMode={false}
                  />
                  <span>{reverbDecay}</span>
                </KnobContainer>
              </Control>
              <Control>
                <h3>DRY/WET</h3>
                <KnobContainer>
                  <Knob
                    unlockDistance={0}
                    onChange={(val) => {
                      if (window.reverb) {
                        window.reverb.drywet(val)
                      }
                      setReverb(val)
                    }}
                    min={0}
                    max={2}
                    value={reverb}
                    skin={skins.s13}
                    preciseMode={false}
                  />
                  <span>{reverb.toFixed(2)}</span>
                </KnobContainer>
              </Control>
              <Control>
                <h3>TIME</h3>
                <KnobContainer>
                  <Knob
                    unlockDistance={0}
                    onChange={(val) => {
                      setReverbTime(Math.ceil(val))
                      window.reverb._seconds = Math.ceil(val)
                    }}
                    min={1}
                    max={10}
                    value={reverbTime}
                    skin={skins.s13}
                    preciseMode={false}
                  />
                  <span>{reverbTime}</span>
                </KnobContainer>
              </Control>
            </Row>
          </DeviceColumn>
          <DeviceColumn>
            <h2>OUTPUT</h2>
            <Row sytle={{
              justifyContent: 'space-evenly'
            }}
            >
              <div>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  tooltip={false}
                  orientation='horizontal'
                  value={mix}
                  onChange={(value) => {
                    setMix(value)
                    if (window.granular) {
                      window.granular.gain.gain.value = value
                      window.gainNode.gain.value = 0.1
                    }
                  }}
                />
                <Labels><label>mix</label></Labels>
              </div>

            </Row>
            <Separator />
            <SmallContainer>
            <h2>WAVEFORM</h2>
              <SmallContainer style={{margin: '0px 12px'}}>
                <Led className="ledOff" id="bufferLed" style={{position: 'relative', marginRight: '10px'}}/>
                <label>buffer start</label>
              </SmallContainer>
            </SmallContainer>
            <OscilloscopeScreen src={greenScreen} muted loop autoPlay noControls />
            <GridScreen src={oscilloscope} />
            <canvas
              style={{
                position: 'absolute',
                top: '393px'
              }} id='oscilloscope'
            />

            <LissajousCanvas id='lissajous' width='400' height='400' />

          </DeviceColumn>
        </DeviceSection>
      </DeviceContent>

    </DeviceLayout>
  )
}

export default Layout
