import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.global.css';
import { inject, observer } from "mobx-react";

import Peers from './components/Peers'

// const Home = () => {
//   return (
//     <>
//       <Peers />
//     </>
//   );
// };

// export default function App() {
//   return (
//     <React.StrictMode>
//      <BrowserRouter>
//         <div className="App">
//           <Route path="/" exact component={App} />
//           <Route path="/peers" exact component={Peers} />
//         </div>
//       </BrowserRouter>
//   </React.StrictMode>
//   );
// }

@inject("appStore")
@observer
class App extends Component {

  pairClick = () => {
    this.props.appStore.streamStore.pair()
  }

  render(){
    return (
        <div>
          <div className="App">
            <h5 className="title">Li4OS</h5>
            <p className="title">your digital wellness bench</p>
            <p className="title">{this.props.appStore.streamStore.isPairing ? 'pairing ...' : "we're ready for you"}</p>
            {/**/}
            <button onClick={this.pairClick}>pair</button>
            <button ><Link to="/peers">peers</Link></button>
          </div>
      </div>
    );
  }
}

export default App;
