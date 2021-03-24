import React, {Component} from 'react';
import { inject, observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.global.css';

import Peers from './components/Peers'
import Overlay from './components/Overlay'

import Loader from "react-loader-spinner";

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

 const colors = [
  {
    1: "red",
    2: [203, 101, 0]
  },
  {
    1: "yellow",
    2: "blue"
  },
  ]

  const getForm = () => {
    return [1,2,4]
  }


function Nav(){
  return (
      <>
        <button className="nav-button" ><Link to="/meditation">meditation</Link></button> 
        <button className="nav-button" ><Link to="/activity">activity</Link></button> 
        <button className="nav-button" ><Link to="/trials">trials</Link></button> 
      </>
    )
}

@inject("appStore")
@observer
class CenteredButton extends Component {

  render(){
    return(
      <>
        <div>
          <input 
            style={{height: '30px', width: '100%'}}
            value={this.props.appStore.name} 
            onChange={(e) => this.props.appStore.streamStore.setName(e.target.value)}
            placeholder={"device name"}
            >
          </input>
          <br/>
          <button style={{marginTop: '10px', marginLeft: '0px', width: '100%'}}onClick={this.props.pair}>pair</button>
        </div>
      </>
    )
  }
}

@inject("appStore")
@observer
class App extends Component {

  constructor(props) {
    super(props)
  }

  pairClick = () => {
    this.props.appStore.streamStore.pair()
  }

  render(){
    const {streamStore} = this.props.appStore
    return (
        <div>
          <div className="App">
          {
            streamStore.isPaired ? 
            <Overlay className={'react-p5'} color1={colors[0]['1']} color2={colors[0]['2']} />
            :
            <div>
              <h5 className="title">Li4OS</h5>
              <br/>
              <p className="title">your digital wellness bench</p>
              <br/>
            </div>
          }
            <p className="title">{this.props.appStore.streamStore.isPairing ? streamStore.isPaired ?  null : 'pairing ...' : "we're ready for you"}</p>
            <div >
              {
                streamStore.isPairing ?  streamStore.isPaired ? <Nav />: <div className={'container'}> <Loader type="RevolvingDot" color="grey" height={100} width={100} /> </div>: <CenteredButton pair={this.props.appStore.streamStore.pair} />
              }
            </div>
          </div>
      </div>
    );
  }
}

export default App;
