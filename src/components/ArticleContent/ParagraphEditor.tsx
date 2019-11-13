import React from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Paragraph} from "../../types/Article";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PositionButtons from "./PositionButtons";

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

    return <Card>
        <CardContent>
            <PositionButtons position={position}/>
            <TextField
                className={classes.input}
                fullWidth
                label="Paragraph Text"
                variant={"outlined"}
                multiline
                value={paragraph.paragraphContent}
            />
        </CardContent>
    </Card>
};

export default connect()(ParagraphEditor);
