import Article from "../types/Article";
import {ArticleTypes, LOAD_ARTICLE_IN_FORM, LOAD_ARTICLES} from "../types/actions";

interface ArticlesState {
    articles: Array<Article> | null,
    currentArticle: Article | null,
    isSubmitting: boolean,
    isSuccess: boolean,
    message: string,
    currentPage: number,
    numberOfPages: number
}

const initialState: ArticlesState = {
    articles: null,
    currentArticle: null,
    isSubmitting: false,
    isSuccess: false,
    message: "",
    currentPage: 1,
    numberOfPages: 1
};

export default function articlesReducer(state = initialState, action: ArticleTypes,) {
    switch (action.type) {
        case LOAD_ARTICLES:
            return {
                ...state,
                articles: action.articles
            };
        case LOAD_ARTICLE_IN_FORM:
            return {
                ...state,
                currentArticle: action.article
            };
        default:
            return state
    }
}