import React from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Title} from "../../types/Article";
import MenuItem from "@material-ui/core/MenuItem";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

    return <Card>
        <CardContent>
            <TextField
                className={classes.input}
                fullWidth
                label="Title Text"
                variant={"outlined"}
                value={title.titleText}
            />
            <TextField
                className={classes.input}
                fullWidth
                select
                label="Title Type"
                value={title.titleVariant}
                variant="outlined"
            >
                {titleVariants.map(titleVariant => (
                    <MenuItem key={titleVariant} value={titleVariant}>
                        {titleVariant}
                    </MenuItem>
                ))}
            </TextField>
        </CardContent>
    </Card>
};

export default connect()(TitleEditor);
