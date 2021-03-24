import React, {Component} from 'react';
import { inject, observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

@inject("appStore")
@observer
class Meditation extends Component {
	render() {
		return(
			<>
				<p>meditation</p>
				<button ><Link to="/">home</Link></button>
				<button >join</button>
				<button onClick={this.props.appStore.cabalStore.createCabal}>host</button>
			</>
		)
	}
}

export default Meditation;