import React, {Component} from 'react';
import { inject, observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

@inject("appStore")
@observer
class Trials extends Component {
	render() {
		return(
			<>
				<p>trials</p>
				<button ><Link to="/">home</Link></button>
			</>
		)
	}
}

export default Trials;