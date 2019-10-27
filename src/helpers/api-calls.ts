import Tag from "../types/Tag";

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