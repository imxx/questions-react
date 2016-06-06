import React, { Component } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Details from "./Details";


export default class extends Component {
	render(){
		return (<div>
			<Header />
			<div className="row">
				{React.cloneElement(this.props.children, { setQuestion: this.setQuestion } )}
			</div>
			<Footer />
		</div>);
	}
}