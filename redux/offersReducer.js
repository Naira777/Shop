import {offersAPI} from "../Api/OffersApi/api";
import {getLikedOffers, getoffers} from "../utils";
const SET_OFFERS = "SET_OFFERS";
const CHANGE_LOADING = "CHANGE_LOADING";
const SET_ALL_LIKES = 'SET_ALL_LIKES'

const initialState = {
    offers: [],
    loading: false,
    allLikes: [],
};

const offersReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_OFFERS:

            return {
                ...state,

                offers: action.payload,
            };
        case CHANGE_LOADING:
            return {
                ...state,

                loading: action.payload,
            };

        case SET_ALL_LIKES:
            return {
                ...state,

                allLikes: action.payload,
            };

        default:
            return state;

    }
};

export const setOffers = (payload) => ({type: SET_OFFERS, payload});
export const setPromotionAllLikes = (payload) => ({type: SET_ALL_LIKES, payload});
export const changeLoading1 = (payload) => ({type: CHANGE_LOADING, payload});
export const getOffers = () => async (dispatch, getState) => {
    dispatch(changeLoading1(true))
    const {lang} = getState().CategoryPage;
    const response = await offersAPI.getOffers(lang);
    const arr = getoffers(response);
    dispatch(setOffers(arr));
    dispatch(changeLoading1(false))
};
export const getAllLikes = () => async (dispatch, getState) => {
    dispatch(setOffers([]));
    dispatch(changeLoading1(true))
    const {lang} = getState().CategoryPage;
    const {token} = getState().UsersPage;
    const response = await offersAPI.getPromotionAllLikes(lang, token);
    const arr = getLikedOffers(response);
    dispatch(setOffers(arr));
    dispatch(changeLoading1(false))
};
export const createLike = (id) => async (dispatch, getState) => {
    try {
        dispatch(changeLoading1(true))
        const {lang} = getState().CategoryPage;
        const {token} = getState().UsersPage;
        const response = await offersAPI.createPromotionLike(id, lang, token);
        dispatch(changeLoading1(false))
    } catch (error) {
    }
};
export default offersReducer;
