import {createUser, deleteUser, getAllUsers, updateUser} from "../helpers/api-calls";
import User from "../types/User";
import {
    closeUserModal,
    createNewUser,
    failUserForm,
    loadUserInForm,
    loadUsers,
    openUserModal,
    submitUserForm,
    successUserForm
} from "../actions/users";
import {updateUserInArticles} from "./articles";

export const loadUsersThunk = () => (dispatch: (arg0: any) => void) => {
    getAllUsers().then((users: Array<User>) => {
        dispatch(loadUsers(users))
    })
};

export const loadUserInModalThunk = (user: User) => (dispatch: (arg0: any) => void) => {
    dispatch(loadUserInForm(user));
    dispatch(openUserModal())
};

export const createNewUserInModalThunk = () => (dispatch: (arg0: any) => void) => {
    dispatch(createNewUser());
    dispatch(openUserModal())
};

export const saveUserThunk = (user: User) => (dispatch: (arg0: any) => void) => {
    dispatch(submitUserForm());
    const upsertPromise = user.userId ? updateUser(user) : createUser(user);
    upsertPromise.then((users: Array<User>) => {
        dispatch(loadUsers(users));
        dispatch(successUserForm());
        dispatch(closeUserModal());
        dispatch(updateUserInArticles(user));
    }).catch(() => {
        dispatch(failUserForm())
    });
};

export const deleteUserThunk = (user: User) => (dispatch: (arg0: any) => void) => {
    dispatch(submitUserForm());
    deleteUser(user).then((users: Array<User>) => {
        dispatch(loadUsers(users));
        dispatch(successUserForm());
        dispatch(closeUserModal())
    }).catch(() => {
        dispatch(failUserForm())
    });
};