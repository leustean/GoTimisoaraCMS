// @ts-ignore
import Tag from "../types/Tag";
import {
    CHANGE_TAG_IN_FORM,
    CLOSE_TAG_MODAL,
    CREATE_NEW_TAG, FAIL_SUBMIT_TAG_FORM,
    LOAD_TAG_IN_FORM,
    LOAD_TAGS,
    OPEN_TAG_MODAL, SUBMIT_TAG_FORM, SUCCESS_SUBMIT_TAG_FORM,
    TagTypes
} from "../types/actions";

export interface TagsState {
    tags: Array<Tag> | null,
    currentTag: Tag | null,
    isSubmitting: boolean,
    isSuccess: boolean,
    message: string,
    isModalOpen: boolean
}

const initialState: TagsState = {
    tags: null,
    currentTag: null,
    isSubmitting: false,
    isSuccess: false,
    message: "",
    isModalOpen: false
};

export default function tagsReducer(state = initialState, action: TagTypes) {
    switch (action.type) {
        case LOAD_TAGS:
            return {
                ...state,
                tags: action.tags
            };
        case LOAD_TAG_IN_FORM:
            return {
                ...state,
                currentTag: action.tag
            };
        case OPEN_TAG_MODAL:
            return {
                ...state,
                isModalOpen: true
            };
        case CLOSE_TAG_MODAL:
            return {
                ...state,
                isModalOpen: false
            };
        case CREATE_NEW_TAG:
            return {
                ...state,
                currentTag: {
                    tagId: 0,
                    tagName: ""
                }
            };
        case CHANGE_TAG_IN_FORM:
            return {
                ...state,
                currentTag: {
                    ...action.tag
                }
            };
        case SUBMIT_TAG_FORM:
            return {
                ...state,
                isSubmitting: true,
            };
        case SUCCESS_SUBMIT_TAG_FORM:
            return {
                ...state,
                isSubmitting: false,
                isSuccess: true,
                message: "Operation successful"
            };
        case FAIL_SUBMIT_TAG_FORM:
            return {
                ...state,
                isSubmitting: false,
                isSuccess: false,
                message: "Operation failed"
            };
        default:
            return state
    }
}