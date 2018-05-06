import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

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

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const { email } = this.state;
        auth.sendPasswordResetEmail(email).then(function(){
            alert("an reset password email has been sent to your email account.");
        }).catch(function(error){
            alert(error);
        })
        this.props.history.push('/');
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { email } = this.state;
        const classes = this.props.classes;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>Forgot Password?</h1>
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
                            <br />
                            <Button variant="raised" color="primary" type="submit">Submit</Button>
                            &ensp;
                            <Button color = "default" onClick={() => this.props.history.push("/")}>Back</Button>
                        </form>
                        <br />
                        {/* <Link to="/forgotpassword"> Forgot your password? </Link> */}
                        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(ForgotPassword);
