import {careersAPI} from "../Api/CareersApi/api";

const GET_FEEDBACK = "GET_FEEDBACK";
const GET_VACANCY = "GET_VACANCY";
const GET_VACANCY_ONE = "GET_VACANCY_ONE";

const initialState = {
    feedback: [],
    vacancy: [],
    vacancyOne: [],
};

const careersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FEEDBACK:
            return {
                ...state,
                feedback: action.payload,
            };

        case GET_VACANCY:
            return {
                ...state,
                vacancy: action.payload,
            };

        case GET_VACANCY_ONE:
            return {
                ...state,
                vacancyOne: action.payload,
            };

        default:
            return state;
    }
};

export const setFeedback = (payload) => ({type: GET_FEEDBACK, payload});

export const setVacancy = (payload) => ({type: GET_VACANCY, payload});

export const setVacancyOne = (payload) => ({type: GET_VACANCY_ONE, payload});

export const getFeedback = () => async (dispatch, getState) => {
    const {lang} = getState().CategoryPage;
    const response = await careersAPI.getFeedback(lang);
    dispatch(setFeedback(response));
};

export const getVacancy = () => async (dispatch, getState) => {
    const {lang} = getState().CategoryPage;
    const response = await careersAPI.getVacancy(lang);
    dispatch(setVacancy(response));
};

export const getVacancyOne = (id) => async (dispatch, getState) => {
    const {lang} = getState().CategoryPage;
    const response = await careersAPI.getVacancyOne(id, lang);
    dispatch(setVacancyOne(response));
};

export const postVacancy = (data) => async (dispatch, getState) => {
    const {lang} = getState().CategoryPage;
    const response = await careersAPI.postVacancy(data, lang);
    dispatch(setVacancyOne(response));
};

export default careersReducer;
