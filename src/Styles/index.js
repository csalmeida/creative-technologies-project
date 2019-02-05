import { createGlobalStyle } from "styled-components"

import MiriamLibreRegular from "../Assets/Fonts/MiriamLibre-Regular.ttf"
import MiriamLibreBold from "../Assets/Fonts/MiriamLibre-Bold.ttf"

import { palette } from "./colors"
import { media } from "./media"

export const GlobalStyles = createGlobalStyle`
  @font-face {
      font-family: MiriamLibreRegular;
      src: url('${MiriamLibreRegular}');
  }

  @font-face {
      font-family: MiriamLibreBold;
      src: url('${MiriamLibreBold}');
      font-style: bold;
  }

  html {
    font-size: 62.5%;
    line-height: 62.5%;
  }

  @media screen and (min-width: 320px) {
    html {
      font-size: calc(62.5% + 6 * ((100vw - 320px) / 680));
      line-height: calc(62.5% + 6 * ((100vw - 320px) / 680));
    }
  }

  @media screen and (min-width: 1000px) {
    html {
      font-size: 125%;
      line-height: 125%;
    }
  }

  body {
    background-color: ${palette.darktone};
    color: ${palette.text};
    font-family: MiriamLibreRegular, monospace, sans-serif;
    margin: 0;
  }

  h1, h2, h3,
  h4, h5, h6 {
    font-family: MiriamLibreBold, monospace, sans-serif;
    font-weight: 400;
    line-height: inherit;
    color: ${palette.lighttone};
  }

  h1 {
    font-size: 2.4em;
    line-height: 1.5em;
  }

  p {
    font-family: MiriamLibreRegular, monospace, sans-serif;
    font-weight: 400;
    font-size: 1.2em;
    line-height: 2em;
  }

  a, a:visited {
    font-family: MiriamLibreRegular, monospace, sans-serif;
    font-weight: normal;
    font-size: 1.2em;
    text-decoration: line-through;
    color: ${palette.text};
    transition: text-decoration 2s;
  }

  a:hover {
    text-decoration: overline;
  }

  label, input {
    font-family: MiriamLibreRegular, monospace, sans-serif;
    color: ${palette.text};
    font-size: 1.2em;
  }

  ${media.desktop`
    h1 { font-size: 2em; }
    p { font-size: 1em; }
  `}
`
