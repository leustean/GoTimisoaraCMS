import React from "react";
import {connect} from "react-redux";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {DOWN, UP} from "../../types/actions";
import {AppState} from "../../store";
import Article, {ImageGroup} from "../../types/Article";
import {
    deleteContentInCurrentArticle,
    deleteImageInImageGroup,
    moveContentInCurrentArticle, moveImageInImageGroup
} from "../../thunks/articles";

// noinspection TypeScriptValidateJSTypes
const useStyle = makeStyles(theme => ({
    directionButton: {
        marginLeft: theme.spacing(2),
    },
    deleteButton: {
        backgroundColor: theme.palette.error.main
    }
}));

interface PositionButtonsProps {
    currentArticle: Article | null,
    position: number,
    parentPosition?: number | null
    dispatch: (arg0: any) => void,
    isSubmitting: boolean
}


const ActionButtons = ({position, dispatch, currentArticle, isSubmitting, parentPosition = null}: PositionButtonsProps) => {
    const classes = useStyle();

    if (!currentArticle) {
        return null;
    }

    let deleteContent, moveUp, moveDown, arrayToCheck;
    if (parentPosition !== null) {
        arrayToCheck = (currentArticle.contents[parentPosition] as ImageGroup).images;

        moveUp = () => {
            dispatch(moveImageInImageGroup(position, UP, parentPosition))
        };

        moveDown = () => {
            dispatch(moveImageInImageGroup(position, DOWN, parentPosition))
        };

        deleteContent = () => {
            dispatch(deleteImageInImageGroup(position, parentPosition))
        }
    } else {
        arrayToCheck = currentArticle.contents;

        moveUp = () => {
            dispatch(moveContentInCurrentArticle(position, UP))
        };

        moveDown = () => {
            dispatch(moveContentInCurrentArticle(position, DOWN))
        };

        deleteContent = () => {
            dispatch(deleteContentInCurrentArticle(position))
        }
    }


    return <Grid container justify={"flex-end"}>
        <Grid item>
            <Button
                disabled={isSubmitting}
                className={classes.deleteButton}
                variant="contained"
                onClick={deleteContent}
            >
                <DeleteIcon/>
            </Button>
        </Grid>

        {position !== 0 && <Grid item className={classes.directionButton}>
            <Button
                disabled={isSubmitting}
                variant="contained"
                color={"primary"}
                onClick={moveUp}
            >
                <ExpandLessIcon/>
            </Button>
        </Grid>}
        {arrayToCheck.length !== (position + 1) && <Grid item className={classes.directionButton}>
            <Button
                disabled={isSubmitting}
                variant="contained"
                color={"primary"}
                onClick={moveDown}
            >
                <ExpandMoreIcon/>
            </Button>
        </Grid>}
    </Grid>
};

const mapStateToProps = (state: AppState) => ({
    currentArticle: state.articles.currentArticle,
    isSubmitting: state.articles.isSubmitting
});

export default connect(mapStateToProps)(ActionButtons);
