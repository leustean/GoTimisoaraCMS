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
import {closeTagModal, updateTagInForm} from "../actions/tags";
import Tag from "../types/Tag";
import {deleteTagThunk, saveTagThunk} from "../thunks/tags";

interface TagDialogFormProps {
    currentTag: Tag | null,
    isModalOpen: boolean,
    isSubmitting: boolean,
    dispatch: (arg0: any) => void,
}

const TagDialogForm = ({currentTag, isModalOpen, isSubmitting, dispatch}: TagDialogFormProps) => {
    const closeModal = () => {
        if (!isSubmitting) {
            dispatch(closeTagModal())
        }
    };

    if (currentTag === null) {
        return <Dialog open={isModalOpen} onClose={closeModal}>
            <DialogContent>
                <DialogContentText>
                    No tag loaded
                </DialogContentText>
            </DialogContent>
        </Dialog>
    }

    const saveTag = () => {
        dispatch(saveTagThunk(currentTag))
    };

    const deleteTag = () => {
        dispatch(deleteTagThunk(currentTag))
    };

    const updateTag = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTagInForm({
            ...currentTag,
            tagName: event.currentTarget.value
        }))
    };

    const modalText = currentTag.tagId ? `Tag ID: ${currentTag.tagId}` : "New Tag";

    return <Dialog onClose={closeModal} open={isModalOpen}>
        <DialogTitle>Edit Tag</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {modalText}
            </DialogContentText>
            <TextField
                disabled={isSubmitting}
                autoFocus
                label="Tag Name"
                fullWidth
                value={currentTag.tagName}
                onChange={updateTag}
            />
        </DialogContent>
        <DialogActions>
            {!!currentTag.tagId && <Button
                disabled={isSubmitting}
                variant={"contained"}
                onClick={deleteTag}
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
                onClick={saveTag}
                color="primary"
            >
                Save
            </Button>
        </DialogActions>
    </Dialog>
};

const mapStateToProps = (state: AppState) => ({
    currentTag: state.tags.currentTag,
    isModalOpen: state.tags.isModalOpen,
    isSubmitting: state.tags.isSubmitting
});

export default connect(mapStateToProps)(TagDialogForm);