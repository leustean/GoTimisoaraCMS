import Article from "../types/Article";
import {ArticleTypes, DOWN, LOAD_ARTICLE_IN_FORM, LOAD_ARTICLES, MOVE_ARTICLE_CONTENT, UP} from "../types/actions";

interface ArticlesState {
    articles: Array<Article> | null,
    currentArticle: Article,
    isSubmitting: boolean,
    isSuccess: boolean,
    message: string,
    currentPage: number,
    numberOfPages: number
}

const today = new Date();

const emptyArticle = {
    articleId: 0,
    title: "",
    contents: [],
    createdAt: `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`,
    updatedAt: `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`,
    isVisible: false,
    author: {
        email: "",
        username: "",
        fullName: ""
    }
};

const initialState: ArticlesState = {
    articles: null,
    currentArticle: emptyArticle,
    isSubmitting: false,
    isSuccess: false,
    message: "",
    currentPage: 1,
    numberOfPages: 1
};

export default function articlesReducer(state = initialState, action: ArticleTypes) {
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
        case MOVE_ARTICLE_CONTENT:
            if (action.direction === UP && action.currentPosition === 0) {
                return state
            }
            if (action.direction === DOWN && (action.currentPosition + 1) === state.currentArticle.contents.length) {
                return state
            }
            const newArticleContents = [...state.currentArticle.contents];
            const articleContentToMove = newArticleContents[action.currentPosition];
            newArticleContents.splice(action.currentPosition, 1);
            if (action.direction === UP) {
                newArticleContents.splice(action.currentPosition - 1, 0, articleContentToMove)
            } else {
                newArticleContents.splice(action.currentPosition + 1, 0, articleContentToMove)
            }

            return {
                ...state,
                currentArticle: {
                    ...state.currentArticle,
                    contents: newArticleContents
                }
            };
        default:
            return state
    }
}