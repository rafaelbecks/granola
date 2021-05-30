import styled from 'styled-components'

const ControlContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    cursor: pointer;
`

const ControlUp = styled.div`
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 14px solid #FAFFBC;
`

const ControlDown = styled.div`
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 14px solid #FAFFBC;
`

export {
  ControlUp,
  ControlDown,
  ControlContainer
}
