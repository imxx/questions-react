import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnswerButtonsPanel from "./AnswerButtonsPanel";
import BarGraph from "./BarGraph";
import PieGraph from "./PieGraph";


class Details extends Component {

	state = {
		chart: "barchart",
		widthOfChart: 0
	}

	selectChart(event){
		this.setState({ chart: event.target.value });
	}

	componentDidUpdate(){
		const el = ReactDOM.findDOMNode(this);
		if(el.children.length && this.state.widthOfChart == 0){
			const widthOfChart = el.lastChild.offsetWidth;
			this.setState({widthOfChart});
		}
	}

	render(){
		if(!this.props.shown) return <div></div>;

		return (
			
				<div className={`question-details col-xs-12`}>
					<div className="answers col-xs-5">
						<AnswerButtonsPanel question={this.props.question} />
					</div>

					<div className="graph col-xs-7 graphs">
						<select onChange={this.selectChart.bind(this)} value={this.state.chart} >
			                <option value="barchart">Barchart</option>
			                <option value="piechart">Piechart</option>
			            </select>
						<BarGraph width={this.state.widthOfChart}  question={this.props.question} shown={(this.state.chart == "barchart") ? true:false} />
						<PieGraph width={this.state.widthOfChart} question={this.props.question} shown={(this.state.chart == "piechart") ? true:false} />
					</div>
				</div>
			)
	}
}

export default Details;