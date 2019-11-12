import Button from "@material-ui/core/Button";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React from "react";
import {AppState} from "../store";
import {connect} from "react-redux";
import {loadArticlesAtPageThunk} from "../thunks/articles";

interface ArticlePaginationProps {
    numberOfPages: number,
    currentPage: number,
    dispatch: (arg0: any) => void
}

const ArticlePagination = ({currentPage, numberOfPages, dispatch}: ArticlePaginationProps) => {
    const loadPage = (pageNumber: number) => () => {
        dispatch(loadArticlesAtPageThunk(pageNumber))
    };

    const pagination = [];
    if (currentPage !== 1) {
        pagination.push(<Button key={"prev"} onClick={loadPage(currentPage - 1)}>
            <ChevronLeftIcon/>
        </Button>);
    }
    for (let pageNumber = 1; pageNumber <= numberOfPages; ++pageNumber) {
        if (pageNumber === currentPage) {
            pagination.push(
                <Button key={pageNumber} disabled>{pageNumber}</Button>
            )
        } else {
            pagination.push(
                <Button key={pageNumber} onClick={loadPage(currentPage)}>
                    {pageNumber}
                </Button>
            )
        }
    }
    if (currentPage !== numberOfPages) {
        pagination.push(<Button key={"next"} onClick={loadPage(currentPage + 1)}>
            <ChevronRightIcon/>
        </Button>);
    }

    return <React.Fragment>
        {pagination}
    </React.Fragment>
};

const mapStateToProps = (state: AppState) => ({
    currentPage: state.articles.currentPage,
    numberOfPages: state.articles.numberOfPages
});

export default connect(mapStateToProps)(ArticlePagination);