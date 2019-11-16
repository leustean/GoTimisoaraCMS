import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import {AppState} from "../store";
import {connect} from "react-redux";
import {closeUserModal, updateUserInForm} from "../actions/users";
import User from "../types/User";
import {deleteUserThunk, saveUserThunk} from "../thunks/users";
import makeStyles from "@material-ui/core/styles/makeStyles";

// noinspection TypeScriptValidateJSTypes
const useStyle = makeStyles(theme => ({
    input: {
        marginBottom: theme.spacing(2),
    },
}));

interface UserDialogFormProps {
    currentUser: User | null,
    isModalOpen: boolean,
    isSubmitting: boolean,
    dispatch: (arg0: any) => void,
}

const UserDialogForm = ({currentUser, isModalOpen, isSubmitting, dispatch}: UserDialogFormProps) => {
    const classes = useStyle();

    const closeModal = () => {
        if (!isSubmitting) {
            dispatch(closeUserModal())
        }
    };

    if (currentUser === null) {
        return <Dialog open={isModalOpen} onClose={closeModal}>
            <DialogContent>
                <DialogContentText>
                    No user loaded
                </DialogContentText>
            </DialogContent>
        </Dialog>
    }

    const saveUser = () => {
        dispatch(saveUserThunk(currentUser))
    };

    const deleteUser = () => {
        dispatch(deleteUserThunk(currentUser))
    };

    const updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateUserInForm({
            ...currentUser,
            username: event.target.value
        }))
    };

    const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateUserInForm({
            ...currentUser,
            email: event.target.value
        }))
    };

    const updateFullName = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateUserInForm({
            ...currentUser,
            fullName: event.target.value
        }))
    };

    const modalText = currentUser.userId ? `User ID: ${currentUser.userId}` : "New User";

    return <Dialog onClose={closeModal} open={isModalOpen}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {modalText}
            </DialogContentText>
            <TextField
                className={classes.input}
                disabled={isSubmitting}
                autoFocus
                label="User Name"
                fullWidth
                value={currentUser.username}
                onChange={updateUsername}
            />
            <TextField
                className={classes.input}
                disabled={isSubmitting}
                autoFocus
                label="Email"
                fullWidth
                value={currentUser.email}
                onChange={updateEmail}
            />
            <TextField
                className={classes.input}
                disabled={isSubmitting}
                autoFocus
                label="Full Name"
                fullWidth
                value={currentUser.fullName}
                onChange={updateFullName}
            />
        </DialogContent>
        <DialogActions>
            {!!currentUser.userId && <Button
                disabled={isSubmitting}
                variant={"contained"}
                onClick={deleteUser}
                color="secondary"
            >
                Delete
            </Button>}
            <Button
                disabled={isSubmitting}
                variant={"contained"}
                onClick={closeModal}
            >
                Cancel
            </Button>
            <Button
                disabled={isSubmitting}
                variant={"contained"}
                onClick={saveUser}
                color="primary"
            >
                Save
            </Button>
        </DialogActions>
    </Dialog>
};

const mapStateToProps = (state: AppState) => ({
    currentUser: state.users.currentUser,
    isModalOpen: state.users.isModalOpen,
    isSubmitting: state.users.isSubmitting
});

export default connect(mapStateToProps)(UserDialogForm);