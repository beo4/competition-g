/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes ,Component } from 'react';
// import { Panel, Input, Button } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import { FormControl, Checkbox, FormGroup } from 'react-bootstrap';
import history from '../../core/history';


class LoginForm extends Component {

	constructor() {
		super();
		this.state = {username: '',
			password: '',
			loginStatus: null};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render(props) {

		return (
					<form name="login_form" role="form" onSubmit={(e) => { this.handleSubmit(e); }}>
						<fieldset>
							<FormGroup
								validationState={this.state.loginStatus}>
								<FormControl
									type="text"
									className="form-control"
									placeholder="Username"
									name="username"
									value={this.state.username}
									onChange={this.handleChange}
								/>
							</FormGroup>

							<FormGroup
								validationState={this.state.loginStatus}>
								<FormControl
									className="form-control"
									placeholder="Password"
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
							</FormGroup>
							<Checkbox label="Remember Me" > Remember Me </Checkbox>
							<Button type="submit" bsSize="large" bsStyle="success" block>Login</Button>
						</fieldset>
					</form>


		)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}


	handleSubmit(e) {
		e.preventDefault();



		var formData = new FormData();
		formData.append("username", this.state.username);
		formData.append("password", this.state.password);

		fetch('/login/authenticate', {
			method: 'POST',
			body: formData,
			dataType: "JSON"
		}).then(response => {
			if (response.ok) {
				return response.json();
			} else {
				this.state.loginStatus='error'
				return (err == "failed")
			}
		}).then(json => {
			console.log(json);
			history.push('/');
		});
	}
}

export default LoginForm;
