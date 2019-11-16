import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import User from "../types/User";
import {AppState} from "../store"
import {connect} from "react-redux";
import UserDialogForm from "./UserDialogForm";
import LoadingAnimation from "./LoadingAnimation";
import {createNewUserInModalThunk, loadUserInModalThunk, loadUsersThunk} from "../thunks/users";
import Button from "@material-ui/core/Button";
import UserManagerMessage from "./UserManagerMessage";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    usersSearchField: {
        maxWidth: 500,
    },
    user: {
        margin: theme.spacing(1)
    },
    newButton: {
        height: 55,
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));


interface UsersManagerProps {
    users: Array<User> | null,
    message: string,
    dispatch: (arg0: any) => void,
}

const UsersManager = ({users, message, dispatch}: UsersManagerProps) => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState("");

    const loadUser = (user: User) => () => {
        dispatch(loadUserInModalThunk(user))
    };

    const createUser = () => {
        dispatch(createNewUserInModalThunk());
    };

    if (users === null) {
        dispatch(loadUsersThunk());
        return <LoadingAnimation/>
    }

    const usersToShow = users
        .filter(user => !searchTerm || user.fullName.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase()))
        .map(user => {
            return <Grid item key={user.username} className={classes.user}>
                <Chip
                    color="primary"
                    clickable
                    avatar={<Avatar>{user.fullName.charAt(0)}</Avatar>}
                    label={user.fullName}
                    onClick={loadUser(user)}
                />
            </Grid>
        });

    return <Grid container direction={"column"}>
        <Grid item container justify={"center"} alignItems={"flex-end"}>
            <Grid item className={classes.usersSearchField} xs>
                <TextField
                    label="Search Users"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </Grid>
            <Grid item>
                <Button
                    variant={"contained"}
                    color="primary"
                    className={classes.newButton}
                    onClick={createUser}
                >
                    New User
                </Button>
            </Grid>
        </Grid>
        <Grid item xs>
            {message && <UserManagerMessage/>}
        </Grid>
        <Grid item container>
            {usersToShow}
        </Grid>
        <UserDialogForm/>
    </Grid>
};

const mapStateToProps = (state: AppState) => ({
    users: state.users.users,
    message: state.users.message
});

export default connect(mapStateToProps)(UsersManager);