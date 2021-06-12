import styled from 'styled-components'

const DeviceLayout = styled.div`
    width: 708px;
    height: 667px;
    background: linear-gradient(180deg,rgb(0,88,122) 2%, rgb(0,19,34) 100%);
    -webkit-box-shadow: -3px 17px 25px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: -3px 17px 25px -1px rgba(0,0,0,0.75);
    box-shadow: -3px 17px 25px -1px rgba(0,0,0,0.75);
    position: relative;
    padding: 20px 34px 34px 24px;
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: transparent;
`

const RightCircleTop = styled.img`
    position: absolute;
    top: 0;
    margin: 16px;
    right: 0;
`

const LeftCircleTop = styled.img`
    position: absolute;
    top: 0;
    margin: 16px;
    left: 0;
`

const RightCircleBottom = styled.img`
    position: absolute;
    bottom: 0;
    margin: 16px;
    right: 0;
`

const LeftCircleBottom = styled.img`
    position: absolute;
    bottom: 0;
    margin: 16px;
    left: 0;
`

const DeviceName = styled.div`
  color: #fff;
  margin: 0;
  margin-bottom: 12px;
  display:flex;
  justify-content: space-between;
  font-family: 'Futura';
  div {
      display:flex;
      align-items:center;
  }
  h1 {
    font-weight: 100;
    font-size: 26px;
    margin-left: 10px;
    letter-spacing: 0.06em;
  }

  h3 {
    font-weight: 100;
    font-size: 16px;
    text-align: right;
    letter-spacing: 0.03em;
  }
`

const DeviceSection = styled.div`
    width: 100%;
    height: 100%;
    border: 1.5px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 24px 0px;
    display: flex;
    h2 {
        font-family: 'Futura';
        font-size: 18px;
        font-weight: 100;
        color: #fff;
        margin: 0;
    }
`

const DeviceContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const GreenScreen = styled.div`
    height: 38px;
    width: fit-content;
    min-width: 20px;
    padding: 0px 10px;
    display:flex;
    text-transform: uppercase;
    justify-content: center;
    align-items:center;
    background: #162340;
    margin: 0;
    font-family: 'Monda';
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #FAFFBC;
    text-align: center;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    margin: 22px 0px;
    height: 46px;
`

const Control = styled.div`
    height: 88px;
    width: 50%;
`

const Separator = styled.div`
    width: 144px;
    margin: 15px 0;
`

const SmallSeparator = styled.div`
    border-top: 0.5px solid #FFFFFF;
    width: 154px;
    margin: 4px 0;
`

const GreenScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const GridScreen = styled.img`
    position: absolute;
    width: 304px !important;
    top: 317px;
    height: 336px;
    mix-blend-mode: screen`

const OscilloscopeScreen = styled.video`
    width: 298px !important;
    height: 284px;
    margin-top: 20px;
    object-fit: cover;
    box-shadow: 0px 0px 7px 1px rgb(0 0 0 / 75%);
    mix-blend-mode:difference;
`

const ScreenMessage = styled.h2`
    position: absolute;
    margin: 0;
    top: 243px;
    font-size: 13px;
    font-family: 'Monda';
    color: #a1fd84;
    width: 175px;
    z-index: 1;
    opacity: 1;
    background: black;
    left: 31%;
`

const KnobContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    span {
      color: #fff;
      font-size: 9px;
      font-family: Futura;
      margin-top: 5px;
    }
`

const DeviceColumn = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SlidersContainer = styled.div`
    margin: -2px 0px 9px 0px;
    display: flex;
`
const DeviceSelect = styled.select`
    opacity: 0;
    position: relative;
    bottom: 39px;
    width: 170px;
    height: 38px;
`

const LissajousCanvas = styled.canvas`
    transform: scale(0.6);
    position: absolute;
    bottom: 57px;
    right: 11px;
    z-index: 0;
    mix-blend-mode: color-dodge;
`

export {
  DeviceLayout,
  Container,
  ScreenMessage,
  RightCircleTop,
  LeftCircleTop,
  RightCircleBottom,
  LeftCircleBottom,
  DeviceSection,
  DeviceName,
  DeviceContent,
  GreenScreen,
  Row,
  Control,
  Separator,
  GreenScreenContainer,
  SmallSeparator,
  OscilloscopeScreen,
  GridScreen,
  KnobContainer,
  DeviceColumn,
  SlidersContainer,
  DeviceSelect,
  LissajousCanvas
}
