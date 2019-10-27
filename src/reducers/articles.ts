import Article from "../types/Article";
import {ArticleTypes} from "../types/actions";

interface ArticlesState {
    articles: Array<Article> | null,
    currentArticle: Article | null,
    isSubmitting: boolean,
    isSuccess: boolean,
    message: string
}

const initialState: ArticlesState = {
    articles: [],
    currentArticle: null,
    isSubmitting: false,
    isSuccess: false,
    message: ""
};

export default function articlesReducer(state = initialState, action: ArticleTypes,) {
    switch (action.type) {
        case "LOAD_ARTICLES":
            return {
                ...state,
                articles: action.articles
            };
        case "LOAD_ARTICLE_IN_FORM":
            return {
                ...state,
                currentArticle: action.article
            };
        default:
            return state
    }
}