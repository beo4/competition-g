/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import LoginForm from '../../components/loginForm/LoginForm';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import history from '../../core/history';

const title = 'Log In';

function Login(props, context) {
  context.setTitle(title);
  return (
    <div className="col-md-4 col-md-offset-4">
      <div className="text-center">
        <h1 className="login-brand-text">Competition</h1>
        <h3 className="text-muted">Created by cb</h3>
      </div>

      <Panel header={<h3>Please Sign In</h3>} className="login-panel">

        <LoginForm />

      </Panel>

    </div>

  );
}


Login.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Login);
