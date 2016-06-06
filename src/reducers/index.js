import { combineReducers } from 'redux';

import QuestionsReducer from "./reducer_questions";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  questions: QuestionsReducer,
  form: formReducer
});

export default rootReducer;
