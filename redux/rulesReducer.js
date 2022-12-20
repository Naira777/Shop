import {rulesandprivacyAPI} from "../Api/RulesApi/api";
import {getTermsAndRules} from "../utils";

const SET_TERMS_OF_USE = "SET_TERMS_OF_USE";
const SET_PRIVACY = "SET_PRIVACY";
const CHANGE_LOADING = "CHANGE_LOADING";

const initialState = {
    termsofuse: {},
    privacy: {},
    loading: false,
};

const rulesReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_TERMS_OF_USE:

            return {
                ...state,

                termsofuse: action.payload,
            };

        case SET_PRIVACY:

            return {
                ...state,

                privacy: action.payload,
            };

        case CHANGE_LOADING:
            return {
                ...state,

                loading: action.payload,
            };


        default:
            return state;

    }
};

export const setPrivacy = (payload) => ({type: SET_PRIVACY, payload});
export const setTerms = (payload) => ({type: SET_TERMS_OF_USE, payload});

export const changeLoadingRules = (payload) => ({type: CHANGE_LOADING, payload});

export const getTerms = () => async (dispatch, getState) => {
    dispatch(changeLoadingRules(true))
    const {lang} = getState().CategoryPage;
    const response = await rulesandprivacyAPI.getTerms(lang);
    const arr = getTermsAndRules(response);
    dispatch(setTerms(arr));
    dispatch(changeLoadingRules(false))

};

export const getRules = () => async (dispatch, getState) => {
    dispatch(changeLoadingRules(true))
    const {lang} = getState().CategoryPage;
    const response = await rulesandprivacyAPI.getRules(lang);
    const arr = getTermsAndRules(response);
    dispatch(setPrivacy(arr));
    dispatch(changeLoadingRules(false))

};


export default rulesReducer;
