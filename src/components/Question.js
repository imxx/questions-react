import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeOldAndReturnNew } from "../actions/index";
import Details from "./Details";


class Question extends Component {
	state = {
		detailsShown: false
	}

	toggleDetails(){
		const shown = (this.state.detailsShown) ? false : true;
		this.setState({ detailsShown: shown });
	}

	removeQuestion(){
		const newQuestionPositionOffset = this.props.activePage * 10 - 1;
		this.props.removeOldAndReturnNew(this.props.question._id, newQuestionPositionOffset);
	}

	render(){
		return (<tr className="question-row">
			<td>
				<div>
					<h4 className="question-title"
						onClick={this.toggleDetails.bind(this)}>
							{this.props.question.question}
					</h4>
					<i className="x-icon" title="Remove"
						onClick={this.removeQuestion.bind(this)}></i>
				</div>
				<Details question={this.props.question} shown={this.state.detailsShown} />
			</td>
		</tr>);
	}
}

function mapDispatchToProps(dispatch){
	return { ...bindActionCreators({ removeOldAndReturnNew } , dispatch), dispatch };
}

//export default connect(null, mapDispatchToProps)(PostsIndex);
export default connect(null, mapDispatchToProps)(Question);