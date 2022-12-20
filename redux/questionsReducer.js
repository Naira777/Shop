import { questionsAPI } from "../Api/ProvidersApi/api";

const GET_QUESTION = "GET_QUESTION";

const initialState = {
  questions: [],
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTION:
      return {
        ...state,
        questions: action.payload,
      };

    default:
      return state;
  }
};

export const setQuestions = (payload)=>(
    {type: GET_QUESTION, payload}
)
export const getQuestions = () => async (dispatch, getState) => {
    const {lang} = getState().CategoryPage;
    const response = await questionsAPI.getQuestions(lang);
    dispatch(setQuestions(response));
};
export default questionsReducer;