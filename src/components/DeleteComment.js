import React, { Fragment,  useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { deleteComment } from '../redux/actions/dataAction'
import { Button, DialogActions, IconButton, Tooltip } from '@material-ui/core'

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete'


const styles = (theme) =>({
    ...theme.spreadThis,
    deleteButton:{
        position: 'absolute',
        left: '90%',
        ['@media (max-width:640px)']: { // eslint-disable-line no-useless-computed-key
            left: '83%'
          }
    }
})

const DeleteComment = (props) => { 
    const [open, setOpen] = useState(false)
    const handleOpen = ()=> {
        setOpen(true);
    }

    const handleClose = ()=> {
        setOpen(false);
    }

    const handleSubmit = () =>{
       props.deleteComment(props.postId, props.commentId)
       handleClose()
    }

    const {classes} = props;
    return (
        <Fragment>
        <Tooltip title="Delete" placement="top">
            <IconButton onClick={handleOpen} className={classes.deleteButton}> 
                <DeleteIcon color="primary">
                </DeleteIcon>
            </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure to delete this Comment? </DialogTitle>
        <DialogActions>
            <Button onClick={handleClose} className={classes.buttons} color="primary">Cancel</Button>
            <Button onClick={handleSubmit} className={classes.buttons} color="primary">Delete</Button>
        </DialogActions>
        </Dialog>
        </Fragment>
    )
}

const mapActionToProps = {
    deleteComment
}
DeleteComment.propTypes = {
    deleteComment:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string,
    commentId:PropTypes.string
}

export default connect(null, mapActionToProps)(withStyles(styles)(DeleteComment))
