import { Fragment, useState } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import * as skins from 'react-rotary-knob-skin-pack'
import { Knob } from 'react-rotary-knob'

import circlesBottom from '../../assets/screw-circles-bottom.svg'
import granolaIcon from '../../assets/granola-icon.svg'

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
  Separator
} from './styles'

import { Labels } from '../../components/SliderSwitch/styles'

const Screws = () => (
  <>
    <RightCircleBottom src={circlesBottom} />
    <LeftCircleBottom src={circlesBottom} />
  </>
)

const Layout = () => {
  const [attack, setAttack] = useState(0)
  const [release, setRelease] = useState(0)

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
            <Row>
              <GreenScreenContainer>
                <GreenScreen value='audio source' />
              </GreenScreenContainer>
            </Row>

            <h2>GRANULAR ENGINE</h2>
            <SlidersContainer>
              <div className='slider-vertical'>
                <Slider
                  min={0}
                  max={100}
                  tooltip={false}
                  value={attack}
                  orientation='vertical'
                  onChange={(value) => { console.log('value', value); setAttack(value) }}
                />
                <Labels><label>attack</label></Labels>
              </div>
              <div className='slider-vertical'>
                <Slider
                  min={0}
                  max={100}
                  tooltip={false}
                  value={release}
                  orientation='vertical'
                  onChange={(value) => { console.log('value', value); setRelease(value) }}
                />
                <Labels><label>release</label></Labels>
              </div>
            </SlidersContainer>
            <Row>
              <Control>
                <h3>DENSITY</h3>
                <KnobContainer>
                  <Knob
                    unlockDistance={0}
                    onChange={(val) => {
                      // setVelocity(val)
                      window.midiConfig.velocity = val
                    }}
                    min={0.5}
                    max={2}
                  // value={velocity}
                    skin={skins.s13}
                    preciseMode={false}
                  />
                  {/* <span>{Math.round(velocity * 100) / 100}</span> */}
                </KnobContainer>
              </Control>
              <Control>
                <h3>SPREAD</h3>
                <KnobContainer>
                  <Knob
                    unlockDistance={0}
                    onChange={(val) => {
                      // setVelocity(val)
                      window.midiConfig.velocity = val
                    }}
                    min={0.5}
                    max={2}
                  // value={velocity}
                    skin={skins.s13}
                    preciseMode={false}
                  />
                  {/* <span>{Math.round(velocity * 100) / 100}</span> */}
                </KnobContainer>
              </Control>
              <Control>
                <h3>PITCH</h3>
                <KnobContainer>
                  <Knob
                    unlockDistance={0}
                    onChange={(val) => {
                      // setVelocity(val)
                      window.midiConfig.velocity = val
                    }}
                    min={0.5}
                    max={2}
                  // value={velocity}
                    skin={skins.s13}
                    preciseMode={false}
                  />
                  {/* <span>{Math.round(velocity * 100) / 100}</span> */}
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
                      // setVelocity(val)
                    }}
                    min={0.5}
                    max={2}
                  // value={velocity}
                    skin={skins.s13}
                    preciseMode={false}
                  />
                  {/* <span>{Math.round(velocity * 100) / 100}</span> */}
                </KnobContainer>
              </Control>
              <Control>
                <h3>DRY/WET</h3>
                <KnobContainer>
                  <Knob
                    unlockDistance={0}
                    onChange={(val) => {
                      // setVelocity(val)
                    }}
                    min={0.5}
                    max={2}
                  // value={velocity}
                    skin={skins.s13}
                    preciseMode={false}
                  />
                  {/* <span>{Math.round(velocity * 100) / 100}</span> */}
                </KnobContainer>
              </Control>
              <Control>
                <h3>PRE-DELAY</h3>
                <KnobContainer>
                  <Knob
                    unlockDistance={0}
                    onChange={(val) => {
                      // setVelocity(val)
                    }}
                    min={0.5}
                    max={2}
                  // value={velocity}
                    skin={skins.s13}
                    preciseMode={false}
                  />
                  {/* <span>{Math.round(velocity * 100) / 100}</span> */}
                </KnobContainer>
              </Control>
            </Row>
          </DeviceColumn>
          <DeviceColumn>
            <h2>OUTPUT</h2>
          </DeviceColumn>
        </DeviceSection>
      </DeviceContent>
    </DeviceLayout>
  )
}

export default Layout
