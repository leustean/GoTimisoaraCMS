import {combineReducers} from "redux";
import articlesReducer from "../reducers/articles";
import tagsReducer from "../reducers/tags";
import usersReducer from "../reducers/users";
import thunk from "redux-thunk";
import {createStore, applyMiddleware, compose} from 'redux';

const rootReducer = combineReducers({
    articles: articlesReducer,
    tags: tagsReducer,
    users: usersReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;

export type AppState = ReturnType<typeof rootReducer>