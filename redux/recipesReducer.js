import {recipesAPI} from '../Api/RecipesApi/api'
import {
    getRecipe,
    getRecipesById,
    getProductsAll,
} from '../utils'
import {getCategoriesRecipe} from '../utils'



const SET_RECIPES = 'SET_RECIPES'
const SET_RECIPE = 'SET_RECIPE'
const SET_RECIPES_CATEGORIES = 'SET_RECIPES_CATEGORIES'
const SET_RECIPES_BY_CATEGORY = 'SET_RECIPES_BY_CATEGORY'
const SET_RECIPE_PRODUCTS = 'SET_RECIPE_PRODUCTS'
const CHANGE_LOADING = 'CHANGE_LOADING'
const SET_NEXT_PAGE_URL = 'SET_NEXT_PAGE_URL'
const ADD_NEXT_DATA = "SET_NEXT_DATA";

const initialState = {
    recipes: [],
    recipe: {},
    recipesCategories: [],
    recipe_products: [],
    loading: false,
    next_page_url: null,
}

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RECIPES:
            return {
                ...state,

                recipes: action.payload,
            }
            case SET_NEXT_PAGE_URL:
                return {
                    ...state,
    
                    next_page_url: action.payload,
                }
    

        case SET_RECIPE:
            return {
                ...state,

                recipe: action.payload,
            }
        case SET_RECIPES_CATEGORIES:
            return {
                ...state,

                recipesCategories: action.payload,
            }

        case SET_RECIPES_BY_CATEGORY:
            return {
                ...state,

                recipes: action.payload,
            }

        case SET_RECIPE_PRODUCTS:
            return {
                ...state,

                recipe_products: action.payload,
            }

        case CHANGE_LOADING:

            return {
                ...state,

                loading: action.payload,
            }
            case ADD_NEXT_DATA:

                return {
                  ...state,
                  recipe_products: state.recipe_products.concat(action.payload),
                };

        default:
            return state
    }
}

export const setNextPageUrl= (payload) => ({type: SET_NEXT_PAGE_URL, payload})
export const setRecipes = (payload) => ({type: SET_RECIPES, payload})
export const changeLoading2 = (payload) => ({type: CHANGE_LOADING, payload})
export const addNextData = (payload) => ({ type: ADD_NEXT_DATA, payload });
export const setRecipeProducts = (payload) => ({
    type: SET_RECIPE_PRODUCTS,
    payload,
})
export const setRecipe = (payload) => ({type: SET_RECIPE, payload})

export const setRecipesCategories = (payload) => ({
    type: SET_RECIPES_CATEGORIES,
    payload,
})

export const setRecipesByCategory = (payload) => ({
    type: SET_RECIPES_BY_CATEGORY,
    payload,
})

export const getRecipesByCategory = (id) => async (dispatch, getState) => {
    dispatch(changeLoading2(true))
    dispatch(setRecipes([]))
    const {lang} = getState().CategoryPage;
    const response = await recipesAPI.getRecipesByCategory(id, lang)
    const arr = getRecipesById(response.recipes)
    dispatch(setRecipes(arr))
    dispatch(changeLoading2(false))
}

export const getRecipesCategories = () => async (dispatch, getState) => {
    const {lang} = getState().CategoryPage;
    const response = await recipesAPI.getRecipesCategories(lang)
    const arr = getCategoriesRecipe(response)
    dispatch(setRecipesCategories(arr))
}

export const getRecipes = () => async (dispatch, getState) => {
    dispatch(changeLoading2(true))
    dispatch(setRecipes([]))
    const {lang} = getState().CategoryPage;
    const response = await recipesAPI.getRecipes(lang)
    const arr = getRecipesById(response)
    dispatch(setRecipes(arr))
    dispatch(changeLoading2(false))
}

export const getRecipeProductsByCategory = (id, cat_id, filter) => async (
    dispatch, getState
) => {
    dispatch(changeLoading2(true))
    const {lang} = getState().CategoryPage; 
    const response = await recipesAPI.getRecipeProductsByCategory(
        id,
        cat_id,
        filter,
        lang,         
    )   
    const arr = getProductsAll(response?.data?.recipe_products)
    dispatch(setRecipeProducts(arr))
    dispatch(changeLoading2(false))
}

export const getRecipeDesc = (id) => async (dispatch, getState) => {
    dispatch(changeLoading2(true))
    dispatch(setRecipe({}))
    const {lang} = getState().CategoryPage
    const response = await recipesAPI.getRecipeDesc(id, lang)   
    const arr = getRecipe(response)
    dispatch(setRecipe(arr))
    dispatch(setNextPageUrl(response.next_page_url))
    dispatch(changeLoading2(false))
}
// export const getNextPageData = (url) => async (dispatch, getState) => {
//     try {
//       dispatch(changeLoading2(true));
//       const { lang } = getState().CategoryPage;
//       const response = await productsAPI.getNextPageData(url);
//       console.log(response);
//       const arr = getProductsAll(response);
//       dispatch(addNextData(arr));
//       dispatch(setNextPageUrl(response.next_page_url));
//       dispatch(changeLoading2(false));
//     } catch (error) {
//       console.log(error);
//     }
//   };

export default recipesReducer
