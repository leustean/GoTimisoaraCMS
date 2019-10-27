// @ts-ignore
import Tag from "../types/Tag";
import {
    CHANGE_TAG_IN_FORM,
    CLOSE_TAG_MODAL,
    CREATE_NEW_TAG, FAIL_SUBMIT_TAG_FORM,
    LOAD_TAG_IN_FORM,
    LOAD_TAGS,
    OPEN_TAG_MODAL, SUBMIT_TAG_FORM, SUCCESS_SUBMIT_TAG_FORM
} from "../types/actions";

export function loadTags(tags: Array<Tag>) {
    return {
        type: LOAD_TAGS,
        tags
    }
}

export function loadTagInForm(tag: Tag) {
    return {
        type: LOAD_TAG_IN_FORM,
        tag
    }
}

export function closeTagModal() {
    return {
        type: CLOSE_TAG_MODAL
    }
}

export function openTagModal() {
    return {
        type: OPEN_TAG_MODAL
    }
}

export function updateTagInForm(tag: Tag) {
    return {
        type: CHANGE_TAG_IN_FORM,
        tag
    }
}

export function createNewTag() {
    return {
        type: CREATE_NEW_TAG
    }
}

export function submitTagForm() {
    return {
        type: SUBMIT_TAG_FORM
    }
}

export function successTagForm() {
    return {
        type: SUCCESS_SUBMIT_TAG_FORM
    }
}

export function failTagForm() {
    return {
        type: FAIL_SUBMIT_TAG_FORM
    }
}