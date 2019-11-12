import React from "react";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import ThemeWrapper from "./components/ThemeWrapper";
import Header from "./components/Header";
import TagsManager from "./components/TagsManager";
import Wrapper from "./components/Wrapper";
import ArticleManager from "./components/ArticleManager";
import ArticleEditor from "./components/ArticleEditor";

const App: React.FC = () => {
    return <ThemeWrapper>
        <BrowserRouter>
            <Header/>
            <Wrapper>
                <Switch>
                    <Route path="/tags">
                        <TagsManager/>
                    </Route>
                    <Route path="/articles">
                        <ArticleManager/>
                    </Route>
                    <Route path="/article/:id">
                        <ArticleEditor/>
                    </Route>
                    <Route path="/">
                        <div/>
                    </Route>
                </Switch>
            </Wrapper>
        </BrowserRouter>
    </ThemeWrapper>
};

export default App;
