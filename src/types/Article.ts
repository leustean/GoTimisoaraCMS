export default interface Article {
    articleId: number,
    author: string,
    createdAt: string,
    updatedAt: string,
    contents: [Title, Paragraph, Image, ImageGroup]
}

export interface Title {
    titleId: number,
    titleText: string,
    titleVariant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export interface Paragraph {
    paragraphId: number
    paragraphContent: string
}

export interface Image {
    imageId: number,
    imageUrl: string
    imageCaption: string
    imageLink: string
}

export interface ImageGroup {
    imageGroupId: number,
    imageGroupTitle: null | string
    images: [Image],
}