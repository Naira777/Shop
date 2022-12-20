import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import categoryReducer from "./reducer";
import recipesReducer from "./recipesReducer";
import usersReducer from "./usersReducer";
import rulesReducer from "./rulesReducer";
import offersReducer from "./offersReducer";
import providerReducer from "./providersReducer";
import questionsReducer from "./questionsReducer";
import careersReducer from "./careersReducer";
import shoppingHistoryReducer from "./shoppingHistoryReducer";


const reducers = combineReducers({
    CategoryPage: categoryReducer,
    RecipesPage: recipesReducer,
    UsersPage: usersReducer,
    OffersPage: offersReducer,
    RulesPage: rulesReducer,
    ProvidersPage: providerReducer,
    QuestionsPage:questionsReducer,
    CareersPage:careersReducer,
    shoppingHistoryPage:shoppingHistoryReducer
})


const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;


export default store;