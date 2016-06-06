import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const labels = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  age: 'Age',
  street: 'Street',
  city: 'City'
};

class DynamicForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render() {
    const { fields, handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        {Object.keys(fields).map(name => {
          const field = fields[name];
          return (<div key={name}>
            <label>{labels[name]}</label>
            <div>
              <input type="text" placeholder={labels[name]} {...field}/>
            </div>
          </div>);
        })}
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
    );
  }
}

const DynamicFormReduxContainer = reduxForm({form: 'dynamic'})(DynamicForm);


class DynamicFormContainer extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired // passed in by example engine to pop up modal
  };

  state = {
    firstName: true,
    lastName: true,
    email: false,
    age: false,
    street: false,
    city: false
  }

  render() {
    return (<div>
        <div>
          {Object.keys(this.state).map(field =>
            <label key={field}>
              <input type="checkbox"
                     checked={this.state[field]}
                     onChange={event => this.setState({[field]: event.target.checked})}/> {labels[field]}
            </label>
          )}
        </div>
        <DynamicFormReduxContainer
          onSubmit={this.props.onSubmit}
          fields={Object
            .keys(this.state)
            .filter(field => this.state[field])}/>
      </div>
    );
  }
}

export default DynamicFormContainer;