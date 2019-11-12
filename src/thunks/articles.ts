import {ArticleResponse, getArticlesAtPage} from "../helpers/api-calls";
import {loadArticleInForm, loadArticlesAction} from "../actions/articles";
import {AppState} from "../store";
import Article from "../types/Article";

export const loadArticlesAtPageThunk = (pageNumber: number) => (dispatch: (arg0: any) => void) => {
    getArticlesAtPage(pageNumber).then((response: ArticleResponse) => {
        dispatch(loadArticlesAction(response))
    })
};

export const loadArticleInFormThunk = (articleId: number) => (dispatch: (arg0: any) => void, getState: () => AppState) => {
    const articles = getState().articles.articles;
    if (!articles) {
        return;
    }
    const articleToLoad = articles.find((article: Article) => article.articleId === articleId);
    if (!articleToLoad) {
        return;
    }
    dispatch(loadArticleInForm(articleToLoad));
};