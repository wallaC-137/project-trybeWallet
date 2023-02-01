import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LOGIN_USER } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  /**
   * Salva no state as informações do campo (usa o 'name' do campo como chave)
   * e chama a função de validação do campo
   * @param {Object} target - Objeto com as informações do campo
   */
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.fieldValidation);
  };

  /**
   * Valida o campo de email e a senha
   */
  fieldValidation = () => {
    const { email, password } = this.state;
    const minimalPasswordLength = 6;

    const emailvalidation = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
    const emailIsValid = emailvalidation.test(email);

    const validFields = emailIsValid && password.length >= minimalPasswordLength;
    this.setState({ isDisabled: !validFields });
  };

  /**
   * Salva o email do usuário no GlobalState e redireciona para a página de '/carteira'
   */
  saveUser = () => {
    const { email } = this.state;
    const { dispatch, history: { push } } = this.props;
    dispatch({ type: LOGIN_USER, payload: { email } });
    push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <div>Login</div>
        <form>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="exemplo@exemplo.com"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
          />
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.saveUser }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

export default connect()(Login);
