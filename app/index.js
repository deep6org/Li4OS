import React from 'react'
import { render } from 'react-dom'
import { ipcRenderer } from 'electron'
import App from './app'

// ipcRenderer.on('darkMode', (event, darkMode) => {
//   store.dispatch({
//     type: 'CHANGE_DARK_MODE',
//     darkMode
//   })
// })

render( <App />, document.querySelector('#root'))
