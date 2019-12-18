import {Button, Grid} from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";
import {AppState} from "../store";
import {connect} from "react-redux";
import Article, {IMAGE, Image, IMAGE_GROUP, ImageGroup, PARAGRAPH, Paragraph, TITLE, Title} from "../types/Article";
import {useParams} from "react-router-dom"
import {
    addImageArticle,
    addImageGroupArticle,
    addParagraphArticle,
    addTitleArticle, changeEditorsChoiceInCurrentArticle,
    changeIsVisibleInCurrentArticle,
    changeTagInCurrentArticle,
    changeTitleInCurrentArticle,
    deleteArticleThunk,
    loadArticleInFormThunk,
    saveArticleThunk
} from "../thunks/articles";
import LoadingAnimation from "./LoadingAnimation";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import TitleEditor from "./ArticleContent/TitleEditor";
import ParagraphEditor from "./ArticleContent/ParagraphEditor";
import ImageEditor from "./ArticleContent/ImageEditor";
import ImageGroupEditor from "./ArticleContent/ImageGroupEditor";
import {green} from "@material-ui/core/colors";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArticleManagerMessage from "./ArticleManagerMessage";
import {Redirect} from "react-router-dom"
import Tag from "../types/Tag";
import {loadTagsThunk} from "../thunks/tags";

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
    },
    deleteButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.error.main
    },
    saveButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: green.A700
    },
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

interface ArticleEditorProps {
    currentArticle: Article | null,
    tags: Array<Tag> | null,
    isSubmitting: boolean,
    message: string,
    isSuccess: boolean,
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

const ArticleEditor = ({currentArticle, tags, isSubmitting, message, isSuccess, dispatch}: ArticleEditorProps) => {
    const classes = useStyle();
    const {id} = useParams();
    const parsedId = parseInt(id ? id : "0");

    if (isSuccess || (currentArticle === null && message)) {
        return <Redirect to={"/articles"}/>
    }

    if (tags === null) {
        dispatch(loadTagsThunk());
        return <LoadingAnimation/>
    }

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
        dispatch(addTitleArticle())
    };

    const addParagraph = () => {
        dispatch(addParagraphArticle())
    };

    const addImage = () => {
        dispatch(addImageArticle())
    };

    const addImageGroup = () => {
        dispatch(addImageGroupArticle())
    };

    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTitleInCurrentArticle(event.target.value))
    };

    const changeTag = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTagInCurrentArticle(Number(event.target.value)))
    };

    const changeIsVisible = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeIsVisibleInCurrentArticle(Number(event.target.value)))
    };

    const changeEditorsChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeEditorsChoiceInCurrentArticle(Number(event.target.value)))
    };

    const saveArticle = () => {
        dispatch(saveArticleThunk(currentArticle))
    };

    const deleteArticle = () => {
        dispatch(deleteArticleThunk(currentArticle))
    };

    return <Container maxWidth={"md"}>
        <Grid container direction={"column"}>
            {!!message && <Grid item className={classes.entry}>
                <Card>
                    <CardContent>
                        <ArticleManagerMessage/>
                    </CardContent>
                </Card>
            </Grid>}
            <Grid item className={classes.entry}>
                <Card>
                    <CardContent>
                        <TextField
                            disabled={isSubmitting}
                            className={classes.input}
                            label={"Article Title"}
                            fullWidth
                            variant={"outlined"}
                            value={currentArticle.title}
                            onChange={changeTitle}
                        />
                        <TextField
                            disabled={isSubmitting}
                            className={classes.input}
                            fullWidth
                            select
                            label={"Tag"}
                            value={currentArticle.tag ? currentArticle.tag.tagId : 0}
                            variant="outlined"
                            onChange={changeTag}
                        >
                            <MenuItem value={0}>
                                {"No Tag"}
                            </MenuItem>
                            {tags.map((tag:Tag) => (
                                <MenuItem key={tag.tagId} value={tag.tagId}>
                                    {tag.tagName}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            disabled={isSubmitting}
                            className={classes.input}
                            fullWidth
                            select
                            label={"Is Visible"}
                            value={currentArticle.isVisible}
                            variant="outlined"
                            onChange={changeIsVisible}
                        >
                            <MenuItem value={1}>
                                Visible
                            </MenuItem>
                            <MenuItem value={0}>
                                Hidden
                            </MenuItem>
                        </TextField>
                        <TextField
                            disabled={isSubmitting}
                            className={classes.input}
                            fullWidth
                            select
                            label={"Editor's Choice"}
                            value={currentArticle.editorsChoice}
                            variant="outlined"
                            onChange={changeEditorsChoice}
                        >
                            <MenuItem value={1}>
                                Yes
                            </MenuItem>
                            <MenuItem value={0}>
                                No
                            </MenuItem>
                        </TextField>
                    </CardContent>
                </Card>
            </Grid>
            {cards}
            <Grid item className={classes.entry}>
                <Card>
                    <CardContent>
                        <Button
                            disabled={isSubmitting}
                            className={classes.newButton}
                            variant="contained"
                            component="label"
                            color={"primary"}
                            onClick={addTitle}
                        >
                            Add Title
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            className={classes.newButton}
                            variant="contained"
                            component="label"
                            color={"primary"}
                            onClick={addParagraph}
                        >
                            Add Paragraph
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            className={classes.newButton}
                            variant="contained"
                            component="label"
                            color={"primary"}
                            onClick={addImage}
                        >
                            Add Image
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            className={classes.newButton}
                            variant="contained"
                            component="label"
                            color={"primary"}
                            onClick={addImageGroup}
                        >
                            Add Image Group
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            className={classes.saveButton}
                            variant="contained"
                            component="label"
                            onClick={saveArticle}
                        >
                            {isSubmitting ? <CircularProgress size={24}/> : "Save"}
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            className={classes.deleteButton}
                            variant="contained"
                            component="label"
                            onClick={deleteArticle}
                        >
                            Delete
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            {!!message && <Grid item className={classes.entry}>
                <Card>
                    <CardContent>
                        <ArticleManagerMessage/>
                    </CardContent>
                </Card>
            </Grid>}
        </Grid>
    </Container>
};

const mapStateToProps = (state: AppState) => ({
    currentArticle: state.articles.currentArticle,
    tags: state.tags.tags,
    isSubmitting: state.articles.isSubmitting,
    message: state.articles.message,
    isSuccess: state.articles.isSuccess
});

export default connect(mapStateToProps)(ArticleEditor);