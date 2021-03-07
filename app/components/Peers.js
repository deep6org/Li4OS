// ./components/Peers.js

import React, { useEffect, useState } from 'react'
import crypto from 'crypto'

// import hypeswarm from 'hyperswarm'
import hypercore from 'hypercore'
import rai from 'random-access-idb'
import CsvDownload from 'react-json-to-csv'
import Overlay from './Overlay';
import { homedir } from 'os'
import path from 'path'

import Client from 'cabal-client';
// require('random-access-idb')('dbname')

const storage = rai('pool6')

const core = hypercore(storage, {valueEncoding: 'json'})
const cache = []
// setInterval(() => {
 // core.append({val: Math.random()})
// }, 2000) 

const DEFAULT_CHANNEL = 'default'
const HOME_DIR = homedir()
const DATA_DIR = path.join(HOME_DIR, '.cabal-desktop', `v${Client.getDatabaseVersion()}`)
const DATA_DIR_REMOTE = path.join(HOME_DIR, '.cabal-desktop-remote', `v${Client.getDatabaseVersion()}`)
const STATE_FILE = path.join(DATA_DIR, 'cabals.json')
const DEFAULT_PAGE_SIZE = 100
const MAX_FEEDS = 1000

const client = new Client({
  maxFeeds: MAX_FEEDS,
  config: {
    dbdir: DATA_DIR
  },
})

const remoteClient = new Client({
  maxFeeds: MAX_FEEDS,
  config: {
    dbdir: DATA_DIR_REMOTE
  },
})

let cabal;

function Peers () {

  const [isReady, setIsReady] = useState(false)
  const [isWatching, setIsWatching] = useState(false)
  const [peers, setPeers] = useState([])
  const [intention, setIntention] = useState("")
  const [isIntention, setIsIntention] = useState(false)
  const [key, setKey] = useState("")
  const [name, setName] = useState("")
  const [users, setUsers] = useState([])
  const [pool, setPool] = useState('~')
  // const [cabal, setCabal] = useState({})

  const clickConnect = async () => {
    console.log(key)
    console.log(client)
    const cabalDetails = await remoteClient.addCabal(key)
    cabal = cabalDetails;
    setPool(cabalDetails.key)
    // const cabalDetails = client.addCabal(key)
    // console.log(cabalDetails)
     cabalDetails.on('new-message', ({ channel, author, message }) => {
       console.log(author)
       console.log('Recieved: "' + message.value.content.text + '" in channel ' + channel + " from " + author.key.substring(0,5)

       if(channel == 'data'){
         cache.push({user: author, data: parseFloat(message.value.content.text)})
       }
    })
  }
  
  const clickHost = async () => {
    if(!isReady){
      const cabalDetails = await client.createCabal()
      cabal = cabalDetails
      setPool(cabalDetails.key)

      cabal.on('new-message', ({ channel, author, message }) => {
         console.log('Recieved: "' + message.value.content.text + '" in channel ' + channel + " from " + author.key.substring(0,5))
      })

      setInterval(() => {
        cabal.publishMessage({
          type: 'chat/text',
          content: {
            text: 'People call me ' + cabalDetails.getLocalme(),
            channel: 'introduction'
          }
        })
      }, 2000)

      setIsReady(true)
    }
  };

  useEffect(() => {
      // host()
     if(!isWatching){
       setInterval(() => {
         const users = cabal.getUsers()
         let userList = Object.keys(users)
         setUsers(userList)
       }, 2000)
       setIsWatching(true)
     }
  })

  const getForm = () => {
    return [1,2,4]
  }

  const setIntentClick = () => { 
    core.append({msg: intention})
    setIntention(intention)
    setIsIntention(true)
  }

  const clickPair = () => {
    console.log(`attempting to pair ${name}`)
    
    var blueberryControllerA = new BlueberryWebBluetoothA(name);
    blueberryControllerA.connect();

    blueberryControllerA.onStateChange((state) => {
      cabal.publishMessage({
          type: 'chat/text',
          content: {
            text: "" + state.fNIRS.L1,
            channel: 'data'
          }
        })
    });
  }


  const handleSubmit = e => {
    // e.preventDefault();
    alert("you have intended for - " + value);
    // or you can send data to backend
  };

  const handleKeypress = e => {
    console.log('press')
    console.log(e.keyCode)
      //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

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

  return (
    <div>
      <p style={{color: 'slatedarkgrey', textAlign: 'center'}}>gather</p>
      <p style={{color: 'grey', textAlign: 'center', cursor: 'pointer'}} onClick={() => {navigator.clipboard.writeText(pool)}}>{pool}</p>
      {/*<p style={{color: 'grey', textAlign: 'center'}}>gæther</p>*/}
      { isIntention ? <ul>
        <br/>
        <br/>
        <div className="stage">
        {users ? users.map((peer, i) => { 
          return (
            <div key={i} className="aura">
              <Overlay color1={colors[i]['1']} color2={colors[i]['2']} getForm={getForm}/>
              <li style={{textAlign: 'center', color: 'darkslategray'}}>{peer.substring(0,4) + '..'}</li>
            </div>
          )}) : null}
        </div>
        <br />
        <br />
        <br />
        <div style={{textAlign: 'center'}}>
          <br/>
          <button onClick={() => clickPair()}>pair</button>
          <button onClick={async () => await clickHost()}>host </button>
          <button disabled={false} onClick={async () => await clickConnect()}>connect</button>
          <input 
            style={{height: '30px'}}
            value={key} 
            onChange={(e) => setKey(e.target.value)}
            onKeyPress={handleKeypress}
            placeholder={"gather key"}
            disabled={false}
            >
          </input>
          <CsvDownload data={cache} />
        </div>
      </ul> 
      :          
        <div style={{textAlign: 'center'}}> 
          <br/>
          <br/>
          <input 
            style={{height: '30px'}}
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder={"name"}
            >
          </input>
          <br />
          <br />
          <input 
            style={{height: '30px'}}
            value={intention} 
            onChange={(e) => setIntention(e.target.value)}
            onKeyPress={handleKeypress}
            placeholder={"intention"}
            >
          </input>
          <br />
          <br />
          <button onClick={() => setIntentClick()}>set</button> 
        </div>
      }
    </div>
  )
}

export default Peers


/**
* @modified by Blueberry
* @author Charlie Gerard / http://charliegerard.github.io reference
*/

const services = {
  fnirsService: {
    name: 'fnirs service',
    uuid: '0f0e0d0c-0b0a-0908-0706-050403020100' 
  }
}

const characteristics = {
  commandCharacteristic: {
    name: 'write characteristic',
    uuid: '1f1e1d1c-1b1a-1918-1716-151413121110'
  },
  fnirsCharacteristic: {
    name: 'read fnirs data characteristic',
    uuid: '3f3e3d3c-3b3a-3938-3736-353433323130'
  }
}

// 3f3e3d3c-3b3a-3938-3736-353433323130
// 4f4e4d4c-4b4a-4948-4746-454443424140

var _thisA;
var stateA = {};
var writeCharac;

class BlueberryWebBluetoothA{
  constructor(name){
    _thisA = this;
    this.name = name;
    this.services = services;
    this.characteristics = characteristics;
    this.standardServer;
  }

  connect(){
    return navigator.bluetooth.requestDevice({
      filters: [
        {name: this.name},
        {
          services: [services.fnirsService.uuid]
        }
      ]
    })
    .then(device => {
      console.log('Device discovered', device.name);
      return device.gatt.connect();
    })
    .then(server => {
      console.log('server device: '+ Object.keys(server.device));

      this.getServices([services.fnirsService], [characteristics.commandCharacteristic, characteristics.fnirsCharacteristic], server);
    })
    .catch(error => {console.log('error',error)})
  }

  getServices(requestedServices, requestedCharacteristics, server){
    this.standardServer = server;

    requestedServices.filter((service) => {

      //start up control command service
      if(service.uuid == services.fnirsService.uuid){
        _thisA.getControlService(requestedServices, requestedCharacteristics, this.standardServer);
      }
    })
  }

  getControlService(requestedServices, requestedCharacteristics, server){
      let controlService = requestedServices.filter((service) => { return service.uuid == services.fnirsService.uuid});
      let commandChar = requestedCharacteristics.filter((char) => {return char.uuid == characteristics.commandCharacteristic.uuid});

      // Before having access to fNIRS data, we need to indicate to the Blueberry that we want to receive this data.
      return server.getPrimaryService(controlService[0].uuid)
      .then(service => {
        console.log('getting service: ', controlService[0].name);
        return service.getCharacteristic(commandChar[0].uuid);
      })
      .then(characteristic => {
        writeCharac = characteristic;
      })
      // .then(descriptor => {
      //   writeDescriptor = descriptor;
      //   console.log('Reading Descriptor...');
      //   //return descriptor.readValue();
      //   return;
      // })
      .then(_ => {
        let fnirsService = requestedServices.filter((service) => {return service.uuid == services.fnirsService.uuid});

        if(fnirsService.length > 0){
          console.log('getting service: ', fnirsService[0].name);
          _thisA.getfNIRSData(fnirsService[0], characteristics.fnirsCharacteristic, server);
        }
      })
      .catch(error =>{
        console.log('error: ', error);
      })
  }

   //    RGB Controller
    //    0xA0FF0000
    //    example 0xA0FF0000 //RED ON
    //    example 0xA0FFFF00 //RED ON GREEN ON BLUE OFF
    //    0xA0 = RGB control flag 

  ctrlCommand(hexValue, redValue, greenValue, blueValue){
      //console.log('getting characteristic: ', commandChar[0].name);
      //let commandChar = characteristics.commandCharacteristic.uuid;
      let commandValue = new Uint8Array([0xA0],[redValue], [greenValue], [blueValue]);
      writeCharac.writeValue(commandValue)
      .then(_ => {
        console.log('> Characteristic User Description changed to: ' + value);
      })
      .catch(error => {
        console.log('Argh! ' + error);
      });

  }

  handlefNIRSDataChanged(event){
    //byteLength of fNIRSdata
    let fNIRSData = event.target.value
    // console.log(fNIRSData);
    
    let valueHemo1 = event.target.value.getInt32(2);    
    let valueHemo2 = event.target.value.getInt32(6);
    let valueHemo3 = event.target.value.getInt32(10);

    var data = {
      fNIRS: {
        L1: valueHemo1,
        L2: valueHemo2,
        L3: valueHemo3
      }
    }

    //console.log(data);

    stateA = {
      fNIRS: data.fNIRS
    }

    _thisA.onStateChangeCallback(stateA);
  }

  little2big(i) {
    return (i&0xff)<<24 | (i&0xff00)<<8 | (i&0xff0000)>>8 | (i>>24)&0xff;
  }

  onStateChangeCallback() {}

  getfNIRSData(service, characteristic, server){
    return server.getPrimaryService(service.uuid)
    .then(newService => {
      console.log('getting characteristic: ', characteristic.name);
      return newService.getCharacteristic(characteristic.uuid)
    })
    .then(char => {
      char.startNotifications().then(res => {
        char.addEventListener('characteristicvaluechanged', _thisA.handlefNIRSDataChanged);
      })
    })
  }

  onStateChange(callback){
    _thisA.onStateChangeCallback = callback;
  }
}