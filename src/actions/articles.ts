import {ArticleResponse} from "../helpers/api-calls";
import {
    CHANGE_ARTICLE_IN_FORM,
    LOAD_ARTICLE_IN_FORM,
    LOAD_ARTICLES,
} from "../types/actions";
import Article from "../types/Article";

export function loadArticlesAction(articleResponse: ArticleResponse) {
    return {
        type: LOAD_ARTICLES,
        ...articleResponse
    }
}

export function loadArticleInForm(article: Article) {
    return {
        type: LOAD_ARTICLE_IN_FORM,
        article
    }
}

export function changeArticleInForm(article: Article) {
    return {
        type: CHANGE_ARTICLE_IN_FORM,
        article
    }
}