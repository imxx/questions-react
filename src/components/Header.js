import React, { Component } from "react";
import CreateQuestionModal from "./CreateQuestionModal";
import { Link } from "react-router";

export default class extends Component {
	constructor(props){
		super(props);

		this.state = { modalOpen: false };
	}

	toggleModal(){
		let modalOpen = (this.state.modalOpen) ? false : true;
		this.setState({ modalOpen: modalOpen });
	}

	render(){
		return (<div className="row header">
			<nav>
				<h1>Questions</h1>
				<button onClick={this.toggleModal.bind(this)} className="btn btn-default create-question-button">
					<i className="fa fa-plus"></i>
 					Create New Question
 				</button>
			</nav>
			

			<CreateQuestionModal open={this.state.modalOpen}
								 toggleModal={this.toggleModal.bind(this)} />
		</div>);
	}
}