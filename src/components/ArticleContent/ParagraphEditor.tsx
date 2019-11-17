import React from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Paragraph} from "../../types/Article";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PositionButtons from "./ActionButtons";
import {changeContentInCurrentArticle} from "../../thunks/articles";
import CardActions from "@material-ui/core/CardActions";
import {AppState} from "../../store";

// noinspection TypeScriptValidateJSTypes
const useStyle = makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

interface ParagraphProps {
    position: number,
    paragraph: Paragraph,
    dispatch: (arg0: any) => void,
    isSubmitting: boolean
}


const ParagraphEditor = ({position, paragraph, isSubmitting, dispatch}: ParagraphProps) => {
    const classes = useStyle();

    const changeParagraph = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeContentInCurrentArticle({
            ...paragraph,
            paragraphContent: event.target.value
        }, position))
    };

    return <Card>
        <CardContent>
            <TextField
                disabled={isSubmitting}
                className={classes.input}
                fullWidth
                label="Paragraph Text"
                variant={"outlined"}
                multiline
                value={paragraph.paragraphContent}
                onChange={changeParagraph}
            />
        </CardContent>
        <CardActions>
            <PositionButtons position={position}/>
        </CardActions>
    </Card>
};

const mapStateToProps = (state: AppState) => ({
    isSubmitting: state.articles.isSubmitting
});

export default connect(mapStateToProps)(ParagraphEditor);
