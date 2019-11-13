import {ArticleResponse} from "../helpers/api-calls";
import {DOWN, LOAD_ARTICLE_IN_FORM, LOAD_ARTICLES, MOVE_ARTICLE_CONTENT, UP} from "../types/actions";
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

export function moveArticleContent(currentPosition: number, direction: typeof UP | typeof DOWN) {
    return {
        type: MOVE_ARTICLE_CONTENT,
        direction: direction,
        currentPosition: currentPosition
    }
}