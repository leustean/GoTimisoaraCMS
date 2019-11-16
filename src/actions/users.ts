import User from "../types/User";
import {
    CHANGE_USER_IN_FORM,
    CLOSE_USER_MODAL,
    CREATE_NEW_USER, FAIL_SUBMIT_USER_FORM,
    LOAD_USER_IN_FORM,
    LOAD_USERS,
    OPEN_USER_MODAL, SUBMIT_USER_FORM, SUCCESS_SUBMIT_USER_FORM
} from "../types/actions";

export function loadUsers(users: Array<User>) {
    return {
        type: LOAD_USERS,
        users
    }
}

export function loadUserInForm(user: User) {
    return {
        type: LOAD_USER_IN_FORM,
        user
    }
}

export function closeUserModal() {
    return {
        type: CLOSE_USER_MODAL
    }
}

export function openUserModal() {
    return {
        type: OPEN_USER_MODAL
    }
}

export function updateUserInForm(user: User) {
    return {
        type: CHANGE_USER_IN_FORM,
        user
    }
}

export function createNewUser() {
    return {
        type: CREATE_NEW_USER
    }
}

export function submitUserForm() {
    return {
        type: SUBMIT_USER_FORM
    }
}

export function successUserForm() {
    return {
        type: SUCCESS_SUBMIT_USER_FORM
    }
}

export function failUserForm() {
    return {
        type: FAIL_SUBMIT_USER_FORM
    }
}