import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {womenCategoriesReducer} from './reducers/categoryReducers';
import {getProductsReducer} from './reducers/productReducers';

const reducer = combineReducers({
    womenCategories: womenCategoriesReducer,
    products : getProductsReducer
})

const initialState = {}

const middleware= [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store; 