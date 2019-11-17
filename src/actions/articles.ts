import {ArticleResponse} from "../helpers/api-calls";
import {
    CHANGE_ARTICLE_IN_FORM, CLEAR_ARTICLE, FAIL_SUBMIT_ARTICLE_FORM,
    LOAD_ARTICLE_IN_FORM,
    LOAD_ARTICLES, SUBMIT_ARTICLE_FORM, SUCCESS_SUBMIT_ARTICLE_FORM,
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

export function submitArticleForm() {
    return {
        type: SUBMIT_ARTICLE_FORM
    }
}

export function successArticleForm() {
    return {
        type: SUCCESS_SUBMIT_ARTICLE_FORM
    }
}

export function failArticleForm() {
    return {
        type: FAIL_SUBMIT_ARTICLE_FORM
    }
}

export function clearArticleForm() {
    return {
        type: CLEAR_ARTICLE
    }
}