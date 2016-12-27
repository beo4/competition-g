/**
 * Created by christoph on 01.11.2016.
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import {
	NavItem,
	NavDropdown,
	MenuItem
} from 'react-bootstrap';
import history from '../../core/history';
import $ from "jquery";

class Competition extends Component {

	constructor() {
		super();

		this.state = {
			competitions: []
		}
	}

	render(props) {

		const competition = this.state.competition;


		return (
			<NavDropdown bsClass="dropdown" title={<span><i className="fa fa-telegram fa-fw"></i> Bitte Wettkampf auswählen</span>} id="navDropdown1">
				<MenuItem style={ {width: 300} } eventKey="1">
					<div><strong>Wettbewerb 1</strong> <span className="pull-right text-muted"> <em>2.-5.12.2016</em> </span></div>
					<div>FIS SNOWBOARD Götschen</div>
				</MenuItem>
				<MenuItem divider/>
				{ this.state.competitions.map(
					function (competition) {
						return (
							<MenuItem key={ competition.id }>
								<div><strong>{ competition.name }</strong> <span className="pull-right text-muted"> <em>12.-15.01.2017</em> </span></div>
								<div>FIS SNOWBOARD EC Lachtal</div>
							</MenuItem>);
					}) }
			</NavDropdown>
		)
	}

	componentDidMount() {
		this.loadLists();
	}

	loadLists() {
		fetch('/competition/', {
			method: 'GET' , redirect: 'manual'
		}).then(response => {
			console.log(response);
			if (response.ok) {
				return response.json();
			} else {
				history.push('/login');
			}
		}).then(json => {
			console.log(json);
			this.setState({'competitions': json});
		});
	}
}

export default Competition;