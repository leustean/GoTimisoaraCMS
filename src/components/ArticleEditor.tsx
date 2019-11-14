import {Button, Grid} from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";
import {AppState} from "../store";
import {connect} from "react-redux";
import Article, {IMAGE, Image, IMAGE_GROUP, ImageGroup, PARAGRAPH, Paragraph, TITLE, Title} from "../types/Article";
import {useParams} from "react-router-dom"
import {addContentInCurrentArticle, loadArticleInFormThunk} from "../thunks/articles";
import LoadingAnimation from "./LoadingAnimation";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import TitleEditor from "./ArticleContent/TitleEditor";
import ParagraphEditor from "./ArticleContent/ParagraphEditor";
import ImageEditor from "./ArticleContent/ImageEditor";
import ImageGroupEditor from "./ArticleContent/ImageGroupEditor";

// noinspection TypeScriptValidateJSTypes
const useStyle = makeStyles(theme => ({
    entry: {
        width: "100%",
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    newButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));

interface ArticleEditorProps {
    currentArticle: Article | null,
    dispatch: (arg0: any) => void
}

const mapObjectToComponent = (content: Title | Paragraph | Image | ImageGroup, index: number) => {
    if (content.type === TITLE) {
        return <TitleEditor title={content} position={index}/>
    }

    if (content.type === PARAGRAPH) {
        return <ParagraphEditor paragraph={content} position={index}/>
    }

    if (content.type === IMAGE) {
        return <ImageEditor image={content} position={index}/>
    }

    if (content.type === IMAGE_GROUP) {
        return <ImageGroupEditor imageGroup={content} position={index}/>
    }

    return null;
};

const ArticleEditor = ({currentArticle, dispatch}: ArticleEditorProps) => {
    const classes = useStyle();
    const {id} = useParams();
    const parsedId = parseInt(id ? id : "0");

    if (currentArticle === null || currentArticle.articleId !== parsedId) {
        dispatch(loadArticleInFormThunk(parsedId));
        return <LoadingAnimation/>
    }

    const cards = currentArticle.contents.map((content: Title | Paragraph | Image | ImageGroup, index: number) => {
        return <Grid item className={classes.entry} key={index}>
            {mapObjectToComponent(content, index)}
        </Grid>
    });

    const addTitle = () => {
        dispatch(addContentInCurrentArticle({
            type: TITLE,
            titleText: '',
            titleVariant: 'h1'
        }))
    };

    const addParagraph = () => {
        dispatch(addContentInCurrentArticle({
            type: PARAGRAPH,
            paragraphContent: ''
        }))
    };

    const addImage = () => {
        dispatch(addContentInCurrentArticle({
            type: IMAGE,
            imageCaption: '',
            imageLink: '',
            imageUrl: ''
        }))
    };

    const addImageGroup = () => {
        dispatch(addContentInCurrentArticle({
            type: IMAGE_GROUP,
            imageGroupTitle: '',
            images: []
        }))
    };

    return <Container maxWidth={"md"}>
        <Grid container direction={"column"}>
            <Grid item className={classes.entry}>
                <Card>
                    <CardContent>
                        <TextField
                            label={"Article Title"}
                            fullWidth
                            variant={"outlined"}
                            value={currentArticle.title}
                        />
                    </CardContent>
                </Card>
            </Grid>
            {cards}
            <Grid item className={classes.entry}>
                <Card>
                    <CardContent>
                        <Button
                            className={classes.newButton}
                            variant="contained"
                            component="label"
                            color={"primary"}
                            onClick={addTitle}
                        >
                            Add Title
                        </Button>
                        <Button
                            className={classes.newButton}
                            variant="contained"
                            component="label"
                            color={"primary"}
                            onClick={addParagraph}
                        >
                            Add Paragraph
                        </Button>
                        <Button
                            className={classes.newButton}
                            variant="contained"
                            component="label"
                            color={"primary"}
                            onClick={addImage}
                        >
                            Add Image
                        </Button>
                        <Button
                            className={classes.newButton}
                            variant="contained"
                            component="label"
                            color={"primary"}
                            onClick={addImageGroup}
                        >
                            Add Image Group
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Container>
};

const mapStateToProps = (state: AppState) => ({
    currentArticle: state.articles.currentArticle,
});

export default connect(mapStateToProps)(ArticleEditor);