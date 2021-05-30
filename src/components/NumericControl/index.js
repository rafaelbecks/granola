import { useState } from 'react'
import { GreenScreen } from '../../ui/Layout/styles'
import { ControlContainer, ControlUp, ControlDown } from './styles'

const NumericControl = ({ minValue, maxValue, initialValue, onChange, width }) => {
  const [value, setValue] = useState(initialValue)

  return (
    <>
      <GreenScreen style={{ width: width || 'unset' }} value={value} onChange={(e) => { setValue(e.target.value); onChange(Number(e.target.value)) }} />
      <ControlContainer>
        <ControlUp onClick={() => {
          if (Number(value) < maxValue) { setValue(Number(value) + 1); onChange(Number(value) + 1) }
        }}
        />
        <ControlDown onClick={() => {
          if (Number(value) > minValue) { setValue(Number(value) - 1); onChange(Number(value) - 1) }
        }}
        />
      </ControlContainer>
    </>
  )
}

export default NumericControl
