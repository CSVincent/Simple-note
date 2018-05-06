import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { auth } from '../firebase';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

import PrivateRoute from './PrivateRoute';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Profile from './Profile';

const theme = createMuiTheme();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName : "",
            loading: true,
            authenticated: false,
            currentUser: null 
        };
    }
    componentWillMount() { auth.onAuthStateChanged(user => {
        if (user) {
            this.setState({
                displayName : user.displayName,
                authenticated: true,
                currentUser: user,
                loading: false },
                () => { this.props.history.push('/') }
            );
        } else {
            this.setState({
                authenticated: false,
                currentUser: null,
                loading: false
            });
        }
        });
    }

    render () {
        const { displayName,authenticated, loading } = this.state;
        const content = loading ? (
            <div align="center">
                <CircularProgress size={80} thickness={5} />
            </div>
        ) : (
            <div>
                <PrivateRoute
                    exact
                    path="/"
                    component={Main}
                    authenticated={authenticated}
                    />
                <PrivateRoute
                    exact
                    path="/profile"
                    component={Profile}
                    authenticated={authenticated}
                    />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/forgotpassword" component={ForgotPassword}/>
            </div>
        );
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                Simple Note :  
                            </Typography>
                            &emsp;
                            {
                                authenticated && <p>{displayName}</p>
                            }
                            &emsp;
                            { authenticated &&
                                <Button variant="raised" color="default" onClick={() => auth.signOut()}>Log out</Button>
                            }
                            &ensp;
                            { authenticated &&
                                <Button variant="raised" color="primary" onClick={() => this.props.history.push("/profile")}>Profile</Button>
                            }
                        </Toolbar>
                    </AppBar>
                    { content }
                </div>
            </MuiThemeProvider>
         );
    }
}

export default withRouter(App);
