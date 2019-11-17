import React from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Image} from "../../types/Article";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";
import PositionButtons from "./ActionButtons";
import {changeContentInCurrentArticle, changeImageInImageGroup} from "../../thunks/articles";
import CardActions from "@material-ui/core/CardActions";
import {AppState} from "../../store";

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
    parentPosition?: number | null,
    isSubmitting: boolean
}


const ImageEditor = ({position, image, dispatch, isSubmitting, parentPosition = null}: ImageProps) => {
    const classes = useStyle();

    let changeCaption, changeLink, changeImage;

    if (parentPosition !== null) {
        changeCaption = (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(changeImageInImageGroup({
                ...image,
                imageCaption: event.target.value
            }, position, parentPosition))
        };

        changeLink = (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(changeImageInImageGroup({
                ...image,
                imageLink: event.target.value
            }, position, parentPosition))
        };


        changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files !== null && event.target.files[0] !== undefined) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        dispatch(changeImageInImageGroup({
                            ...image,
                            imageUrl: reader.result as string
                        }, position, parentPosition))
                    }
                };
                reader.readAsDataURL(event.target.files[0] as Blob);
            }
        };
    } else {
        changeCaption = (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(changeContentInCurrentArticle({
                ...image,
                imageCaption: event.target.value
            }, position))
        };

        changeLink = (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(changeContentInCurrentArticle({
                ...image,
                imageLink: event.target.value
            }, position))
        };


        changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files !== null && event.target.files[0] !== undefined) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        dispatch(changeContentInCurrentArticle({
                            ...image,
                            imageUrl: reader.result as string
                        }, position))
                    }
                };
                reader.readAsDataURL(event.target.files[0] as Blob);
            }
        };
    }


    return <Card>
        <CardContent>
            {image.imageUrl !== '' && <img className={classes.image} alt={image.imageCaption} src={image.imageUrl}/>}
            <Button
                disabled={isSubmitting}
                className={classes.input}
                variant="contained"
                component="label"
                color={"primary"}
            >
                Upload Image
                <input
                    disabled={isSubmitting}
                    onChange={changeImage}
                    type="file"
                    style={{display: "none"}}
                />
            </Button>
            <TextField
                disabled={isSubmitting}
                onChange={changeCaption}
                className={classes.input}
                fullWidth
                label="Image Caption"
                variant={"outlined"}
                multiline
                value={image.imageCaption}
            />
            <TextField
                disabled={isSubmitting}
                onChange={changeLink}
                className={classes.input}
                fullWidth
                label="Image Link"
                variant={"outlined"}
                multiline
                value={image.imageLink}
            />
        </CardContent>
        <CardActions>
            <PositionButtons position={position} parentPosition={parentPosition}/>
        </CardActions>
    </Card>
};

const mapStateToProps = (state: AppState) => ({
    isSubmitting: state.articles.isSubmitting
});

export default connect(mapStateToProps)(ImageEditor);
