import React, { Component } from 'react';
import { auth } from '../firebase';
import { withStyles } from 'material-ui/styles';
// import {Redirect} from 'react-router-dom';
// import firebase from '../firebase';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Divider } from 'material-ui';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editing : false,
            inputName : "",
            inputEmail : "",
            inputPassword : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    editProfile(event){
        event.preventDefault();
        const {inputName,inputEmail,inputPassword} = this.state;
        // auth.currentUser.updateProfile({
        //     displayName : inputName,
        //     email : inputEmail,
        //     password : inputPassword
        // }).then(function(result){
        //     alert("The profile had been updated");
        // }).catch(function(error){
        //     alert(error);
        // });
        // auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credential);
        auth.currentUser.updateEmail(inputEmail).catch(function(error){
            alert(error);
        });
        auth.currentUser.updatePassword(inputPassword).catch(function(error){
            alert(error);
        });
        auth.currentUser.updateProfile({
            displayName : inputName
        }).catch(function(error){
            alert(error);
        });
    }

    render() {
        const {editing,inputName,inputEmail,inputPassword} = this.state;
        const classes = this.props.classes;
        const currentuser = auth.currentUser;
        const verified = auth.currentUser.emailVerified;
        var status = "false";
        if(verified){
            status = "true";

        }
        return (
            <Grid container className={classes.container}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <h2>Profile Page</h2>
                        <Divider />
                        { editing &&
                            <form onSubmit={this.editProfile} autoComplete="off">
                                <TextField
                                    id = "displayName"
                                    label = "Username"
                                    className = {classes.textField}
                                    value = {inputName}
                                    onChange = {this.handleChange('inputName')}
                                    margin = "normal"
                                    type = "name"
                                />
                                <br />
                                <TextField
                                    id = "userEmail"
                                    label = "Email"
                                    className = {classes.textField}
                                    value = {inputEmail}
                                    onChange = {this.handleChange('inputEmail')}
                                    margin = "normal"
                                    type = "email"
                                />
                                <br />
                                <TextField
                                    id = "password"
                                    label = "Password"
                                    className = {classes.textField}
                                    value = {inputPassword}
                                    onChange = {this.handleChange('inputPassword')}
                                    margin = "normal"
                                    type = "password"
                                />
                                <br />
                                <br />
                                <Button variant = "raised" color = "primary" type = "submit"> Submit </Button>
                                &ensp;
                                <Button color = "default" onClick={() => this.props.history.push("/")}>Back</Button>
                            </form>
                        }            
                        { !(editing) &&
                            <form>
                                <p><b>Display Name</b> : {currentuser.displayName} </p>
                                <br />
                                <p><b>Email</b> : {currentuser.email} </p>
                                <br />
                                <p><b>Email Verification Status</b> : {status} </p>
                                <br />
                                <form>
                                    <Button variant="raised" color ="primary" onClick={()=> this.setState({editing : true})}>Edit</Button>
                                    &ensp;
                                    <Button color = "default" onClick={() => this.props.history.push("/")}>Back</Button>
                                </form>
                            </form>
                        }                    
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Profile);
