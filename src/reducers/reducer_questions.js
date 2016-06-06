import _ from "lodash";

import { FETCH_QUESTIONS,
		 FETCH_QUESTION,
		 CREATE_QUESTION,
		 ANSWER_QUESTION,
		 UPDATE_ANSWERS,
		 REMOVE_QUESTION,
		 UPDATE_QUESTIONS } from "../actions/index";

const INITIAL_STATE = { questions: [], count: 0 };

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		
		case FETCH_QUESTIONS:
			return { 
				questions: action.payload.data.questions,
				count: action.payload.data.count
			};

		case CREATE_QUESTION:
		case FETCH_QUESTION:
			return {
				questions: [action.payload.data.question, ...state.questions],
				count: action.payload.data.count
			};

		case ANSWER_QUESTION:
		case UPDATE_ANSWERS:
			let answData = (action.payload.data) ? action.payload.data.question : action.payload.question;

			let answQuestions = state.questions;
			let question = _.find(state.questions, (el) => {
				return el._id == answData._id
			});
			if(question){
				question.answers = answData.answers;
				return { ...state, questions: [ ...answQuestions ] };
			}else{
				return state;
			}
/*
		case REMOVE_QUESTION:
			let questions = state.questions;
			let questionIndex = _.findIndex(state.questions, (el) => {
				return el._id == action.payload.data.question._id
			});
			questions.splice(questionIndex,1);
			if(action.payload.data.new_question) questions.push(action.payload.data.new_question);
			return {
				questions: [ ...questions ],
				count: action.payload.data.count
			};

		case UPDATE_QUESTIONS:
			let data = action.payload;
			let questions = state.questions;
			let questionIndex = _.findIndex(state.questions, (el) => {
				return el._id == data.question._id
			});

			if(questionIndex >= 0){
				questions.splice(questionIndex,1);
				if(data.new_question) questions.push(data.new_question);
				return {
					questions: [ ...questions ],
					count: data.count
				};
			}else{
				return { ...state, count: data.count };
			}
*/
		case REMOVE_QUESTION:
		case UPDATE_QUESTIONS:
			console.log("Action: " , action);

			let data = (action.payload.data) ? action.payload.data : action.payload;
			let questions = state.questions;
			let questionIndex = _.findIndex(state.questions, (el) => {
				return el._id == data.question._id
			});

			console.log("State questions: ", state.questions);
			console.log("QuestionIndex: ", questionIndex);
			if(questionIndex >= 0){
				questions.splice(questionIndex,1);
				if(data.new_question) questions.push(data.new_question);
				return {
					questions: [ ...questions ],
					count: data.count
				};
			}else{
				return { ...state, count: data.count };
			}


		default:
			return state;
	}
}