import { action, autorun, observable, makeAutoObservable, flow, runInAction} from "mobx";

import hypercore from 'hypercore'
import rai from 'random-access-idb'
import { homedir } from 'os'
import path from 'path'

import Client from 'cabal-client';

const storage = rai('pool')

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

// let cabal;
      // setInterval(() => {
      //   cabal.publishMessage({
      //     type: 'chat/text',
      //     content: {
      //       text: 'People call me ' + cabalDetails.getLocalme(),
      //       channel: 'introduction'
      //     }
      //   })
      // }, 2000)


class CabalStore {

  @observable cabal = null;
  @observable loadedSession = 'data';
  @observable sessions = []

  constructor() {
    makeAutoObservable(this);

    setTimeout(() => {
    	console.log('time')
    	if (this.cabal) {

    		console.log(this.cabal.getJoinedChannels())
    	} else{
    		console.log('no channels')
    	}
    }, 2000)
  }

	@action
	pushState = (state) => {
		if(this.cabal) {
			this.cabal.publishMessage({
				type: 'chat/text',
				content: {
					text: "" + state.fNIRS.L1, // TODO: change data type to number
					channel: this.intendedSession
				}
			})
		}
	}


	@action
	setSession = (session) => {
		console.log(session)
		this.intendedSession = session
		// join or create a channel

		this.cabal.joinChannel(this.intendedSession)
		this.sessions = this.cabal.getJoinedChannels()
		// setTimeout(() => {
		// 	console.log(this.cabal.getJoinedChannels())
		// }, 2000)
	}	

	@action
	setNick = (nick) => {
		console.log(nick)
	}

	@action
	createGather = () => {

		client.createCabal().then((cabal) => {
			this.cabal = cabal
			console.log(this.cabal.key)
			console.log('creating cabal')
			this.cabal.on('new-message', ({ channel, author, message }) => {
				console.log('Recieved: "' + message.value.content.text + '" in channel ' + channel + " from " + author.key.substring(0,5))
			})
		})

		// console.log(cabalDetails)
		// console.log(this)
		// self = this
		// // action(() => {
		// runInAction(() => {
		// 	console.log('this')
		// 	console.log(this)
		// 	console.log(self)
		// 	self.cabal = cabalDetails
		// 	console.log(this.cabal.key)
		// 	console.log('creating cabal')
		// 	self.cabal.on('new-message', ({ channel, author, message }) => {
		// 		console.log('Recieved: "' + message.value.content.text + '" in channel ' + channel + " from " + author.key.substring(0,5))
		// 	})

		// })
	}

 //  	createCabal = flow(function*(city) {

	// 	const cabalDetails = yield client.createCabal()
	// 	console.log(cabalDetails)

	// 	// action(() => {
	// 		this.cabal = cabalDetails
	// 		console.log(this.cabal.key)
	// 		console.log('creating cabal')
	// 		this.cabal.on('new-message', ({ channel, author, message }) => {
	// 			console.log('Recieved: "' + message.value.content.text + '" in channel ' + channel + " from " + author.key.substring(0,5))
	// 		})
	// 	// })

	// })
}

export { CabalStore };
