// @ts-ignore
import Tag from "./Tag";
import Article from "./Article";

export const LOAD_TAGS = "LOAD_TAGS";
export const LOAD_TAG_IN_FORM = "LOAD_TAG_IN_FORM";
export const SUBMIT_TAG_FORM = "SUBMIT_TAG_FORM";
export const CHANGE_TAG_IN_FORM = "CHANGE_TAG_IN_FORM";
export const FAIL_SUBMIT_TAG_FORM = "FAIL_SUBMIT_TAG_FORM";
export const SUCCESS_SUBMIT_TAG_FORM = "SUCCESS_SUBMIT_TAG_FORM";

export const OPEN_TAG_MODAL = "OPEN_TAG_MODAL";
export const CLOSE_TAG_MODAL = "CLOSE_TAG_MODAL";

export const CREATE_NEW_TAG = "CREATE_NEW_TAG";

export const LOAD_ARTICLES = "LOAD_ARTICLES";
export const LOAD_ARTICLE_IN_FORM = "LOAD_ARTICLE_IN_FORM";
export const SUBMIT_ARTICLE_FORM = "SUBMIT_ARTICLE_FORM";
export const CHANGE_ARTICLE_IN_FORM = "CHANGE_ARTICLE_IN_FORM";
export const FAIL_SUBMIT_ARTICLE_FORM = "FAIL_SUBMIT_ARTICLE_FORM";
export const SUCCESS_SUBMIT_ARTICLE_FORM = "SUCCESS_SUBMIT_ARTICLE_FORM";

export const MOVE_ARTICLE_CONTENT = "MOVE_ARTICLE_CONTENT";

export interface LoadTagsAction {
    type: typeof LOAD_TAGS,
    tags: Array<Tag>
}

export interface LoadTagInFormAction {
    type: typeof LOAD_TAG_IN_FORM,
    tag: Tag
}

export interface ChangeTagInFormAction {
    type: typeof CHANGE_TAG_IN_FORM,
    tag: Tag
}

export interface ChangeTagInFormAction {
    type: typeof CHANGE_TAG_IN_FORM,
    tag: Tag
}

export interface SubmitTagForm {
    type: typeof SUBMIT_TAG_FORM
}

export interface FailSubmitTagForm {
    type: typeof FAIL_SUBMIT_TAG_FORM
}

export interface SuccessSubmitTagForm {
    type: typeof SUCCESS_SUBMIT_TAG_FORM
}

export interface CreateNewTag {
    type: typeof CREATE_NEW_TAG
}

export interface OpenTagModal {
    type: typeof OPEN_TAG_MODAL
}

export interface CloseTagModal {
    type: typeof CLOSE_TAG_MODAL
}

export interface LoadArticlesAction {
    type: typeof LOAD_ARTICLES,
    articles: Array<Article>,
    numberOfPages: number,
    currentPage: number
}

export interface LoadArticleInFormAction {
    type: typeof LOAD_ARTICLE_IN_FORM,
    article: Article
}

export interface ChangeArticleInFormAction {
    type: typeof CHANGE_ARTICLE_IN_FORM,
    article: Article
}

export interface ChangeArticleInFormAction {
    type: typeof CHANGE_ARTICLE_IN_FORM,
    tag: Article
}

export interface SubmitArticleForm {
    type: typeof SUBMIT_ARTICLE_FORM
}

export interface FailSubmitArticleForm {
    type: typeof FAIL_SUBMIT_ARTICLE_FORM
}

export interface SuccessSubmitArticleForm {
    type: typeof SUCCESS_SUBMIT_ARTICLE_FORM
}

export const UP = "UP";
export const DOWN = "DOWN";

export interface MoveArticleContentUp {
    type: typeof MOVE_ARTICLE_CONTENT,
    direction: typeof UP | typeof DOWN,
    currentPosition: number
}

export type ArticleTypes =
    LoadArticlesAction
    | LoadArticleInFormAction
    | ChangeArticleInFormAction
    | SubmitArticleForm
    | SuccessSubmitArticleForm
    | FailSubmitArticleForm
    | MoveArticleContentUp

export type TagTypes =
    LoadTagsAction
    | LoadTagInFormAction
    | ChangeTagInFormAction
    | SubmitTagForm
    | SuccessSubmitTagForm
    | FailSubmitTagForm
    | OpenTagModal
    | CloseTagModal
    | CreateNewTag