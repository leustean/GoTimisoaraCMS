import {ArticleResponse, getArticlesAtPage} from "../helpers/api-calls";
import {changeArticleInForm, loadArticleInForm, loadArticlesAction} from "../actions/articles";
import {AppState} from "../store";
import Article, {IMAGE, Image, IMAGE_GROUP, ImageGroup, PARAGRAPH, Paragraph, TITLE, Title} from "../types/Article";
import {DOWN, UP} from "../types/actions";
import User from "../types/User";

export const loadArticlesAtPageThunk = (pageNumber: number) => (dispatch: (arg0: any) => void) => {
    getArticlesAtPage(pageNumber).then((response: ArticleResponse) => {
        dispatch(loadArticlesAction(response))
    })
};

export const loadArticleInFormThunk = (articleId: number) => (dispatch: (arg0: any) => void, getState: () => AppState) => {
    if (articleId === 0) {
        const now = new Date();
        dispatch(loadArticleInForm({
            articleId: 0,
            title: '',
            contents: [],
            createdAt: `${now.getDay()}/${now.getMonth()}/${now.getFullYear()}`,
            updatedAt: `${now.getDay()}/${now.getMonth()}/${now.getFullYear()}`,
            isVisible: false,
            author: getState().users.appUser as User
        }));
        return;
    }
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

export const changeContentInCurrentArticle = (content: Title | Paragraph | Image | ImageGroup, index: number) => (dispatch: (arg0: any) => void, getState: () => AppState) => {
    const currentArticle = getState().articles.currentArticle;
    if (!currentArticle) {
        return;
    }
    const newContents = [...currentArticle.contents];
    newContents.splice(index, 1, content);
    dispatch(changeArticleInForm({
        ...currentArticle,
        contents: newContents
    }))
};

export const changeTitleInCurrentArticle = (title: string) => (dispatch: (arg0: any) => void, getState: () => AppState) => {
    const currentArticle = getState().articles.currentArticle;
    if (!currentArticle) {
        return;
    }
    dispatch(changeArticleInForm({
        ...currentArticle,
        title
    }))
};


export const addContentInCurrentArticle = (content: Title | Paragraph | Image | ImageGroup) => (dispatch: (arg0: any) => void, getState: () => AppState) => {
    const currentArticle = getState().articles.currentArticle;
    if (!currentArticle) {
        return;
    }
    dispatch(changeArticleInForm({
        ...currentArticle,
        contents: [...currentArticle.contents, content]
    }))
};

export const addTitleArticle = () => (dispatch: (arg0: any) => void) => {
    dispatch(addContentInCurrentArticle({
        type: TITLE,
        titleText: '',
        titleVariant: 'h1'
    }))
};

export const addParagraphArticle = () => (dispatch: (arg0: any) => void) => {
    dispatch(addContentInCurrentArticle({
        type: PARAGRAPH,
        paragraphContent: ''
    }))
};

export const addImageArticle = () => (dispatch: (arg0: any) => void) => {
    dispatch(addContentInCurrentArticle({
        type: IMAGE,
        imageCaption: '',
        imageLink: '',
        imageUrl: ''
    }))
};

export const addImageGroupArticle = () => (dispatch: (arg0: any) => void) => {
    dispatch(addContentInCurrentArticle({
        type: IMAGE_GROUP,
        imageGroupTitle: '',
        images: []
    }))
};

export const moveContentInCurrentArticle = (index: number, direction: typeof UP | typeof DOWN) => (dispatch: (arg0: any) => void, getState: () => AppState) => {
    const currentArticle = getState().articles.currentArticle;
    if (!currentArticle) {
        return;
    }
    const newArticleContents = [...currentArticle.contents];
    const articleContentToMove = newArticleContents[index];
    newArticleContents.splice(index, 1);
    if (direction === UP) {
        newArticleContents.splice(index - 1, 0, articleContentToMove)
    } else {
        newArticleContents.splice(index + 1, 0, articleContentToMove)
    }
    dispatch(changeArticleInForm({
        ...currentArticle,
        contents: newArticleContents
    }))
};

export const updateUserInArticles = (user: User) => (dispatch: (arg0: any) => void, getState: () => AppState) => {
    const articlesState = getState().articles;
    const articles = articlesState.articles;
    if (!articles) {
        return;
    }
    const updatedArticles = articles.map((article: Article) => {
        if (article.author.userId === user.userId) {
            return {
                ...article,
                author: user
            }
        }
        return article
    });
    dispatch(loadArticlesAction({
        articles: updatedArticles,
        numberOfPages: articlesState.numberOfPages,
        pageNumber: articlesState.currentPage
    }))
};

export const deleteContentInCurrentArticle = (index: number) => (dispatch: (arg0: any) => void, getState: () => AppState) => {
    const currentArticle = getState().articles.currentArticle;
    if (!currentArticle) {
        return;
    }
    const newContents = [...currentArticle.contents];
    newContents.splice(index, 1);
    dispatch(changeArticleInForm({
        ...currentArticle,
        contents: newContents
    }))
};

export const changeImageInImageGroup = (image: Image, imageIndex: number, imageGroupIndex: number) => (dispatch: (arg0: any) => void, getState: () => AppState) => {
    const currentArticle = getState().articles.currentArticle;
    if (!currentArticle) {
        return;
    }
    const imageGroup = currentArticle.contents[imageGroupIndex] as ImageGroup;
    const newImages = [...imageGroup.images];
    newImages.splice(imageIndex, 1, image);
    dispatch(changeContentInCurrentArticle({
        ...imageGroup,
        images: newImages
    }, imageGroupIndex))
};

export const addImageInImageGroup = (image: Image, imageGroupIndex: number) => (dispatch: (arg0: any) => void, getState: () => AppState) => {
    const currentArticle = getState().articles.currentArticle;
    if (!currentArticle) {
        return;
    }
    const imageGroup = currentArticle.contents[imageGroupIndex] as ImageGroup;
    dispatch(changeContentInCurrentArticle({
        ...imageGroup,
        images: [...imageGroup.images, image]
    }, imageGroupIndex))
};

export const deleteImageInImageGroup = (imageIndex: number, imageGroupIndex: number) => (dispatch: (arg0: any) => void, getState: () => AppState) => {
    const currentArticle = getState().articles.currentArticle;
    if (!currentArticle) {
        return;
    }
    const imageGroup = currentArticle.contents[imageGroupIndex] as ImageGroup;
    const newImages = [...imageGroup.images];
    newImages.splice(imageIndex, 1);
    dispatch(changeContentInCurrentArticle({
        ...imageGroup,
        images: newImages
    }, imageGroupIndex))
};

export const moveImageInImageGroup = (imageIndex: number, direction: typeof UP | typeof DOWN, imageGroupIndex: number) => (dispatch: (arg0: any) => void, getState: () => AppState) => {
    const currentArticle = getState().articles.currentArticle;
    if (!currentArticle) {
        return;
    }
    const imageGroup = currentArticle.contents[imageGroupIndex] as ImageGroup;
    const newArticleContents = [...imageGroup.images];
    const articleContentToMove = newArticleContents[imageIndex];
    newArticleContents.splice(imageIndex, 1);
    if (direction === UP) {
        newArticleContents.splice(imageIndex - 1, 0, articleContentToMove)
    } else {
        newArticleContents.splice(imageIndex + 1, 0, articleContentToMove)
    }
    dispatch(changeContentInCurrentArticle({
        ...imageGroup,
        images: newArticleContents
    }, imageGroupIndex))
};