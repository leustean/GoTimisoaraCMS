import Button from "@material-ui/core/Button";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React from "react";
import {AppState} from "../store";
import {connect} from "react-redux";
import {loadArticlesAtPageThunk} from "../thunks/articles";

interface ArticlePaginationProps {
    numberOfPages: number,
    pageNumber: number,
    dispatch: (arg0: any) => void
}

const ArticlePagination = ({pageNumber, numberOfPages, dispatch}: ArticlePaginationProps) => {
    const loadPage = (pageNumber: number) => () => {
        dispatch(loadArticlesAtPageThunk(pageNumber))
    };

    const pagination = [];
    if (pageNumber !== 1) {
        pagination.push(<Button key={"prev"} onClick={loadPage(pageNumber - 1)}>
            <ChevronLeftIcon/>
        </Button>);
    }
    for (let currentPage = 1; currentPage <= numberOfPages; ++currentPage) {
        if (currentPage === pageNumber) {
            pagination.push(
                <Button key={currentPage} disabled>
                    {currentPage}
                </Button>
            )
        } else {
            pagination.push(
                <Button key={currentPage} onClick={loadPage(currentPage)}>
                    {currentPage}
                </Button>
            )
        }
    }
    if (pageNumber !== numberOfPages) {
        pagination.push(<Button key={"next"} onClick={loadPage(pageNumber + 1)}>
            <ChevronRightIcon/>
        </Button>);
    }

    return <React.Fragment>
        {pagination}
    </React.Fragment>
};

const mapStateToProps = (state: AppState) => ({
    pageNumber: state.articles.pageNumber,
    numberOfPages: state.articles.numberOfPages
});

export default connect(mapStateToProps)(ArticlePagination);