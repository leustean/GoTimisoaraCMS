import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Tag from "../types/Tag";
import {AppState} from "../store"
import {connect} from "react-redux";
import TagDialogForm from "./TagDialogForm";
import LoadingAnimation from "./LoadingAnimation";
import {createNewTagInModalThunk, loadTagInModalThunk, loadTagsThunk} from "../thunks/tags";
import Button from "@material-ui/core/Button";
import TagManagerMessage from "./TagManagerMessage";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    tagsSearchField: {
        maxWidth: 500,
    },
    tag: {
        margin: theme.spacing(1)
    },
    newButton: {
        height: 55,
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));


interface TagsManagerProps {
    tags: Array<Tag> | null,
    message: string,
    dispatch: (arg0: any) => void,
}

const TagsManager = ({tags, message, dispatch}: TagsManagerProps) => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState("");

    const loadTag = (tag: Tag) => () => {
        dispatch(loadTagInModalThunk(tag))
    };

    const createTag = () => {
        dispatch(createNewTagInModalThunk());
    };

    if (tags === null) {
        dispatch(loadTagsThunk());
        return <LoadingAnimation/>
    }

    const tagsToShow = tags
        .filter(tag => !searchTerm || tag.tagName.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase()))
        .map(tag => {
            return <Grid item key={tag.tagId} className={classes.tag}>
                <Chip
                    color="primary"
                    clickable
                    avatar={<Avatar>{tag.tagName.charAt(0)}</Avatar>}
                    label={tag.tagName}
                    onClick={loadTag(tag)}
                />
            </Grid>
        });

    return <Grid container direction={"column"}>
        <Grid item container justify={"center"} alignItems={"flex-end"}>
            <Grid item className={classes.tagsSearchField} xs>
                <TextField
                    label="Search Tags"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </Grid>
            <Grid item>
                <Button
                    variant={"contained"}
                    color="primary"
                    className={classes.newButton}
                    onClick={createTag}
                >
                    New Tag
                </Button>
            </Grid>
        </Grid>
        <Grid item xs>
            {message && <TagManagerMessage/>}
        </Grid>
        <Grid item container>
            {tagsToShow}
        </Grid>
        <TagDialogForm/>
    </Grid>
};

const mapStateToProps = (state: AppState) => ({
    tags: state.tags.tags,
    message: state.tags.message
});

export default connect(mapStateToProps)(TagsManager);