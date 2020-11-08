import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { editProfile } from '../redux/actions/userAction'
import { Button, IconButton, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) =>({
    ...theme.spreadThis,
    buttons:{
        float:'right'
    }
})

const EditProfile = (props) => {
    const [state, setstate] = useState({
        bio:'',
        website:'',
        location:'',
       
    })
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const { credentials } = props
        setstate({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    },[props] )
    const handleOpen = ()=> {
        setOpen(true);
    }

    const handleClose = ()=> {
        setOpen(false);
    }

    const handleChange = (event) =>{
        setstate({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setstate({
          ...state
        })
        const userData = {
            bio: state.bio,
            website: state.website,
            location: state.location
        };
       props.editProfile(userData)
    }

    const {classes} = props;
    return (
        <Fragment>
        <Tooltip title="Edit Profile" placement="top">
            <IconButton onClick={handleOpen} className={classes.buttons}> 
                <EditIcon color="primary">
                </EditIcon>
            </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Your Profile</DialogTitle>
        <DialogContent>
            <form>
                <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="Give some Bio of yourself"
                value={state.bio}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal/professional website"
                value={state.website}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Give your location"
                value={state.location}
                onChange={handleChange}
                fullWidth
                />      
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                Save
            </Button>
        </DialogActions>
        </Dialog>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

const mapActionToProps = {
    editProfile
}
EditProfile.propTypes = {
    editProfile:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(EditProfile))
