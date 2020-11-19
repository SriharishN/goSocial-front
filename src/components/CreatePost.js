import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { newPost, clearErrors } from '../redux/actions/dataAction'
import { Button, CircularProgress, IconButton, Tooltip } from '@material-ui/core'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = (theme) =>({
    ...theme.spreadThis,
    submitButton:{
        position: 'relative',
        left:'85%',
        ['@media (max-width:640px)']: { // eslint-disable-line no-useless-computed-key
            left: '31%'
          }
    },
    circularProgress:{
        position: 'absolute'
    },
    closeButton:{
        position: 'absolute',
        left:'90%',
        ['@media (max-width:640px)']: { // eslint-disable-line no-useless-computed-key
            left: '83%'
          }
    }
})

const CreatePost = (props) => {
    const [state, setstate] = useState({
        body: ' '
    })
    const [open, setOpen] = useState(false)
    const [postErrors, setErrors] = useState([{
        errors:''
      }])
    const handleOpen = ()=> {
        setOpen(true);
        console.log(open);
    }

    const handleClose = ()=> {
        setOpen(false);
        setErrors('')
        console.log(open);
    }

    const handleChange = (event) =>{
        setErrors('')
        setstate({
            ...state,
            [event.target.name]: event.target.value
        });
    }
    useEffect(() => {
        if(props.UI.errors && props.UI.post)
          setErrors(props.UI.errors)

        if(!props.UI.errors && !props.UI.loading){
            setstate({ body: ""});
            setOpen(false)
        } 
      }, [props.UI.errors,props.UI.loading,props.UI.post])

    const handleSubmit = (event) =>{
        event.preventDefault();
        setstate({
          ...state
        })
        const userData = {
            body: state.body
        };
       props.newPost(userData)
    }

    const {classes, UI: {loading}} = props;
    return (
        <Fragment>
        <Tooltip title="Post a Blog !" placement="top">
            <IconButton onClick={handleOpen} className={classes.buttons}> 
                <AddIcon color="primary" >
                </AddIcon>
            </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Tooltip title="Close" placement="top">
            <IconButton onClick={handleClose} className={classes.closeButton}> 
                <CloseIcon color="primary">
                </CloseIcon>
            </IconButton>
        </Tooltip>
        <DialogTitle>Post a Blog</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit}>
                <TextField
                name="body"
                type="text"
                label="Post"
                multiline
                rows="3"
                placeholder="Post a Status to your Blog"
                value={state.body}
                onChange={handleChange}
                error={postErrors ? true : false}
                helperText={postErrors.body}
                className={classes.textField}
                fullWidth
                />
                <Button className={classes.submitButton} type="submit" variant="contained" color="primary" disabled = {loading}>Submit
                { loading && (<CircularProgress size={30} className={classes.circularProgress}></CircularProgress>) }
                </Button>
            </form>
        </DialogContent>
        </Dialog>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

const mapActionToProps = {
    newPost,
    clearErrors
}
CreatePost.propTypes = {
    clearErrors:PropTypes.func.isRequired,
    newPost:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CreatePost))
