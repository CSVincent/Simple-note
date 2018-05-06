import React, { Component } from 'react';
// import {DragSource} from 'react-dnd';
import { auth, db } from '../firebase';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import List, {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from 'material-ui/List';


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
    },
    list: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        maxWidth: 360,
        maxHeight: 200,
        overflow: 'auto',
    },

});

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUsername : "",
            notes : [],
            current : ""
        };
        this.addNote = this.addNote.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        const username = auth.currentUser.displayName;
        this.setState({currentUsername : username});
        const uid = auth.currentUser.uid;
        // if(auth.currentUser.displayName === "" || !auth.currentUser.displayName){
        //     this.props.history.push('/');
        // }
        let notesRef = db.ref('notes/' + uid).orderByKey().limitToLast(100);
        notesRef.on('child_added', snapshot => { //this line notifies if new content is add in which then can be re-render like a new facebook post.
            let note = { text: snapshot.val(), id: snapshot.key };
            this.setState({notes: [note].concat(this.state.notes) });
        })
        notesRef.on('child_removed', snapshot => { //this line notifies if new content is add in which then can be re-render like a new facebook post.
            let filtered = this.state.notes.filter(note=> note.id !== snapshot.key)
            this.setState({notes: filtered});
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    addNote(e) {
        e.preventDefault();
        console.log(auth.currentUser.uid);
        const uid = auth.currentUser.uid;
        db.ref('notes/' + uid).push(this.state.current);
        this.setState({ current : "" });
    }

    DeleteNote(noteid) {
        const uid = auth.currentUser.uid;
        // const {notes} = this.state;
        console.log(noteid);
        db.ref('notes/' + uid).child(noteid).remove();
    };

    render() {
        const {currentUsername} = this.state;
        const classes = this.props.classes;
        return (
            <Grid container className={classes.container}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <p>Hello, {currentUsername}</p>
                            <List className={classes.list}>
                                { /* Render the list of messages */
                                    this.state.notes.map( (note,index) =>
                                        <ListItem key={note.id}>
                                            <ListItemText primary={(index+1) + '. ' + note.text}/>
                                            <ListItemSecondaryAction>
                                              <IconButton aria-label="Delete" onClick={() => this.DeleteNote(note.id)}>
                                                <DeleteIcon/>
                                              </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem> )
                                }
                            </List>
                            <form onSubmit={this.addNote}>
                                <TextField
                                    id="note"
                                    label="Enter new note"
                                    className={classes.textField}
                                    value={this.state.current}
                                    onChange={this.handleChange('current')}
                                    margin="normal"
                                    />
                                {/* <IconButton onClick={()=>this.addNote}>
                                    <AddIcon/>
                                </IconButton> */}
                                <Button variant="raised" color="primary" type="submit">Add</Button>
                            </form>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Main);
