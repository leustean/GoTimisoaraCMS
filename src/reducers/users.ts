import User from "../types/User";
import {
    CHANGE_USER_IN_FORM,
    CLOSE_USER_MODAL,
    CREATE_NEW_USER, FAIL_SUBMIT_USER_FORM,
    LOAD_USER_IN_FORM,
    LOAD_USERS,
    OPEN_USER_MODAL, SUBMIT_USER_FORM, SUCCESS_SUBMIT_USER_FORM,
    UserTypes
} from "../types/actions";

export interface UsersState {
    appUser: User | null
    users: Array<User> | null,
    currentUser: User | null,
    isSubmitting: boolean,
    isSuccess: boolean,
    message: string,
    isModalOpen: boolean
}

const initialState: UsersState = {
    appUser: null,
    users: null,
    currentUser: null,
    isSubmitting: false,
    isSuccess: false,
    message: "",
    isModalOpen: false
};

export default function usersReducer(state = initialState, action: UserTypes) {
    switch (action.type) {
        case LOAD_USERS:
            return {
                ...state,
                users: action.users
            };
        case LOAD_USER_IN_FORM:
            return {
                ...state,
                currentUser: action.user
            };
        case OPEN_USER_MODAL:
            return {
                ...state,
                isModalOpen: true
            };
        case CLOSE_USER_MODAL:
            return {
                ...state,
                isModalOpen: false
            };
        case CREATE_NEW_USER:
            return {
                ...state,
                currentUser: {
                    userId: 0,
                    username: "",
                    email: "",
                    fullName: ""
                }
            };
        case CHANGE_USER_IN_FORM:
            return {
                ...state,
                currentUser: {
                    ...action.user
                }
            };
        case SUBMIT_USER_FORM:
            return {
                ...state,
                isSubmitting: true,
            };
        case SUCCESS_SUBMIT_USER_FORM:
            return {
                ...state,
                isSubmitting: false,
                isSuccess: true,
                message: "Operation successful"
            };
        case FAIL_SUBMIT_USER_FORM:
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