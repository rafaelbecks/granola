import { useState } from 'react'
import { SliderContainer, SliderBase, SliderRange, Labels } from './styles'


const positionValues = {
  2: [2,28],
  3: [2,15,28],
  4: [0, 10, 20, 28]
}

const SliderSwitch = ({ values, onChange }) => {
  const [toggle, setToggle] = useState(0)
  const position = positionValues[values.length]

  return (
    <>
      <SliderContainer onClick={() => {
        const toggleValue = toggle + 1 === values.length ? 0 : toggle + 1
        setToggle(toggleValue)
        if (onChange) { onChange(values[toggleValue]) }
      }}
      >
        <SliderBase />
        <SliderRange style={{ left: `${position[toggle]}px` }} />
      </SliderContainer>
      <Labels>
        {values && values.map(label => (
          <label key={label}>{label}</label>
        ))}
      </Labels>
    </>

  )
}

export default SliderSwitch
