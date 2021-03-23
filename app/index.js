import React from 'react'
import { render } from 'react-dom'
import { ipcRenderer } from 'electron'
import App from './app'
import Peers from './components/Peers'
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import { RootStore } from "./stores/RootStore";


// ipcRenderer.on('darkMode', (event, darkMode) => {
//   store.dispatch({
//     type: 'CHANGE_DARK_MODE',
//     darkMode
//   })
// })

const store = new RootStore();

render(
  <React.StrictMode>
     <HashRouter>
        <Provider appStore={store}>
        <div className="App">
          <Route path="/" exact component={App} />
          <Route path="/peers" exact component={Peers} />
        </div>
        </Provider>
      </HashRouter>
  </React.StrictMode>, 
document.querySelector('#root'))
