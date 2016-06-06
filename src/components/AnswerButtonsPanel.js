import React, { Component } from "react";
import { answerQuestion } from "../actions/index";
import { connect } from 'react-redux';

export const englishAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
export const colors = ["#ADD8E6","#F08080","#E0FFFF" , "#FAFAD2", "#90EE90", "#FFB6C1","#FFA07A", "#20B2AA", "#87CEFA"];


class AnswerButtonsPanel extends Component {

	answerQuestion(answer){
		this.props.answerQuestion(this.props.question, answer);
	}

	addButton(answerKey, answer, placeInArray){
		const colors = [ "primary", "success", "info", "warning", "danger" ];
		return (<button key={placeInArray} onClick={this.answerQuestion.bind(this, answerKey)}
						className={`btn btn-${colors[placeInArray]} col-xs-12 answer-button`}
						style={{ backgroundColor: colors[placeInArray] }}>
			{englishAlphabet[placeInArray]}: {answer.answer}
		</button>);
	}

	render(){
		const answers = this.props.question.answers;
		return (<div className="row">
				{Object.keys(answers).map((key, i) => {
					return this.addButton(key, answers[key], i);
				})}
		</div>);
	}
}

export default AnswerButtonsPanel;


export default connect(null, {answerQuestion})(AnswerButtonsPanel);