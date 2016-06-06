import axios from "axios";

//const ROOT_URL = "http://test-apixxxx.herokuapp.com/api";
const ROOT_URL = "http://localhost:7777/api";

// local actions
export const FETCH_QUESTIONS = "FETCH_QUESTIONS";
export const CREATE_QUESTION = "CREATE_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const REMOVE_QUESTION = "REMOVE_QUESTION";


// actions to server socket
export const QUESTION_CREATED = "QUESTION_CREATED";
export const ANSWER_GIVEN = "ANSWER_GIVEN";
export const QUESTION_REMOVED = "QUESTION_REMOVED";

// actions from server socket
export const FETCH_QUESTION = "FETCH_QUESTION";
export const UPDATE_ANSWERS = "UPDATE_ANSWERS";
export const UPDATE_QUESTIONS = "UPDATE_QUESTIONS";


export function handleServerSocketMessage(data){
	// handling data from the server socket
	// depending on what action was sent, 
	switch(data.actionType){
		case FETCH_QUESTION:
			return fetchQuestion(data.question._id);
			break;

		case UPDATE_ANSWERS:
			return updateAnswers(data);
			break;

		case UPDATE_QUESTIONS:
				console.log("Update questions.");
			return updateQuestions(data);
	}
}

export function fetchQuestions(offset, limit){
	const query = `?offset=${offset}&limit=${limit}`;
	const request = axios.get(`${ROOT_URL}/questions${query}`);

	return {
		type: FETCH_QUESTIONS,
		payload: request
	}
}

export function createQuestion(question){
	const request = axios.post(`${ROOT_URL}/questions` , question);

	return {
		type: CREATE_QUESTION,
		payload: request
	}
}

export function fetchQuestion(id){
	const request = axios.get(`${ROOT_URL}/questions/${id}`);

	return {
		type: FETCH_QUESTION,
		payload: request
	}
}

export function removeQuestion(id){
	const request = axios.delete(`${ROOT_URL}/questions/${id}`);
	return {
		type: REMOVE_QUESTION,
		payload: request
	}
}

export function answerQuestion(question, answer){
	const request = axios.put(`${ROOT_URL}/questions/${question._id}`, { answer });

	return {
		type: ANSWER_QUESTION,
		payload: request
	}
}

export function updateAnswers(question){
	return {
		type: UPDATE_ANSWERS,
		payload: question
	}
}

export function updateQuestions(question){
	return {
		type: UPDATE_QUESTIONS,
		payload: question
	}
}

export function removeOldAndReturnNew(oldQuestionId, newQuestionPositionOffset){
	const request = axios.delete(`${ROOT_URL}/questions/removeoldandreturnnew/${oldQuestionId}/${newQuestionPositionOffset}`);
	return {
		type: REMOVE_QUESTION,
		payload: request
	}
}