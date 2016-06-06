import React, {Component} from 'react';
import { createQuestion } from "../actions/index";
import {reduxForm} from 'redux-form';

class CreateQuestionForm extends Component {

  onSubmit(props){
    this.props.createQuestion(props)
        .then((data) => {
          this.props.resetForm();
            this.props.toggleModal();
        });
  }

  render() {
    const { fields, handleSubmit, submitting } = this.props;
    const question = fields["question"];
    let answersCounter = 1;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="create-question-form">

        <div className={`form-group ${question.touched && question.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Question</label>
          <input type="text" {...question}  ref="questionInput" className="form-control"/>
          <div className="help-block">
            {question.touched ? question.error : ""}
          </div>
        </div>

        {Object.keys(fields).map(name => {
          if(name == "question")
            return;
          const field = fields[name];
          return (
            <div key={name} className={`form-group ${field.touched && field.invalid ? 'has-error' : ''}`}>
                <label className="control-label">Answer {answersCounter++}</label>
                <input type="text" {...field} className="form-control"/>
                <div className="help-block">
                  {field.touched ? field.error : ""}
                </div>
            </div>
          );
        })}

        <div className="create-question-form-buttons">
          <button type="submit" className="btn btn-primary submit-question-button" disabled={submitting}>Submit</button>
        </div>

      </form>
    );
  }
}

function validate(fields){
  const errors = {};

  if(!fields.answer_1)
    errors.answer_1 = "Enter first answer";
  if(!fields.answer_2)
    errors.answer_2 = "Enter second answer";
  if(!fields.question)
    errors.question = "Enter a question";

  return errors;
}

export default reduxForm({
  form: 'dynamic',
  validate: validate
}, null, {createQuestion})(CreateQuestionForm);