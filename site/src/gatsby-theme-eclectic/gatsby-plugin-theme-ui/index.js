import merge from 'deepmerge'
import typography from './typography'
import colors from './colors'
import styles from 'gatsby-theme-semantic-ui/src/gatsby-plugin-theme-ui/styles'
import prism from 'gatsby-theme-semantic-ui/src/gatsby-plugin-theme-ui/prism'

export default merge(typography, {
    initialColorMode: `light`,
    body: {
        margin: 0
    },
    colors,
    fonts: {
        heading: 'Work Sans, sans-serif',
        monospace: `Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`
    },
    sizes: {
        main: `100vw`,
        container: 672
    },
    styles,
    prism
})
