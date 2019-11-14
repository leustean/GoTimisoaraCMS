import React from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {IMAGE, Image, ImageGroup} from "../../types/Article";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";
import ImageEditor from "./ImageEditor";
import PositionButtons from "./ActionButtons";
import {addImageInImageGroup, changeContentInCurrentArticle} from "../../thunks/articles";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";

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
        return <ImageEditor key={index} position={index} image={image} parentPosition={position}/>
    });

    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeContentInCurrentArticle({
            ...imageGroup,
            imageGroupTitle: event.target.value
        }, position))
    };

    const addImage = () => {
        dispatch(addImageInImageGroup({
            type: IMAGE,
            imageLink: '',
            imageCaption: '',
            imageUrl: ''
        }, position))
    };

    return <Card>
        <CardContent>
            <TextField
                className={classes.input}
                fullWidth
                label="Image Group Title"
                variant={"outlined"}
                multiline
                value={imageGroup.imageGroupTitle}
                onChange={changeTitle}
            />
            {images}
        </CardContent>
        <CardActions>
            <Grid container justify={"space-between"}>
                <Grid item>
                    <Button
                        variant="contained"
                        component="label"
                        color={"primary"}
                        onClick={addImage}
                    >
                        Add Image
                    </Button>
                </Grid>
                <Grid item>
                    <PositionButtons position={position}/>
                </Grid>
            </Grid>
        </CardActions>
    </Card>
};

export default connect()(ImageGroupEditor);
