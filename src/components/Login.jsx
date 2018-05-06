import React, { Component } from 'react';
import {Redirect ,Link } from 'react-router-dom';
import { googleProvider, facebookProvider , auth } from '../firebase';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Divider } from 'material-ui';

// https://new-project-7f8bf.firebaseio.com/

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
      minWidth : 5000,
  },
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect : false,
            email : "",
            password : ""
        }
        this.authWithFacebook = this.authWithFacebook.bind(this);
        this.authWithGoogle = this.authWithGoogle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    authWithGoogle(event){
        console.log("authed with google");
        auth.signInWithPopup(googleProvider)
        .then(function(result){
            var token = result.credential.accessToken;
            var user = result.user;
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }

    authWithFacebook(event){
        console.log("authed with facebook");
        auth.signInWithPopup(facebookProvider)
        .then(function(result){
            var token = result.credential.accessToken;
            var user = result.user;
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password)
        .then(authUser => {
            console.log(authUser);
        })
        .catch(authError => {
            alert(authError);
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    // googleSignIn(event){
    //     auth.signInWithPopup(provider).then(function(result) {
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         var token = result.credential.accessToken;
    //         // The signed-in user info.
    //         var user = result.user;
    //         // ...
    //       }).catch(function(error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         // The email of the user's account used.
    //         var email = error.email;
    //         // The firebase.auth.AuthCredential type that was used.
    //         var credential = error.credential;
    //         // ...
    //       });
    // }

    render() {
        const { email, password } = this.state;
        const classes = this.props.classes;
        if(this.state.redirect === true){
            return <Redirect to='/' />
        }
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>Log in</h1>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <TextField
                              id="email"
                              label="Email"
                              className={classes.textField}
                              value={email}
                              onChange={this.handleChange('email')}
                              margin="normal"
                              type="email"
                            />
                            <br />
                            <TextField
                              id="password"
                              label="Password"
                              className={classes.textField}
                              value={password}
                              onChange={this.handleChange('password')}
                              margin="normal"
                              type="password"
                            />
                            <br />
                            <br />
                            <Button variant="raised" color="primary" type="submit">Log in</Button>
                        </form>
                        <br />
                        <Link to="/forgotpassword"> Forgot your password? </Link>
                        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                        <Divider />
                        <br />
                        <form>
                            <br />
                            <Button variant="raised" color = "secondary" onClick={this.authWithGoogle} classes={styles.button}> Sign in with Google </Button>
                            <br />
                            <br />
                            <Button variant="raised" color = "primary" onClick={this.authWithFacebook} classes={styles.button}> Sign in with Facebook </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Login);
