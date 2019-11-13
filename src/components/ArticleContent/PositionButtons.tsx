import React from "react";
import {connect} from "react-redux";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {moveArticleContent} from "../../actions/articles";
import {DOWN, UP} from "../../types/actions";
import {AppState} from "../../store";
import Article from "../../types/Article";

const useStyle = makeStyles(theme => ({
    leftButton: {
        marginRight: theme.spacing(2),
    }
}));

interface PositionButtonsProps {
    currentArticle: Article,
    position: number,
    dispatch: (arg0: any) => void
}


const PositionButtons = ({position, dispatch, currentArticle}: PositionButtonsProps) => {
    const classes = useStyle();

    const moveUp = () => {
        dispatch(moveArticleContent(position, UP))
    };

    const moveDown = () => {
        dispatch(moveArticleContent(position, DOWN))
    };

    return <Grid container justify={"flex-end"}>
        {position !== 0 && <Grid item className={classes.leftButton}>
            <Button
                variant="contained"
                color={"primary"}
                onClick={moveUp}
            >
                <ExpandLessIcon/>
            </Button>
        </Grid>}
        {currentArticle.contents.length !== (position + 1) && <Grid item>
            <Button
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
});

export default connect(mapStateToProps)(PositionButtons);
