import { CREATE_QUESTION,
		 QUESTION_CREATED,
		 ANSWER_GIVEN,
     ANSWER_QUESTION,
     REMOVE_QUESTION,
     QUESTION_REMOVED } from "./../actions/index";

export default socket => store => next => action => {

  console.log("Socket middleware, action: ", action);

  switch(action.type){
  	case CREATE_QUESTION:
  		socket.emit(QUESTION_CREATED, action.payload.data);
  		break;

  	case ANSWER_QUESTION:
  		socket.emit(ANSWER_GIVEN, action.payload.data);
      break;

    case REMOVE_QUESTION:
      //console.log("socket on remove questions", action);
      socket.emit(QUESTION_REMOVED, action.payload.data);
  }

  return next(action);
}