import {createTag, deleteTag, getAllTags, updateTag} from "../helpers/api-calls";
import Tag from "../types/Tag";
import {
    closeTagModal,
    createNewTag,
    failTagForm,
    loadTagInForm,
    loadTags,
    openTagModal,
    submitTagForm,
    successTagForm
} from "../actions/tags";

export const loadTagsThunk = () => (dispatch: (arg0: any) => void) => {
    getAllTags().then((tags: Array<Tag>) => {
        dispatch(loadTags(tags))
    })
};

export const loadTagInModalThunk = (tag: Tag) => (dispatch: (arg0: any) => void) => {
    dispatch(loadTagInForm(tag));
    dispatch(openTagModal())
};

export const createNewTagInModalThunk = () => (dispatch: (arg0: any) => void) => {
    dispatch(createNewTag());
    dispatch(openTagModal())
};

export const saveTagThunk = (tag: Tag) => (dispatch: (arg0: any) => void) => {
    dispatch(submitTagForm());
    const upsertPromise = tag.tagId ? updateTag(tag) : createTag(tag);
    upsertPromise.then((tags: Array<Tag>) => {
        dispatch(loadTags(tags));
        dispatch(successTagForm());
        dispatch(closeTagModal());
    }).catch(() => {
        dispatch(failTagForm())
    });
};

export const deleteTagThunk = (tag: Tag) => (dispatch: (arg0: any) => void) => {
    dispatch(submitTagForm());
    deleteTag(tag).then((tags: Array<Tag>) => {
        dispatch(loadTags(tags));
        dispatch(successTagForm());
        dispatch(closeTagModal())
    }).catch(() => {
        dispatch(failTagForm())
    });
};