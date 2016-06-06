import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchQuestions } from "../actions/index";
import jshashes from "jshashes";
import ReactPaginate from "react-paginate";
import { Pagination } from "react-bootstrap";
import { browserHistory } from 'react-router'

import Question from "./Question";

class QuestionsList extends Component {
	state = {
		pageNum: 100,
		activePage: parseInt(this.props.params.page) || 1
	}

	componentDidMount(){
		if(this.props.params.page)
			this.getQuestions({page: this.props.params.page});
		else
			this.getQuestions({page: 1});
	}

	handlePageClick(e, selectedEvent){
		this.setState({ activePage: selectedEvent.eventKey }, () => {
			browserHistory.push(`/page/${selectedEvent.eventKey}`);
			this.getQuestions({page: selectedEvent.eventKey})
		});

	}

	getQuestions(argObj){
		let page = parseInt(argObj.page);
		if(page <= 0) page = 1;
		const offset = ( page - 1 ) * 10;
		this.props.fetchQuestions(offset, 10);
	}

	render(){
		if(!this.props.questions)
			return <h1>Loading...</h1>;

		return (
			<div>

					<table className="table table-hover questions-table">
						<tbody>
							{this.props.questions.map((q, i) => {
								return <Question key={q._id} question={q} activePage={this.state.activePage} />;
							})}
						</tbody>
					</table>

				<div className={`questions-pagination`}>
					<Pagination
			        prev
			        next
			        first
			        last
			        ellipsis
			        boundaryLinks
			        items={ Math.ceil(this.props.count / 10) }
			        maxButtons={5}
			        activePage={this.state.activePage}
			        onSelect={this.handlePageClick.bind(this)} />
				</div>

			</div>
		);
	}
}


function mapDispatchToProps(dispatch) {
	//return { ...bindActionCreators({ fetchQuestions } , dispatch), dispatch };
	return bindActionCreators({fetchQuestions}, dispatch);
}

function mapStateToProps(state) {
	return { 
		questions: state.questions.questions,
		count: state.questions.count
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);