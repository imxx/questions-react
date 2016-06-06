import { FETCH_QUESTION,
         CREATE_QUESTION,
         ANSWER_QUESTION,
         UPDATE_ANSWERS } from "./../actions/index";

export default toastr => store => next => action => {

  switch(action.type){
  	case FETCH_QUESTION:
    case CREATE_QUESTION:
      toastr.success(action.payload.data.question.question, 'New question was created.');
  		break;

  	case UPDATE_ANSWERS:
    case ANSWER_QUESTION:
      const payload = (action.payload.data) ? action.payload.data : action.payload; 
  		toastr.success(`${payload.question.question} (${payload.answer})`, 'Question has been answered.');
  }

  return next(action);
}