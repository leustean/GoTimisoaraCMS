import React from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Image, ImageGroup} from "../../types/Article";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";
import ImageEditor from "./ImageEditor";
import PositionButtons from "./PositionButtons";

// noinspection TypeScriptValidateJSTypes
const useStyle = makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

interface ImageGroupProps {
    position: number,
    imageGroup: ImageGroup,
    dispatch: (arg0: any) => void
}


const ImageGroupEditor = ({position, imageGroup, dispatch}: ImageGroupProps) => {
    const classes = useStyle();

    const images = imageGroup.images.map((image: Image, index: number) => {
        return <ImageEditor key={index} position={index} image={image}/>
    });

    return <Card>
        <CardContent>
            <PositionButtons position={position}/>
            <TextField
                className={classes.input}
                fullWidth
                label="Image Group Title"
                variant={"outlined"}
                multiline
                value={imageGroup.imageGroupTitle}
            />
            <Button
                className={classes.input}
                variant="contained"
                color={"primary"}
            >
                Add image
            </Button>
            {images}
        </CardContent>
    </Card>
};

export default connect()(ImageGroupEditor);
