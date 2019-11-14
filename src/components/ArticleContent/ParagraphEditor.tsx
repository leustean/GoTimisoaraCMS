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
    dispatch: (arg0: any) => void
}


const ParagraphEditor = ({position, paragraph, dispatch}: ParagraphProps) => {
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

export default connect()(ParagraphEditor);
