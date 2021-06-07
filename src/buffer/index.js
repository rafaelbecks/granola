export function flattenArray (channelBuffer, recordingLength) {
  const result = new Float32Array(recordingLength)
  let offset = 0
  for (let i = 0; i < channelBuffer.length; i++) {
    const buffer = channelBuffer[i]
    result.set(buffer, offset)
    offset += buffer.length
  }
  return result
}

export function writeUTFBytes (view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}

export function interleave (leftChannel, rightChannel) {
  const length = leftChannel.length + rightChannel.length
  const result = new Float32Array(length)

  let inputIndex = 0

  for (let index = 0; index < length;) {
    result[index++] = leftChannel[inputIndex]
    result[index++] = rightChannel[inputIndex]
    inputIndex++
  }
  return result
}
