// Action creator.
export function alternate(toggle, type) {
  console.log(`Video stream: ${type}`)
  return {
    type: type,
    payload: toggle,
  }
}

export function updateValue(value, type) {
  console.log(`Video stream: ${type}`)
  return {
    type: type,
    payload: value,
  }
}
