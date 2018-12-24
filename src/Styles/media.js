import { css } from 'styled-components'

const sizes = {
  giant: 1600,
  desktop: 1200,
  tablet: 1024,
  phone: 300
}


export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})
