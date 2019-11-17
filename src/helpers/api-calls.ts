import Tag from "../types/Tag";
import Article, {IMAGE, IMAGE_GROUP, PARAGRAPH, TITLE} from "../types/Article";
import User, {LoginFormUser} from "../types/User";

let tags = [
    {tagId: 1, tagName: "Food"},
    {tagId: 2, tagName: "Movies"},
    {tagId: 3, tagName: "Places"},
    {tagId: 4, tagName: "Night Life"}
];

export function getAllTags(): Promise<Array<Tag>> {
    return new Promise(resolve => setTimeout(() => {
        resolve(tags)
    }, 500))
}

export function createTag(tagToCreate: Tag): Promise<Array<Tag>> {
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
}

export function updateTag(tagToUpdate: Tag): Promise<Array<Tag>> {
    tags = tags.filter((tag: Tag) => tag.tagId !== tagToUpdate.tagId);
    tags.unshift({...tagToUpdate});
    return new Promise(resolve => setTimeout(() => {
        resolve(tags)
    }, 500))
}

export function deleteTag(tagToDelete: Tag): Promise<Array<Tag>> {
    tags = tags.filter((tag: Tag) => tag.tagId !== tagToDelete.tagId);
    return new Promise(resolve => setTimeout(() => {
        resolve(tags)
    }, 500))
}

export interface ArticleResponse {
    articles: Array<Article>,
    numberOfPages: number
    pageNumber: number
}

let articles: Array<Article> = [
    {
        articleId: 1,
        title: "First Article",
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
        isVisible: false,
        author: {
            userId: 1,
            email: "author1@go-timisoara.ro",
            username: "author1",
            fullName: "Author Name 1"
        }
    }
];

export function getArticlesAtPage(pageNumber: number): Promise<ArticleResponse> {
    return new Promise(resolve => setTimeout(() => {
        resolve({
            articles,
            numberOfPages: 1,
            pageNumber: pageNumber
        });
    }, 1000))
}

export function createArticle(articleToCreate: Article): Promise<Array<Article>> {
    let maxId = 0;
    articles.forEach((article: Article) => {
        if (article.articleId > maxId) {
            maxId = article.articleId;
        }
    });
    maxId += 1;
    articles = [{...articleToCreate, articleId: maxId}, ...articles];
    return new Promise(resolve => setTimeout(() => {
        resolve(articles)
    }, 500))
}

export function updateArticle(articleToUpdate: Article): Promise<Array<Article>> {
    articles = articles.filter((article: Article) => article.articleId !== articleToUpdate.articleId);
    articles.unshift({...articleToUpdate});
    return new Promise(resolve => setTimeout(() => {
        resolve(articles)
    }, 500))
}

export function deleteArticle(articleToDelete: Article): Promise<Array<Article>> {
    articles = articles.filter((article: Article) => article.articleId !== articleToDelete.articleId);
    return new Promise(resolve => setTimeout(() => {
        resolve(articles)
    }, 500))
}

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

export function authenticateUser(loginFormUser: LoginFormUser): Promise<User> {
    const foundUser = users.find((user: User) => user.username === loginFormUser.username);
    return new Promise((resolve, reject) => setTimeout(() => {
        if (foundUser) {
            resolve(foundUser)
        }
        reject()
    }, 500))
}

export function getAllUsers(): Promise<Array<User>> {
    return new Promise(resolve => setTimeout(() => {
        resolve(users)
    }, 500))
}

export function createUser(userToCreate: User): Promise<Array<User>> {
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
}

export function updateUser(userToUpdate: User): Promise<Array<User>> {
    users = users.filter((user: User) => user.userId !== userToUpdate.userId);
    users.unshift({...userToUpdate});
    return new Promise(resolve => setTimeout(() => {
        resolve(users)
    }, 500))
}

export function deleteUser(userToDelete: User): Promise<Array<User>> {
    users = users.filter((user: User) => user.userId !== userToDelete.userId);
    return new Promise(resolve => setTimeout(() => {
        resolve(users)
    }, 500))
}