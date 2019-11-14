import React from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Title, TitleVariant} from "../../types/Article";
import MenuItem from "@material-ui/core/MenuItem";
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

interface TitleProps {
    position: number,
    title: Title,
    dispatch: (arg0: any) => void
}

const titleVariants = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
];

const TitleEditor = ({position, title, dispatch}: TitleProps) => {
    const classes = useStyle();

    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeContentInCurrentArticle({
            ...title,
            titleText: event.target.value
        }, position))
    };

    const changeTitleVariant = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeContentInCurrentArticle({
            ...title,
            titleVariant: event.target.value as TitleVariant
        }, position))
    };

    return <Card>
        <CardContent>
            <TextField
                className={classes.input}
                fullWidth
                label="Title Text"
                variant={"outlined"}
                value={title.titleText}
                onChange={changeTitle}
            />
            <TextField
                className={classes.input}
                fullWidth
                select
                label="Title Type"
                value={title.titleVariant}
                variant="outlined"
                onChange={changeTitleVariant}
            >
                {titleVariants.map(titleVariant => (
                    <MenuItem key={titleVariant} value={titleVariant}>
                        {titleVariant}
                    </MenuItem>
                ))}
            </TextField>
        </CardContent>
        <CardActions>
            <PositionButtons position={position}/>
        </CardActions>
    </Card>
};

export default connect()(TitleEditor);
