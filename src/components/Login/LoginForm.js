import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

import VerifyForm from '../../modules/verifyForm';

import './style.scss';

class LoginForm extends VerifyForm {
  constructor(props) {
    super(props);

    this.verify.init(['email']);

    this.verify.setErrorComp(text => (
      <span style={{ color: 'red' }}>{text}</span>
    ));
    this.verify.setSuccessComp(text => (
      <span style={{ color: 'green' }}>{text}</span>
    ));

    this.state = {
      inputsErrors: this.verify.inputs
    };
  }

  componentWillUnmount() {
    this.props.loginReset();
  }

  handleChange = name => evt => {
    const { value } = evt.target;
    this.props.handleLoginChange(value, name);
    return this.setState({
      inputsErrors: this.verify.cond(
        (() => {
          if (value.length <= 0) return true;
          switch (name) {
            case 'email':
              return !/^.\S*@\w+\.[\w]+(\w+\.[\w]+)*$/.test(value);
            default:
              return false;
          }
        })(),
        name
      )
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.props.loading) return;
    this.props.onLoginSubmit();
  };

  render() {
    const { password, email, error, loading, loggedIn } = this.props;
    if (loggedIn) return <Redirect to="/" />;
    return (
      <Form className="login-form" onSubmit={this.handleSubmit}>
        {error && (
          <Message negative>
            <Message.Header>La connexion a échoué</Message.Header>
            <p>Verifiez vos ifentifiants</p>
          </Message>
        )}
        <Form.Field>
          <label htmlFor="email">
            Email
            <input
              id="email"
              placeholder="Email"
              type="text"
              value={email}
              onChange={this.handleChange('email')}
              style={{
                borderColor: this.verify.verifyOne('email', email, err =>
                  err ? 'red' : 'green'
                )
              }}
            />
            {this.verify.verifyOne('email', email, err =>
              err
                ? this.verify.errorComp("Cette email n'est pas valide")
                : this.verify.successComp('Votre email est valide')
            )}
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">
            Password
            <input
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={this.handleChange('password')}
            />
          </label>
        </Form.Field>
        <div className="ui two buttons">
          <Button
            disabled={this.verify.verifyAll()}
            loading={loading}
            id="connexion"
          >
            Connexion
          </Button>
          <Link to="/register" id="inscription" className="ui button">
            Inscription
          </Link>
        </div>
      </Form>
    );
  }
}

export default LoginForm;
