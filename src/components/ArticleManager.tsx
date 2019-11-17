import React from "react";
import {AppState} from "../store";
import {connect} from "react-redux";
import Article from "../types/Article";
import {Grid} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArticlePagination from "./ArticlePagination";
import LoadingAnimation from "./LoadingAnimation";
import {loadArticlesAtPageThunk} from "../thunks/articles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";
import ArticleManagerMessage from "./ArticleManagerMessage";
import {clearArticleForm, loadArticleInForm} from "../actions/articles";

// noinspection TypeScriptValidateJSTypes
const useStyle = makeStyles(theme => ({
    item: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    articleCard: {
        margin: theme.spacing(2)
    }
}));

interface ArticleManagerProps {
    articles: Array<Article> | null,
    message: string,
    dispatch: (arg0: any) => void
}

const ArticleManager = ({articles, message, dispatch}: ArticleManagerProps) => {
    const classes = useStyle();

    if (articles === null) {
        dispatch(loadArticlesAtPageThunk(1));
        return <LoadingAnimation/>
    }

    const articleComponents = articles.map((article: Article) => {
        return <Grid item key={article.articleId} className={classes.articleCard}>
            <Card>
                <CardContent>
                    <Typography variant={"h3"}>
                        {article.title}
                    </Typography>
                    <Typography variant={"h4"}>
                        {article.author.username}
                    </Typography>
                    <Typography variant={"h5"}>
                        {article.updatedAt}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container justify={"flex-end"}>
                        <Grid item>
                            <Button
                                color={"primary"}
                                variant={"contained"}
                                size="large"
                                onClick={() => {
                                    dispatch(loadArticleInForm(article))
                                }}
                                component={Link}
                                to={`/article/${article.articleId}`}
                            >
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    });

    return <Grid container direction={"column"}>
        {!!message && <Grid item className={classes.item}>
            <Card>
                <CardContent>
                    <ArticleManagerMessage/>
                </CardContent>
            </Card>
        </Grid>}
        <Grid item container justify={"center"} className={classes.item}>
            <Grid item>
                <ButtonGroup variant="contained" size="large">
                    <ArticlePagination/>
                    <Button color={"primary"} component={Link} to={"/article/0"} onClick={() => {
                        dispatch(clearArticleForm())
                    }}>
                        Create New
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
        <Grid item container className={classes.item}>
            {articleComponents}
        </Grid>
    </Grid>
};

const mapStateToProps = (state: AppState) => ({
    articles: state.articles.articles,
    message: state.articles.message
});

export default connect(mapStateToProps)(ArticleManager);