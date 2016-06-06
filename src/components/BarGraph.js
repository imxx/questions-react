import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BarChart } from "react-d3";
import { connect } from "react-redux";

import { englishAlphabet } from "./AnswerButtonsPanel";

class BarGraph extends Component {

	barGraphData(answers) {
		return Object.keys(answers).map(function(answer, i){
			return {
				label: englishAlphabet[i],
				value: answers[answer].count
			};
		});
	}

	render(){
		if(!this.props.shown || !this.props.width) return <div></div>;
		const question = this.props.questions.filter((q) => q._id == this.props.question._id)[0];
		return (
			<div className={`question-graph`}>

					 <BarChart data={this.barGraphData(question.answers)} 
								height={this.props.width * .6 }
								width={ this.props.width } />

			</div>
		);
	}
}

function mapStateToProps(state) {
	return { questions: state.questions.questions };
}

export default connect(mapStateToProps)(BarGraph);