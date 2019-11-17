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
import UsersManager from "./components/UsersManager";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/LoginForm";

const App: React.FC = () => {
    return <ThemeWrapper>
        <BrowserRouter>
            <Header/>
            <Wrapper>
                <Switch>
                    <PrivateRoute path="/tags">
                        <TagsManager/>
                    </PrivateRoute>
                    <PrivateRoute path="/users">
                        <UsersManager/>
                    </PrivateRoute>
                    <PrivateRoute path="/articles">
                        <ArticleManager/>
                    </PrivateRoute>
                    <PrivateRoute path="/article/:id">
                        <ArticleEditor/>
                    </PrivateRoute>
                    <Route path="/login">
                        <LoginForm/>
                    </Route>
                    <PrivateRoute path="/">
                        <div/>
                    </PrivateRoute>
                </Switch>
            </Wrapper>
        </BrowserRouter>
    </ThemeWrapper>
};

export default App;
