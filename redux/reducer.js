import {brandsAPI} from '../Api/BrandsApi/api'
import {picturesAPI} from '../Api/PictuesApi/api'
import {productsAPI} from '../Api/ProductsApi/api'
import { searchAPI} from "../Api/SearchApi/api";

import {
    getBrandsUrl,
    getNameAndCategory,
    getProductDesc,
    getProductsByBrand,
    getProductsAll,
    getCategoryTitle,
} from "../utils"

const SET_CATEGORIES = "SET_CATEGORIES";
const SET_BRANDS = "SET_BRANDS";
const SET_BRAND_AND_PRODUCTS = "SET_BRAND_AND_PRODUCTS";
const SET_PRODUCT = "SET_PRODUCT";
const SET_PRODUCTS = "SET_PRODUCTS";
const SET_NEW_PRODUCTS = "SET_NEW_PRODUCTS";
const SET_HIT_PRODUCTS = "SET_HIT_PRODUCTS";
const SET_SALE_PRODUCTS = "SET_SALE_PRODUCTS";
const SET_CATEGORIES_BY_ID = "SET_CATEGORIES_BY_ID";
const SET_CATEGORY_TITLE = "SET_CATEGORY_TITLE";
const CHANGE_LOADING = "CHANGE_LOADING";
const SET_CATEGORYLIST = "SET_CATEGORYLIST";
const SET_CATEGORYBYIDES = "SET_CATEGORYBYIDES";
const SET_PAGE = "SET_PAGE";
const SET_LANGUAGE = "SET_LANGUAGE";
const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
const ADD_NEXT_DATA = "SET_NEXT_DATA";
const SET_URL = "SET_URL";
const SET_DELIVERY_TYPE = "SET_DELIVERY_TYPE";
const SET_JOBS = "SET_JOBS";
const SET_REVIEWS = "SET_REVIEWS";
const SET_DELIVERY_PRICES = "SET_DELIVERY_PRICES";
const SET_CLICK = "SET_CLICK";
const SET_CLICK_DESKTOP = "SET_CLICK_DESKTOP";
const SET_NOT_ALLOWED = "SET_NOT_ALLOWED";
const CLICK_SELECT = "CLICK_SELECT";
const CLICK_SEARCH = "CLICK_SEARCH";
const CLICK_PRODUCT = "CLICK_PRODUCT";
const SET_PICTURES = "SET_PICTURES";
const SET_ALL_CATEGORIES = "SET_ALL_CATEGORIES";



const initialState = {
  
    category_title: "",
    categories: [],
    all_categories: [],
    brands: [],
    brand_and_products: {},
    product: {},
    products: [],
    categoriesById: [],
    categoryList: [],
    loading: false,
    page: null,
    lang: "",
    search_results: [],
    search_text: "",
    next_page_url: "",
    delivery_type: "all",
    new_products: [],
    hit_products: [],
    sale_products: [],
    jobs: [],
    reviews: [],
    deliveryPrices: {},
    clickMenu: false,
    clickMenuDesktop: false,
    not_allowed: false,
    click_select: false,
    click_search: false,
    pictures: [],
    click_product: false,

};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ALL_CATEGORIES:
            return {
                ...state,
                all_categories: action.payload,
            };

        case CLICK_PRODUCT:
            return {
                ...state,
                click_product: action.payload,
            };

        case SET_PICTURES:
            return {
                ...state,
                pictures: action.payload,
            };

        case CLICK_SELECT:
            return {
                ...state,
                click_select: action.payload,
            };
        case CLICK_SEARCH:
            return {
                ...state,
                click_search: action.payload,

            };
        case SET_NOT_ALLOWED:
            return {
                ...state,
                not_allowed: action.payload,
            };

        case SET_DELIVERY_PRICES:
            return {
                ...state,
                deliveryPrices: action.payload,
            };

        case SET_CLICK_DESKTOP:
            return {
                ...state,
                clickMenuDesktop: action.payload,
            };
        case SET_CLICK:
            return {
                ...state,
                clickMenu: action.payload,
            };

        case SET_JOBS:
            return {
                ...state,
                jobs: action.payload,
            };

        case SET_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
            };

        case SET_URL:
            return {
                ...state,
                next_page_url: action.payload,
            };

        case ADD_NEXT_DATA:
            return {
                ...state,
                products: state.products.concat(action.payload),
            };

        case SET_LANGUAGE:
            return {
                ...state,
                lang: action.payload,
            };
        case SET_CATEGORYBYIDES:
            return {
                ...state,

                categoriesById: action.payload,
            };

        case SET_CATEGORYLIST:
            return {
                ...state,

                categoryList: action.payload,
            };

        case CHANGE_LOADING:
            return {
                ...state,

                loading: action.payload,
            };

        case SET_CATEGORIES:
            return {
                ...state,

                categories: action.payload,
            };

        case SET_CATEGORY_TITLE:
            return {
                ...state,

                category_title: action.payload,
            };
        case SET_BRANDS:
            return {
                ...state,

                brands: action.payload,
            };

        case SET_CATEGORIES_BY_ID:
            return {
                ...state,

                categoriesById: action.payload,
            };

        case SET_BRAND_AND_PRODUCTS:
            return {
                ...state,

                brand_and_products: action.payload,
            };

        case SET_PRODUCT:
            return {
                ...state,

                product: action.payload,
            };

        case SET_PRODUCTS:
            return {
                ...state,

                products: action.payload,
            };
        case SET_NEW_PRODUCTS:
            return {
                ...state,

                new_products: action.payload,
            };
        case SET_HIT_PRODUCTS:
            return {
                ...state,

                hit_products: action.payload,
            };
        case SET_SALE_PRODUCTS:
            return {
                ...state,

                sale_products: action.payload,
            };

        case SET_PAGE:
            return {
                ...state,

                page: action.payload,
            };

        case SET_SEARCH_RESULTS:
            return {
                ...state,

                search_results: action.payload,
            };

        case SET_SEARCH_TEXT:
            return {
                ...state,

                search_text: action.payload,
            };
        case SET_DELIVERY_TYPE:
            return {
                ...state,

                delivery_type: action.payload,
            };

        default:
            return state;
    }
};

export const setAllCategories= (payload) => ({
    type: SET_ALL_CATEGORIES,
    payload,
})
export const setPictures = (payload) => ({
    type: SET_PICTURES,
    payload,
})

export const setClickProduct = (payload) => ({
    type: CLICK_PRODUCT,
    payload,
})

export const setClickSelect = (payload) => ({
    type: CLICK_SELECT,
    payload,
})
export const setClickSerach = (payload) => ({
    type: CLICK_SEARCH,
    payload,
})

export const setNotAllowed = (payload) => ({
    type: SET_NOT_ALLOWED,
    payload,
})

export const setClickMenuDesktop = (payload) => ({
    type: SET_CLICK_DESKTOP,
    payload,
});

export const setClickMenu = (payload) => ({
    type: SET_CLICK,
    payload,
});

export const setDeliveryPrices = (payload) => ({
    type: SET_DELIVERY_PRICES,
    payload,
});

export const setDeliveryType = (payload) => ({
    type: SET_DELIVERY_TYPE,
    payload,
});
export const setNextPageUrl = (payload) => ({type: SET_URL, payload});

export const changeCategoryIdes = (payload) => ({
    type: SET_CATEGORYBYIDES,
    payload,
});

export const addNextData = (payload) => ({type: ADD_NEXT_DATA, payload});

export const setLanguage = (payload) => ({type: SET_LANGUAGE, payload});

export const setSearchResults = (payload) => ({
    type: SET_SEARCH_RESULTS,
    payload,
});
export const setSearchText = (payload) => ({type: SET_SEARCH_TEXT, payload});

export const changeCategoryList = (payload) => ({
    type: SET_CATEGORYLIST,
    payload,
});
export const changeLoading = (payload) => ({type: CHANGE_LOADING, payload});

export const setCategories = (payload) => ({type: SET_CATEGORIES, payload});

export const setPage = (payload) => ({type: SET_PAGE, payload});

export const setCategoriesById = (payload) => ({
    type: SET_CATEGORIES_BY_ID,
    payload,
});

export const setBrandAndProducts = (payload) => ({
    type: SET_BRAND_AND_PRODUCTS,
    payload,
});
export const setBrands = (payload) => ({type: SET_BRANDS, payload});
export const setProduct = (payload) => ({type: SET_PRODUCT, payload});
export const setProducts = (payload) => ({type: SET_PRODUCTS, payload});
export const setNewProducts = (payload) => ({
    type: SET_NEW_PRODUCTS,
    payload,
});
export const setHitProducts = (payload) => ({
    type: SET_HIT_PRODUCTS,
    payload,
});
export const setSaleProducts = (payload) => ({
    type: SET_SALE_PRODUCTS,
    payload,
});

export const setCategoryTitle = (payload) => ({
    type: SET_CATEGORY_TITLE,
    payload,
});
export const setJobs = (payload) => ({type: SET_JOBS, payload});
export const setReviews = (payload) => ({type: SET_REVIEWS, payload});


export const getPictures = () => async (dispatch) => {
    dispatch(changeLoading(true));
    const response = await picturesAPI.getPictures();
    dispatch(setPictures(response));
    dispatch(changeLoading(false));
};

export const getSearchResults = (text) => async (dispatch, getState) => {
    dispatch(changeLoading(true));
    const {lang} = getState().CategoryPage;   
    const response = await searchAPI.search(text, lang);
    dispatch(setSearchResults(response));
    dispatch(changeLoading(false));
};

export const getCategories = () => async (dispatch, getState) => {
    const {lang} = getState().CategoryPage;
    const response = await productsAPI.getCategories(lang);
    const arr = getNameAndCategory(response);
    dispatch(setAllCategories(response));    
    dispatch(setCategories(arr));
};

export const getCategoryTitleById = (id) => async (dispatch, getState) => {
    dispatch(setCategoryTitle(""));
    const {lang} = getState().CategoryPage;
    const response = await productsAPI.getCategories(lang);
    const title = getCategoryTitle(response, id);
    dispatch(setCategoryTitle(title));
};

export const getCategoriesById = () => async (dispatch, getState) => {
    dispatch(changeCategoryList([]));
    const {lang} = getState().CategoryPage;
    const response = await productsAPI.getCategoriesById(lang);
    dispatch(changeCategoryList(response));


};

export const getBrands = () => async (dispatch, getState) => {
    dispatch(changeLoading(true));
    dispatch(setBrands([]));   
    const {lang} = getState().CategoryPage;
    const response = await brandsAPI.getBrands(lang);
    const arr = getBrandsUrl(response);
    dispatch(setBrands(arr));
    dispatch(changeLoading(false));
};

export const getBrandsByCategory = (id) => async (dispatch, getState) => {
    dispatch(changeLoading(true));
    dispatch(setBrands([]));   
    const {lang} = getState().CategoryPage;
    const response = await brandsAPI.getBrandsByCategory(id, lang);
    const arr = getBrandsUrl(response);
    dispatch(setBrands(arr));
    dispatch(changeLoading(false));
};

export const getBrandProductsandDesc =
    (id, filter) => async (dispatch, getState) => {
        dispatch(changeLoading(true));
        const {lang, delivery_type} = getState().CategoryPage;
        const response = await brandsAPI.getProductsByBrand(id, filter, delivery_type, lang);
        const arr = getProductsByBrand(response);   
        dispatch(setBrandAndProducts(arr));
        dispatch(changeLoading(false));
    };

export const getProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch(changeLoading(true));
        dispatch(setProduct({}));
        dispatch(setNotAllowed(false))
        const {token} = getState().UsersPage;
        const {lang, delivery_type} = getState().CategoryPage;
        let response;

        if (delivery_type === "all") {
            response = await productsAPI.getProduct(id, "supermarket", lang, token);
        } else {
            response = await productsAPI.getProduct(id, delivery_type, lang, token);
        }
        if (response) {
            const arr = getProductDesc(response);
            dispatch(setProduct(arr));
            dispatch(changeLoading(false));

        } else {
            dispatch(setNotAllowed(true))
            dispatch(changeLoading(false));
        }

    } catch (error) {
    }
};

export const getProductsByPar_Id =
    (id, filter) => async (dispatch, getState) => {
        try {
            dispatch(changeLoading(true));
            dispatch(setProducts([]));
            const {lang, delivery_type} = getState().CategoryPage;
            const {token} = getState().UsersPage;
            const response = await productsAPI.getProductsByPar_Id(
                id,
                filter,
                delivery_type,
                lang,
                token
            );           
            const arr = getProductsAll(response.data);
            dispatch(setProducts(arr));
            dispatch(setNextPageUrl(null));
            dispatch(setNextPageUrl(response.links?.next));
            dispatch(changeLoading(false));
        } catch (error) {
            dispatch(changeLoading(false));
        }
    };

export const getDiscountedProducts =
    (id, filter) => async (dispatch, getState) => {
        try {
            dispatch(changeLoading(true));
            dispatch(setProducts([]));
            const {lang, delivery_type} = getState().CategoryPage;
            const {token} = getState().UsersPage;
            const response = await productsAPI.getDiscountedProducts(
                id,
                filter,
                delivery_type,
                lang,
                token
            );
            const arr = getProductsAll(response.data);
            dispatch(setProducts(arr));
            dispatch(setSaleProducts(arr));
            dispatch(setNextPageUrl(""));
            dispatch(setNextPageUrl(response.links?.next));
            dispatch(changeLoading(false));
        } catch (error) {
            dispatch(changeLoading(false));
        }
    };

export const getProductsByType =
    (id = "all", filter = "all", filterproducttype) =>
        async (dispatch, getState) => {
            try {
                dispatch(changeLoading(true));
                dispatch(setProducts([]));
                const {lang, delivery_type} = getState().CategoryPage;
                const {token} = getState().UsersPage;
                const response = await productsAPI.getProductsByType(
                    id,
                    filter,
                    filterproducttype,
                    delivery_type,
                    lang,
                    token
                );

                const arr = getProductsAll(response.data);
                dispatch(setProducts(arr));
                if (filterproducttype === "new") {
                    dispatch(setNewProducts(arr));
                }
                if (filterproducttype === "bestseller") {
                    dispatch(setHitProducts(arr));
                }
                dispatch(setNextPageUrl(""));
                dispatch(setNextPageUrl(response?.links?.next));
                dispatch(changeLoading(false));
            } catch (error) {
            }
            dispatch(changeLoading(false));
        };

export const getNextPageData = (url) => async (dispatch, getState) => {
    try {
        dispatch(changeLoading(true));
        const {lang} = getState().CategoryPage;    
        const response = await productsAPI.getNextPageData(url, lang);
        const arr = getProductsAll(response.data);        
        dispatch(addNextData(arr));
        dispatch(setNextPageUrl(response?.links?.next));
        dispatch(changeLoading(false));
      
    } catch (error) {

    }
};
export const getJobs = () => async (dispatch, getState) => {
    try {
        const {lang} = getState().CategoryPage;
        const response = await searchAPI.announcements(lang)
        dispatch(setJobs(response));
    } catch (error) {

    }
};

export const getReviews = () => async (dispatch, getState) => {
    try {

        const {lang} = getState().CategoryPage;
        const response = await searchAPI.reviews(lang)
        dispatch(setReviews(response));

    } catch (error) {

    }
};

export const getDeliveryPrices = () => async (dispatch, getState) => {
    try {

        const {lang} = getState().CategoryPage;
        const response = await searchAPI.deliveryTypes(lang)
        dispatch(setDeliveryPrices(response));

    } catch (error) {

    }
};


export default categoryReducer;
