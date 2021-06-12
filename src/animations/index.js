import * as Scope from 'oscilloscope'

export const initOscilloscope = (source) => {
  const canvas = document.getElementById('oscilloscope')
  const scope = new Scope(source)

  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = '#20EDFD'
  ctx.lineWidth = 2

  scope.animate(canvas.getContext('2d'))
}

export const initLissajous = () => {
  let ctx
  let timer = null; const delay = 20
  const aS = []
  const rad = 199
  const max = 3 * 360; const m1 = max - 1; const m2 = max / 2
  const parN = 3; let parM = 1
  const canvas = document.getElementById('lissajous')
  let iXo = 0; let iYo = m2 / 2

  const mValues = {
    1: 3,
    2: 1,
    3: 2
  }

  window.startAnimation = () => {
    if (!timer) timer = setInterval(draw, delay)
  }

  window.stopAnimation = () => {
    if (!timer) return false
    clearInterval(timer)
    timer = null
  }

  const draw = () => {
    let Xo = aS[iXo]; let Yo = aS[iYo]
    parM = window.granular ? mValues[window.granular.state.pitch] : 3
    ctx.beginPath()
    ctx.moveTo(Xo, Yo)
    for (let j = max; j > 0; j--) {
      const iX = (iXo + parM) % max; const iY = (iYo + parN) % m1
      const X = aS[iX]; const Y = aS[iY]
      ctx.lineTo(X, Y)
      iXo = iX; iYo = iY; Xo = X; Yo = Y
    }
    ctx.clearRect(0, 0, 400, 400)
    ctx.stroke()
    ctx.strokeStyle = '#20EDFD'
  }

  if (canvas.getContext) {
    ctx = canvas.getContext('2d')
    const sf = Math.sin(3.14159265 / m2); const cf = Math.cos(3.14159265 / m2)
    let s = -sf; let c = cf
    for (let i = 0; i < m2; i++) {
      const s1 = s * cf + c * sf; c = c * cf - s * sf; s = s1
      aS[i] = Math.round(rad * (1.0 + s)) + 1
      aS[i + m2] = Math.round(rad * (1.0 - s)) + 1
    }
    window.startAnimation()
  }
}
