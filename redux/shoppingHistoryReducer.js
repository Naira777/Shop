import {shoppingHistoryAPI} from "../Api/EmailandShopingHisoryApi/api";

const GET_SHOPPING_HISTORY = "GET_SHOPPING_HISTORY";
const GET_SEARCH_SHOPPING_HISTORY = "GET_SEARCH_SHOPPING_HISTORY";
const SET_MODAL_SHOW = 'SET_MODAL_SHOW'



const initialState = {
    shoppingHistoryData: [],
    searchShoppingHistory: [],
    search: false,
    modalShow: false,
};

const shoppingHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODAL_SHOW:
            return {
                ...state,
                modalShow: action.payload,
            };
        case GET_SHOPPING_HISTORY:
            return {
                ...state,
                shoppingHistoryData: action.payload,
            };
        case GET_SEARCH_SHOPPING_HISTORY:
            return {
                ...state,
                searchShoppingHistory: action.payload,
                search: true,
            };
        default:
            return state;
    }
};

export const setModalShow = (payload) => ({
    type: SET_MODAL_SHOW,
    payload,
});

export const setShoppingHistory = (payload) => ({
    type: GET_SHOPPING_HISTORY,
    payload,
});


export const setSearchShoppingHistory = (payload) => ({
    type: GET_SEARCH_SHOPPING_HISTORY,
    payload,
});

export const getShoppingHistory = () => async (dispatch, getState) => {
    const {lang} = getState().CategoryPage;
    const token = localStorage.getItem('user')
    const response = await shoppingHistoryAPI.getShoppingHistory(lang, token);
    dispatch(setShoppingHistory(response));
};

export const getSearchShoppingHistory =
     (data) => async (dispatch, getState) => {
        const {lang} = getState().CategoryPage;
        const token = localStorage.getItem('user')
        const response = await shoppingHistoryAPI.getSearchShoppingHistory(
            data,
            lang, token
        );
        
        dispatch(setSearchShoppingHistory(response));
       
        
    };

export default shoppingHistoryReducer;
