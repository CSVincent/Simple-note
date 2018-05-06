import React, { Component } from 'react';
import { auth } from '../firebase';
// import firebase from '../firebase';
import {Link} from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curname : "",
            email : "",
            password : ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // componentWillMount() { auth.onAuthStateChanged(user => {
    //     if (user) {
    //         const {curname} = this.state
    //         user.updateProfile({
    //             displayName : curname
    //         });
    //         this.setState({curname : ""});
    //     } 
    //     });
    // }

    onSubmit(event) {
        event.preventDefault();
        const { curname,email, password } = this.state;
    //     auth.createUserWithEmailAndPassword(email,password)
    //     .then(function(user){
    //         return user.updateProfile({displayName : curname});
    //     }).catch(function(error){
    //         console.log(error);
    //         alert(error);
    //     });
    // };
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            var user = auth.currentUser;
            // var credentials = firebase.auth.EmailAuthProvider.credential(
            //     user.email,
            //     password
            // );
            auth.currentUser.updateProfile({
                displayName: curname,
            });
            // user.reauthenticateWithCredential(credentials);
            auth.currentUser.sendEmailVerification().then(function(){
                alert("A verification email has been sent to your email account. Please verify your email with the link provided");
            }).catch(function(error){
                alert(error);
            });

            // auth.onAuthStateChanged(authUser =>{
            //     if(authUser){
            //         const {curname} = this.state
            //         authUser.updateProfile({
            //             displayName : curname
            //         });
            //         this.setState({curname : ""});
            //     }
            // })
            console.log(authUser);
        })
        .catch(authError => {
            alert(authError);
        })
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { curname,email, password } = this.state;
        const classes = this.props.classes;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h1>Sign up</h1>
                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <TextField
                                  id="curname"
                                  label="Name"
                                  className={classes.textField}
                                  value={curname}
                                  onChange={this.handleChange('curname')}
                                  margin="normal"
                                  type="name"
                                />
                                <br />
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
                                <Button variant="raised" color="primary" type="submit">Sign up</Button>
                                &ensp;
                                <Button color = "default" onClick={() => this.props.history.push("/")}>Back</Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Signup);
