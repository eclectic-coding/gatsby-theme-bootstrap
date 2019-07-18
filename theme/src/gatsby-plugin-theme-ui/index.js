import merge from 'deepmerge'
import typography from './typography'
import colors from './colors'
import styles from './styles'
import prism from './prism'

export default merge(typography, {
  initialColorMode: `light`,
  colors,
  body: {
    margin: 0,
  },
  fonts: {
    heading: 'Work Sans, sans-serif',
    monospace: `Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
  },
  sizes: {
    main: `100vw`,
    container: 672,
  },
  styles,
  prism,
})
