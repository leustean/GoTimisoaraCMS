import Article from "../types/Article";
import {
    ArticleTypes,
    CHANGE_ARTICLE_IN_FORM, CLEAR_ARTICLE, FAIL_SUBMIT_ARTICLE_FORM,
    LOAD_ARTICLE_IN_FORM,
    LOAD_ARTICLES, SUBMIT_ARTICLE_FORM, SUCCESS_SUBMIT_ARTICLE_FORM,
} from "../types/actions";

interface ArticlesState {
    articles: Array<Article> | null,
    currentArticle: Article | null,
    isSubmitting: boolean,
    isSuccess: boolean,
    message: string,
    pageNumber: number,
    numberOfPages: number,
}

const initialState: ArticlesState = {
    articles: null,
    currentArticle: null,
    isSubmitting: false,
    isSuccess: false,
    message: "",
    pageNumber: 1,
    numberOfPages: 1
};

export default function articlesReducer(state = initialState, action: ArticleTypes) {
    switch (action.type) {
        case LOAD_ARTICLES:
            return {
                ...state,
                articles: action.articles,
                pageNumber: action.pageNumber,
                numberOfPages: action.numberOfPages
            };
        case LOAD_ARTICLE_IN_FORM:
            return {
                ...state,
                currentArticle: action.article,
                isSubmitting: false,
                isSuccess: false,
                message: "",
            };

        case CHANGE_ARTICLE_IN_FORM:
            return {
                ...state,
                currentArticle: action.article
            };
        case SUBMIT_ARTICLE_FORM:
            return {
                ...state,
                isSubmitting: true,
            };
        case SUCCESS_SUBMIT_ARTICLE_FORM:
            return {
                ...state,
                isSubmitting: false,
                isSuccess: true,
                message: "Operation successful"
            };
        case FAIL_SUBMIT_ARTICLE_FORM:
            return {
                ...state,
                isSubmitting: false,
                isSuccess: false,
                message: "Operation failed"
            };
        case CLEAR_ARTICLE:
            return {
                ...state,
                currentArticle: null,
                isSubmitting: false,
                isSuccess: false,
                message: "",
            };
        default:
            return state
    }
}