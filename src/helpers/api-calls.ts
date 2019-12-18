import Tag from "../types/Tag";
import Article, {IMAGE, IMAGE_GROUP, PARAGRAPH, TITLE} from "../types/Article";
import User, {LoginFormUser} from "../types/User";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.trim() : null;

let getAllTagsFunction: () => Promise<Array<Tag>>, createTagFunction,
    updateTagFunction, deleteTagFunction;

let getAllUsersFunction: () => Promise<Array<User>>, createUserFunction,
    updateUserFunction, deleteUserFunction, authenticateUserFunction;

let getArticlesAtPageFunction: (pageNumber: number) => Promise<ArticleResponse>, createArticleFunction,
    updateArticleFunction, deleteArticleFunction;

if (!apiUrl) {
    let tags = [
        {tagId: 1, tagName: "Food"},
        {tagId: 2, tagName: "Movies"},
        {tagId: 3, tagName: "Places"},
        {tagId: 4, tagName: "Night Life"}
    ];

    getAllTagsFunction = async (): Promise<Array<Tag>> => {
        return new Promise(resolve => setTimeout(() => {
            resolve(tags)
        }, 500))
    };

    createTagFunction = (tagToCreate: Tag): Promise<Array<Tag>> => {
        let maxId = 0;
        tags.forEach((tag: Tag) => {
            if (tag.tagId > maxId) {
                maxId = tag.tagId;
            }
        });
        maxId += 1;
        tags = [{...tagToCreate, tagId: maxId}, ...tags];
        return new Promise(resolve => setTimeout(() => {
            resolve(tags)
        }, 500))
    };

    updateTagFunction = (tagToUpdate: Tag): Promise<Array<Tag>> => {
        tags = tags.filter((tag: Tag) => tag.tagId !== tagToUpdate.tagId);
        tags.unshift({...tagToUpdate});
        return new Promise(resolve => setTimeout(() => {
            resolve(tags)
        }, 500))
    };

    deleteTagFunction = (tagToDelete: Tag): Promise<Array<Tag>> => {
        tags = tags.filter((tag: Tag) => tag.tagId !== tagToDelete.tagId);
        return new Promise(resolve => setTimeout(() => {
            resolve(tags)
        }, 500))
    };

    let users = [
        {
            userId: 1,
            email: "author1@go-timisoara.ro",
            username: "author1",
            fullName: "Author Name 1"
        },
        {
            userId: 2,
            email: "author2@go-timisoara.ro",
            username: "author2",
            fullName: "Author Name 2"
        },
        {
            userId: 3,
            email: "author3@go-timisoara.ro",
            username: "author3",
            fullName: "Author Name 3"
        },
        {
            userId: 4,
            email: "author4@go-timisoara.ro",
            username: "author4",
            fullName: "Author Name 4"
        }
    ];

    authenticateUserFunction = (loginFormUser: LoginFormUser): Promise<User> => {
        const foundUser = users.find((user: User) => user.username === loginFormUser.username);
        return new Promise((resolve, reject) => setTimeout(() => {
            if (foundUser) {
                resolve(foundUser)
            }
            reject()
        }, 500))
    };

    getAllUsersFunction = (): Promise<Array<User>> => {
        return new Promise(resolve => setTimeout(() => {
            resolve(users)
        }, 500))
    };

    createUserFunction = (userToCreate: User): Promise<Array<User>> => {
        let maxId = 0;
        users.forEach((user: User) => {
            if (user.userId > maxId) {
                maxId = user.userId;
            }
        });
        maxId += 1;
        users = [{...userToCreate, userId: maxId}, ...users];
        return new Promise(resolve => setTimeout(() => {
            resolve(users)
        }, 500))
    };

    updateUserFunction = (userToUpdate: User): Promise<Array<User>> => {
        users = users.filter((user: User) => user.userId !== userToUpdate.userId);
        users.unshift({...userToUpdate});
        return new Promise(resolve => setTimeout(() => {
            resolve(users)
        }, 500))
    };

    deleteUserFunction = (userToDelete: User): Promise<Array<User>> => {
        users = users.filter((user: User) => user.userId !== userToDelete.userId);
        return new Promise(resolve => setTimeout(() => {
            resolve(users)
        }, 500))
    };

    let articles: Array<Article> = [
        {
            articleId: 1,
            title: "First Article",
            editorsChoice: 1,
            tag: {tagId: 3, tagName: "Places"},
            contents: [
                {
                    type: TITLE,
                    titleText: "First Title",
                    titleVariant: "h1"
                },
                {
                    type: PARAGRAPH,
                    paragraphContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget erat a ligula accumsan cursus. Aenean tincidunt, neque id dignissim bibendum, urna lectus ornare est, a venenatis eros neque vel velit. Integer vitae urna sed odio volutpat vestibulum. Duis imperdiet, justo sed iaculis volutpat, orci nisi cursus velit, ut ullamcorper dolor nisi vel dolor. Maecenas convallis neque ut mauris egestas mollis. Phasellus eget quam id nulla porttitor aliquet. Vestibulum scelerisque ex eu erat ultricies hendrerit. Proin non auctor sapien. Morbi sollicitudin ut nisl pharetra placerat. Vestibulum enim nulla, consectetur sed suscipit eget, ultrices sed metus. Phasellus condimentum diam sed augue commodo, eget iaculis magna semper. Duis ac nisi a arcu interdum scelerisque. Aenean condimentum laoreet sapien at ullamcorper. Sed ac tortor ullamcorper, aliquam enim non, laoreet enim. Fusce molestie elit quis tempor ultrices."
                },
                {
                    type: IMAGE,
                    imageUrl: "/image.jpg",
                    imageCaption: "Parcul Rozelor",
                    imageLink: "https://en.wikipedia.org/wiki/Roses_Park,_Timi%C8%99oara"
                },
                {
                    type: IMAGE_GROUP,
                    imageGroupTitle: "Image Group",
                    images: [{
                        type: IMAGE,
                        imageUrl: "/image.jpg",
                        imageCaption: "Parcul Rozelor",
                        imageLink: "https://en.wikipedia.org/wiki/Roses_Park,_Timi%C8%99oara"
                    }]
                }
            ],
            createdAt: "29/10/2019",
            updatedAt: "30/10/2019",
            isVisible: 0,
            author: {
                userId: 1,
                email: "author1@go-timisoara.ro",
                username: "author1",
                fullName: "Author Name 1"
            }
        }
    ];

    getArticlesAtPageFunction = (pageNumber: number): Promise<ArticleResponse> => {
        return new Promise(resolve => setTimeout(() => {
            resolve({
                articles,
                numberOfPages: 0,
                pageNumber: pageNumber
            });
        }, 1000))
    };

    createArticleFunction = (articleToCreate: Article): Promise<ArticleResponse> => {
        let maxId = 0;
        articles.forEach((article: Article) => {
            if (article.articleId > maxId) {
                maxId = article.articleId;
            }
        });
        maxId += 1;
        articles = [{...articleToCreate, articleId: maxId}, ...articles];
        return new Promise(resolve => setTimeout(() => {
            resolve({
                articles,
                numberOfPages: 0,
                pageNumber: 0
            })
        }, 500))
    };

    updateArticleFunction = (articleToUpdate: Article): Promise<ArticleResponse> => {
        articles = articles.filter((article: Article) => article.articleId !== articleToUpdate.articleId);
        articles.unshift({...articleToUpdate});
        return new Promise(resolve => setTimeout(() => {
            resolve({
                articles,
                numberOfPages: 0,
                pageNumber: 0
            })
        }, 500))
    };

    deleteArticleFunction = (articleToDelete: Article): Promise<ArticleResponse> => {
        articles = articles.filter((article: Article) => article.articleId !== articleToDelete.articleId);
        return new Promise(resolve => setTimeout(() => {
            resolve({
                articles,
                numberOfPages: 1,
                pageNumber: 1
            })
        }, 500))
    }

} else {
    getAllTagsFunction = async (): Promise<Array<Tag>> => {
        const response = await axios.get(apiUrl + "tag/");
        return response.data
    };

    createTagFunction = async (tag: Tag): Promise<Array<Tag>> => {
        await axios.put(apiUrl + "tag/", tag);

        return getAllTagsFunction();
    };

    updateTagFunction = async (tag: Tag): Promise<Array<Tag>> => {
        await axios.post(apiUrl + "tag/", tag);

        return getAllTagsFunction();
    };

    deleteTagFunction = async (tag: Tag): Promise<Array<Tag>> => {
        await axios.delete(apiUrl + `tag/${tag.tagId}`,);

        return getAllTagsFunction();
    };

    getAllUsersFunction = async (): Promise<Array<User>> => {
        const response = await axios.get(apiUrl + "author/");
        return response.data
    };

    createUserFunction = async (author: User): Promise<Array<User>> => {
        await axios.put(apiUrl + "author/", author);

        return getAllUsersFunction();
    };

    updateUserFunction = async (author: User): Promise<Array<User>> => {
        await axios.post(apiUrl + "author/", author);

        return getAllUsersFunction();
    };

    deleteUserFunction = async (author: User): Promise<Array<User>> => {
        await axios.delete(apiUrl + `author/${author.userId}`);

        return getAllUsersFunction();
    };

    authenticateUserFunction = async (author: LoginFormUser): Promise<User> => {
        const response = await axios.post(apiUrl + 'user/auth', author);
        return response.data.user
    };

    getArticlesAtPageFunction = async (pageNumber: number): Promise<ArticleResponse> => {
        const response = await axios.get(apiUrl + `article/pageNumber/${pageNumber}`);
        return response.data
    };

    createArticleFunction = async (article: Article, pageNumber: number): Promise<ArticleResponse> => {
        article = {
            ...article,
            tagId: article.tag ? article.tag.tagId : 0,
            authorId: article.author ? article.author.userId : 0
        };
        await axios.put(apiUrl + "article/", article);

        return getArticlesAtPageFunction(pageNumber);
    };

    updateArticleFunction = async (article: Article, pageNumber: number): Promise<ArticleResponse> => {
        article = {
            ...article,
            tagId: article.tag ? article.tag.tagId : 0,
            authorId: article.author ? article.author.userId : 0
        };
        await axios.post(apiUrl + "article/", article);

        return getArticlesAtPageFunction(pageNumber);
    };

    deleteArticleFunction = async (article: Article, pageNumber: number): Promise<ArticleResponse> => {
        article = {
            ...article,
            tagId: article.tag ? article.tag.tagId : 0,
            authorId: article.author ? article.author.userId : 0
        };
        await axios.delete(apiUrl + `article/${article.articleId}`,);

        return getArticlesAtPageFunction(pageNumber);
    };

}

export interface ArticleResponse {
    articles: Array<Article>,
    numberOfPages: number
    pageNumber: number
}


export const getAllTags = getAllTagsFunction;

export const createTag = createTagFunction;

export const updateTag = updateTagFunction;

export const deleteTag = deleteTagFunction;

export const authenticateUser = authenticateUserFunction;

export const getAllUsers = getAllUsersFunction;

export const createUser = createUserFunction;

export const updateUser = updateUserFunction;

export const deleteUser = deleteUserFunction;

export const createArticle = createArticleFunction;

export const updateArticle = updateArticleFunction;

export const deleteArticle = deleteArticleFunction;

export const getArticlesAtPage = getArticlesAtPageFunction;