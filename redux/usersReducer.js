import {getAddresses, getBasketProducts, setUserInformation} from "../utils";
import {usersAPI} from '../Api/UsersApi/api'
import {userCartAPI} from '../Api/CartApi/api'
import {searchAPI} from "./../Api/SearchApi/api";

const USER_MESSAGE_VERIFY = "USER_MESSAGE_VERIFY";
const USER_PHONE_VERIFY = "USER_PHONE_VERIFY";
const USER_VERIFY = "USER_VERIFY";
const USER_PASSWORD = "USER_PASSWORD";
const SET_ERRORS = "SET_ERRORS";
const SET_TEL = "SET_TEL";
const SET_USER_INFO = "SET_USER_INFO";
const SET_SIGNUPORSIGNIN = "SET_SIGNUPORSIGNIN";
const SET_SIGNIN = "SET_SIGNIN";
const SET_PASSWORD = "SET_PASSWORD";
const SET_SIGNUP = "SET_SIGNUP";
const SET_CART_ITEMS = "SET_CART_ITEMS";
const SET_ADDRESSES = "SET_ADDRESSES";
const DELETE_PRODUCT_ITEM = "DELETE_PRODUCT_ITEM";
const SET_PASSWORD_RESET = "SET_PASSWORD_RESET";
const SET_SEARCH_ADDRESSES = "SET_SEARCH_ADDRESSES";
const SET_ADDRESS_MODE = "SET_ADDRESS_MODE";
const SET_ADDRESS = "SET_ADDRESS";
const UPDATE_ADDRESS = "UPDATE_ADDRESS";
const SET_TOKEN = "SET_TOKEN";
const SET_DELETED_ITEMS_PLUS = "SET_DELETED_ITEMS_PLUS";
const SET_DELETED_ITEMS_MINUS = "SET_DELETED_ITEMS_MINUS";
const SET_DELETED_ITEMS_ALL = "SET_DELETED_ITEMS_ALL";
const SET_REGISTER = "SET_REGISTER";
const SET_UPDATE = "SET_UPDATE";
const SET_CLOSE = "SET_CLOSE";
const SET_IS_EMAIL = "SET_IS_EMAIL";
const SET_IS_BUY = "SET_IS_BUY";

const initialState = {
    userInfo: {},
    errors: {},
    loading: false,
    phone_verify: {},
    verify_message: null,
    verify: false,
    signuporsignin: false,
    signin: false,
    signup: false,
    password: false,
    passwordReset: false,
    cartItems: [],
    addresses: [],
    userPassword: "",
    searchAddressesArray: [],
    tel: "",
    address_mode: false,
    oneAddress: {},
    addressesLoading: false,
    token: null,
    deletedCartItems: [],
    register: false,
    update: false,
    close_address: true,
    isEmail: false,
    isBuy: false,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_IS_BUY:
            return {
                ...state,
                isBuy: action.payload,
            };

        case SET_IS_EMAIL:
            return {
                ...state,
                isEmail: action.payload,
            };

        case SET_CLOSE:
            return {
                ...state,

                close_address: action.payload,
            };

        case SET_ADDRESS:
            return {
                ...state,

                oneAddress: action.payload,
            };

        case SET_SEARCH_ADDRESSES:
            return {
                ...state,

                searchAddressesArray: action.payload,
            };
        case SET_ADDRESS_MODE:
            return {
                ...state,

                address_mode: action.payload,
            };

        case USER_MESSAGE_VERIFY:
            return {
                ...state,

                loading: false,
                verify_message: action.payload,
            };
        case USER_PHONE_VERIFY:
            return {
                ...state,

                phone_verify: action.payload,
            };

        case USER_VERIFY:
            return {
                ...state,

                verify: action.payload,
            };

        case SET_ERRORS:
            return {
                ...state,

                errors: action.payload,
            };

        case SET_TEL:
            return {
                ...state,

                tel: action.payload,
            };
        case USER_PASSWORD:
            return {
                ...state,

                userPassword: action.payload,
            };
        case SET_PASSWORD_RESET:
            return {
                ...state,

                passwordReset: action.payload,
            };
        case SET_USER_INFO:
            return {
                ...state,

                userInfo: action.payload,
            };

        case SET_SIGNUPORSIGNIN:
            return {
                ...state,

                signuporsignin: action.payload,
            };

        case SET_SIGNIN:
            return {
                ...state,

                signin: action.payload,
            };

        case SET_SIGNUP:
            return {
                ...state,

                signup: action.payload,
            };

        case SET_TOKEN:
            return {
                ...state,

                token: action.payload,
            };

        case SET_PASSWORD:
            return {
                ...state,

                password: action.payload,
            };

        case SET_DELETED_ITEMS_PLUS:
            return {
                ...state,

                deletedCartItems: [...state.deletedCartItems, {id: action.payload}],
            };
        case SET_DELETED_ITEMS_MINUS:
            return {
                ...state,

                deletedCartItems: state.deletedCartItems.filter(
                    (item) => item.id != action.payload
                ),
            };
        case SET_DELETED_ITEMS_ALL:
            return {
                ...state,

                deletedCartItems: action.payload,
            };
        case SET_CART_ITEMS:
            return {
                ...state,

                cartItems: action.payload,
            };

        case SET_ADDRESSES:
            return {
                ...state,

                addresses: action.payload,
            };

        case SET_REGISTER:
            return {
                ...state,

                register: action.payload,
            };
        case SET_UPDATE:
            return {
                ...state,

                update: action.payload,
            };
        case DELETE_PRODUCT_ITEM:
            return {
                ...state,

                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            };

        default:
            return state;
    }
};

export const setIsBuy = (payload) => ({
    type: SET_IS_BUY,
    payload,
});


export const setIsEmail = (payload) => ({
    type: SET_IS_EMAIL,
    payload,
});

export const setDeletedCartItemsAll1 = (payload) => ({
    type: SET_DELETED_ITEMS_ALL,
    payload,
});
export const setDeletedCartItemsMinus = (payload) => ({
    type: SET_DELETED_ITEMS_MINUS,
    payload,
});
export const setDeletedCartItemsPlus = (payload) => ({
    type: SET_DELETED_ITEMS_PLUS,
    payload,
});
export const setToken = (payload) => ({type: SET_TOKEN, payload});
export const setSearchAddresses = (payload) => ({
    type: SET_SEARCH_ADDRESSES,
    payload,
});
export const setPhoneVarify = (payload) => ({
    type: USER_PHONE_VERIFY,
    payload,
});
export const setMessageVerify = (payload) => ({
    type: USER_MESSAGE_VERIFY,
    payload,
});
export const setVerify = (payload) => ({type: USER_VERIFY, payload});
export const setErrors = (payload) => ({type: SET_ERRORS, payload});
export const setTel = (payload) => ({type: SET_TEL, payload});
export const setPasswordInStore = (payload) => ({
    type: USER_PASSWORD,
    payload,
});
export const setUserInfo = (payload) => ({type: SET_USER_INFO, payload});
export const deleteProductItem = (payload) => ({
    type: DELETE_PRODUCT_ITEM,
    payload,
});
export const setPasswordReset = (payload) => ({
    type: SET_PASSWORD_RESET,
    payload,
});
export const setSignuporSignin = (payload) => ({
    type: SET_SIGNUPORSIGNIN,
    payload,
});
export const setAddressMode = (payload) => ({
    type: SET_ADDRESS_MODE,
    payload,
});
export const setSignin = (payload) => ({type: SET_SIGNIN, payload});
export const setSignup = (payload) => ({type: SET_SIGNUP, payload});
export const setPassword = (payload) => ({type: SET_PASSWORD, payload});
export const setCartProducts = (payload) => ({type: SET_CART_ITEMS, payload});
export const setAddresses = (payload) => ({type: SET_ADDRESSES, payload});
export const setRegister = (payload) => ({type: SET_REGISTER, payload});
export const setOneAddress = (payload) => ({type: SET_ADDRESS, payload});
export const updateUserAddress = (payload) => ({
    type: UPDATE_ADDRESS,
    payload,
});
export const setUpdate = (payload) => ({type: SET_UPDATE, payload});
export const setCloseAddress = (payload) => ({type: SET_CLOSE, payload});

export const searchAddresses = (text) => async (dispatch, getState) => {
    try {
        const {lang} = getState().CategoryPage;      
        const response = await usersAPI.searchAddress(text, lang);
        dispatch(setSearchAddresses(response));
        dispatch(setErrors({}));
    } catch (error) {
        dispatch(setErrors({}));
        dispatch(setErrors(error.message));
    }
};

export const login = (tel, password) => async (dispatch, getState) => {
    try {
        const {lang} = getState().CategoryPage;
        const response = await usersAPI.login(tel, password, lang);
        const user = setUserInformation(response);
        dispatch(setUserInfo(user));
        dispatch(setToken(user.token));
        dispatch(setErrors({}));
        dispatch(setPasswordInStore(password));
    } catch (error) {
        dispatch(setErrors({}));
        dispatch(setErrors(error.response?.data?.errors));
    }
};

export const phoneVerify = (tel) => async (dispatch, getState) => {
    try {
       
        const response = await usersAPI.checkPhone(tel);
        dispatch(setPhoneVarify(response));
        dispatch(setTel(tel));
        dispatch(setErrors({}));
    } catch (error) {
        dispatch(setErrors({}));
        dispatch(setErrors(error.response.data?.errors));
    }
};

export const userRegister =
    (name, surname, email, password, cityId, entrance, floor, apt, phone) =>
        async (dispatch, getState) => {
            try {

                const {lang} = getState().CategoryPage;
                const response = await usersAPI.userRegister(
                    name,
                    surname,
                    email,
                    password,
                    cityId,
                    entrance,
                    floor,
                    apt,
                    phone,
                    lang
                );
                const user = setUserInformation(response);
                dispatch(setUserInfo(user));
                dispatch(setErrors({}));
                dispatch(setRegister(true));
            } catch (error) {
                dispatch(setErrors({}));

                dispatch(setErrors(error.response.data.errors));
            }
        };

export const verifyMessage = (tel) => async (dispatch, getState) => {
    try {
       
        const response = await usersAPI.verifyMessage(tel);
        dispatch(setMessageVerify(true));
        dispatch(setErrors({}));
    } catch (error) {
        dispatch(setErrors({}));
        dispatch(setMessageVerify(false));
    }
};

export const verification = (tel, code) => async (dispatch, getState) => {
    try {
       
        const {lang} = getState().CategoryPage;
        const response = await usersAPI.verification(tel, code, lang);
        dispatch(setVerify(true));
        dispatch(setErrors({}));
    } catch (error) {
        dispatch(setVerify(false));
        dispatch(setErrors({}));
        dispatch(setErrors(error.response?.data));

    }
};

export const register =
    (name, surname, email, password, tel) => async (dispatch, getState) => {
        try {
            const {token} = getState().UsersPage;
            const response = await usersAPI.userRegister(
                name,
                surname,
                email,
                password,
                tel
               
            );
            dispatch(setErrors({}));
            dispatch(setRegister(true));
        } catch (error) {
            dispatch(setErrors({}));
            dispatch(setErrors(error));
        }
    };

export const updateInfo =
    (name, surname, email, password) => async (dispatch, getState) => {
        try {
            const {lang} = getState().CategoryPage;
            const {token} = getState().UsersPage;
            const response = await usersAPI.updateInfo(
                name,
                surname,
                email,
                password,
                lang,
                token
            );

            dispatch(setUpdate(true));
            if (response) {
                dispatch(setPasswordInStore(password));
            }

            dispatch(setErrors({}));
        } catch (error) {
            dispatch(setErrors({}));
            dispatch(setUpdate(false));
            dispatch(setErrors(error.response?.data));
        }
    };
export const password_Reset =
    (tel, password, passwordRepeat) => async (dispatch, getState) => {
        try {
            const {token} = getState().UsersPage;
            const {lang} = getState().CategoryPage;
            const response = await usersAPI.passwordReset(
                tel,
                password,
                passwordRepeat,
                lang,
                token
            );

            dispatch(setErrors({}));
        } catch (error) {
            dispatch(setErrors({}));
            dispatch(setErrors(error?.response?.data));
        }
    };

export const addToCart =
    (id, delivery_type, quantity) => async (dispatch, getState) => {
        try {
            const {lang} = getState().CategoryPage;
            const {token} = getState().UsersPage;
            const response = await userCartAPI.addToCart(
                id,
                delivery_type,
                quantity,
                lang,
                token
            );
            dispatch(setErrors({}));
        } catch (error) {
            dispatch(setErrors({}));
            dispatch(setErrors(error?.response?.data?.message));
        }
    };

export const deleteProductFromCart =
    (products, filtertype) => async (dispatch, getState) => {
        try {
            const {lang} = getState().CategoryPage;
            const {token} = getState().UsersPage;
            const response = await userCartAPI.deleteProductFromCart(
                products,
                filtertype,
                lang,
                token
            );

            for (let i = 0; i < products.length; i++) {
                dispatch(deleteProductItem(products[i].id));
            }
            dispatch(setDeletedCartItemsAll1([]));
            dispatch(setErrors({}));
        } catch (error) {
            dispatch(setErrors({}));
            dispatch(setErrors(error));
        }
    };

export const updateProductQtyInCart =
    (id, qty, filtertype) => async (dispatch, getState) => {
        try {
            const {lang} = getState().CategoryPage;
            const {token} = getState().UsersPage;
            const response = await userCartAPI.updateProductQtyInCart(
                id,
                qty,
                lang,
                token
            );
            dispatch(getProductsFromCart(filtertype));
            dispatch(setErrors({}));
        } catch (error) {
            dispatch(setErrors(error));
        }
    };


export const getProductsFromCart =
    (delivery_type) => async (dispatch, getState) => {
        try {
            const {lang} = getState().CategoryPage;
            const {token} = getState().UsersPage;

            const response = await userCartAPI.getProductsFromCart(
                delivery_type,
                lang,
                token
            );
            const arr = getBasketProducts(response);
            dispatch(setCartProducts(arr));
            dispatch(setErrors({}));
        } catch (error) {
            dispatch(setErrors(error));
        }
    };
export const getAllAddresses =
    (delivery_type) => async (dispatch, getState) => {
        try {
            // dispatch(setAddresses([]))
            const {lang} = getState().CategoryPage;
            const {token} = getState().UsersPage;
            const response = await userCartAPI.getAllAddresses(lang, token);
            const arr = getAddresses(response);
            dispatch(setAddresses(arr));
            dispatch(setErrors({}));
        } catch (error) {
            dispatch(setErrors(error));
        }
    };

export const deleteAddress = (id) => async (dispatch, getState) => {
    try {
        const {lang} = getState().CategoryPage;
        const {token} = getState().UsersPage;
        const response = await userCartAPI.deleteAddress(id, lang, token);
        dispatch(getAllAddresses());
        dispatch(setErrors({}));
    } catch (error) {
        dispatch(setErrors(error));
    }
};
export const updateAddress = (data, id) => async (dispatch, getState) => {
    try {
        const {lang} = getState().CategoryPage;
        const {token} = getState().UsersPage;
        const response = await userCartAPI.updateAddress(data, id, lang, token);
        dispatch(getAllAddresses());
        dispatch(setErrors({}));
        dispatch(setCloseAddress(false));
        dispatch(setAddressMode(false));
    } catch (error) {
        dispatch(setErrors(error));
    }
};

export const createAddress = (data) => async (dispatch, getState) => {
    try {
        const {lang} = getState().CategoryPage;
        const {token} = getState().UsersPage;
        const response = await userCartAPI.createAddress(data, lang, token);
        dispatch(getAllAddresses());
        dispatch(setErrors({}));
        dispatch(setCloseAddress(false));
        dispatch(setAddressMode(false));

    } catch (error) {
        dispatch(setErrors(error));
    }
};
export const getOneAddress = (id) => async (dispatch, getState) => {
    try {
        const {lang} = getState().CategoryPage;
        const {token} = getState().UsersPage;
        const response = await userCartAPI.getOneAddress(id, lang, token);
        dispatch(setOneAddress(response));
        dispatch(setErrors({}));
    } catch (error) {
        dispatch(setErrors(error));
    }
};

export const buyProducts = (data) => async (dispatch, getState) => {
    try {
     
        const {lang} = getState().CategoryPage;
        const {token} = getState().UsersPage;
        const response = await userCartAPI.buyProducts(data, lang, token);
        dispatch(setErrors({}));
        dispatch(setIsBuy(true))
    } catch (error) {
        dispatch(setIsBuy(false))
        dispatch(setErrors(error));
    }
};

export const sendEmail = (email) => async (dispatch, getState) => {
    try {

        const {lang} = getState().CategoryPage;
        const response = await searchAPI.sendEmail(email, lang)
        dispatch(setIsEmail(true));
        dispatch(setErrors({}));

    } catch (error) {

        dispatch(setIsEmail(false));
        dispatch(setErrors(error.response?.data));
    }
};

export default usersReducer;
