import React, { Component } from "react";
import { PieChart } from "react-d3";
import { connect } from "react-redux";

import { englishAlphabet } from "./AnswerButtonsPanel";


class PieGraph extends Component {

	pieGraphData(answers, totalSum) {
		return Object.keys(answers).map(function(answer, i){
			const value = (100 / totalSum * answers[answer].count).toFixed(2);
			return {
				label: englishAlphabet[i],
				value: value
			};
		});
	}

	getTotalSum(answers){
		let sum = 0;
		Object.keys(answers).forEach(function(answer, i){
			sum += answers[answer].count;
		});
		return sum;
	}

	render(){
		if(!this.props.shown) return <div></div>;
		const question = this.props.questions.filter((q) => q._id == this.props.question._id)[0];
		return (
			<div className={`question-graph`}>

					 <PieChart data={this.pieGraphData(question.answers, this.getTotalSum(question.answers))} 
								height={this.props.width * .6  }
								width={ this.props.width  }
								radius={90}
  								innerRadius={25}
								sectorBorderColor="white" />

			</div>
		);
	}
}

function mapStateToProps(state) {
	return { questions: state.questions.questions };
}

export default connect(mapStateToProps)(PieGraph);