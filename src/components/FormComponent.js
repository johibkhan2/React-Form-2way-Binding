import React, {Component} from 'react';
import * as actions from '../actions';
import validator from 'validator';
import {connect} from 'react-redux';
import FormInput from './FormInput';
import linkedState from 'react-link';

class FormComponent extends Component{

  constructor() {
    super();
    this.state = {
      email: '',
      phone: '',
      isValid: {
      email: true,
      phone: true
      },
      error: '',
      user: {}
    };
  }

  componentDidMount() {
    this.props.fetchUser();
  }


  _getInputStyleName (isValid) {
    return isValid
      ? 'valid'
      : 'invalid';
  }

  _updateUser () {
    var {email, phone} = this.state;

    if (this._areValid(email, phone)) {
      var updatedUser = {
        email: this._sanitizeValue(email),
        phone: this._sanitizeValue(phone)
      };
      // in a real app, you'd send this user obj to an action handler to update store
      console.log('updated user:', updatedUser);
    }
  }

  _validateEmail (value) {
    return validator.isEmail(value);
  }

  _validatePhone (value) {
    return (validator.isLength(value.trim(), {min: 10}));
  }
  _validate (email, phone) {
    this.setState({
      isValid: {
        email: this._validateEmail(email),
        phone: this._validatePhone(phone)
      }
    });
  }

  _areValid (email, phone) {
    var result = false;
    if (this._validateEmail(email) && this._validatePhone(phone)) {
      result = true;
    }
    return result;
  }

  _sanitizeValue (value) {
    return value.trim();
  }


  handleSaveClick () {
    var {phone, email} = this.state;
    this._validate(email, phone);
    this._updateUser();
  }

  render () {

    var {isValid} = this.state;

    return (
      <div className='main'>
        <h2>User Name : {this.props.user.username}</h2>

        <div>
          <FormInput
            inputType='text'
            cName={this._getInputStyleName(isValid.email)}
            valueLink={linkedState(this,'email')}
            pholder='Email'/>
        </div>
        <div>
          <FormInput
            inputType='number'
            cName={this._getInputStyleName(isValid.phone)}
            valueLink={linkedState(this,'phone')}
            pholder='Phone No'/>
        </div>
        <div className='button-container'>
          <button onClick={this.handleSaveClick.bind(this)}>Save</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {user: state.user.data};
}

export default connect(mapStateToProps, actions)(FormComponent);
