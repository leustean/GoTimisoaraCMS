import React from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Image} from "../../types/Article";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";

// noinspection TypeScriptValidateJSTypes
const useStyle = makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    image: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: "100%",
        height: "auto"
    }
}));

interface ImageProps {
    position: number,
    image: Image,
    dispatch: (arg0: any) => void
}


const ImageEditor = ({position, image, dispatch}: ImageProps) => {
    const classes = useStyle();

    return <Card>
        <CardContent>
            <img className={classes.image} alt={image.imageCaption} src={image.imageUrl}/>
            <Button
                className={classes.input}
                variant="contained"
                component="label"
            >
                Upload Image
                <input
                    type="file"
                    style={{display: "none"}}
                />
            </Button>
            <TextField
                className={classes.input}
                fullWidth
                label="Image Caption"
                variant={"outlined"}
                multiline
                value={image.imageCaption}
            />
            <TextField
                className={classes.input}
                fullWidth
                label="Image Link"
                variant={"outlined"}
                multiline
                value={image.imageLink}
            />
        </CardContent>
    </Card>
};

export default connect()(ImageEditor);
