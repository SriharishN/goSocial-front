import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { getPost, clearErrors } from '../redux/actions/dataAction'
import { CircularProgress, Grid, IconButton, Tooltip, Typography } from '@material-ui/core'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close'
import { Link } from 'react-router-dom'
import UnfoldMore from '@material-ui/icons/UnfoldMoreTwoTone';
import dayjs from 'dayjs'
import LikeButton from './LikeButton'
import ChatIcon from '@material-ui/icons/Chat'
import Comments from './Comments'
import CommentForm from './CommentForm'

const styles = (theme) =>({
    ...theme.spreadThis,
    circularProgress:{
        textAlign:'center',
        marginTop:50,
        marginBottom:50
    },
    closeButton:{
        position: 'absolute',
        left:'90%',
        ['@media (max-width:640px)']: { // eslint-disable-line no-useless-computed-key
            left: '83%'
          }
    },
    profileImage:{
        maxWidth:200,
        height:200,
        borderRadius:'50%',
        objectFit:'cover'
    },
    dialogContent:{
        padding: 20,
        overflowY:'unset'
    },
    content:{
        paddingTop:10
    },
    handle:{
        cursor:'pointer',
        textDecoration:'none'
    },
    toolIcons:{
        position:'relative',
        right: '5%'
    }
})

const ViewPost = (props) => {
    const [open, setOpen] = useState(false)
    const [path, setPath] = useState({
        oldPath:'',
        newpath:''
    })
    const handleOpen = ()=> {
        let oldPath = window.location.pathname;
        const { postId, userHandle } = props;
        let newPath = `/users/${userHandle}/post/${postId}`;
        if( newPath === oldPath ){
            oldPath = `/users/${userHandle}`
        }
        window.history.pushState(null,null,newPath)
        setOpen(true);
        setPath({
            oldPath,
            newPath
        })
        props.getPost(props.postId)
    }

    const handleClose = ()=> {
        window.history.pushState(null,null,path.oldPath)
        setOpen(false);
        props.clearErrors();
    }
    useEffect(() => {
        if(props.openDialog)
        handleOpen()//eslint-disable-next-line
    }, [props.openDialog])

    const {classes, post: { body, userImage, createdAt, userHandle, postId, likeCount, commentCount, comments}, UI: {loading}} = props;
    const dialogView = loading ? (
        <div className={classes.circularProgress}>
        <CircularProgress size={200} thickness={2}></CircularProgress>
        </div>
    ): (
    <Grid container spacing={3}>
        <Grid item sm={5}>
            <img src={userImage} alt="Profile" className={classes.profileImage}></img>
        </Grid>
        <Grid item sm={7}>
        <Typography component={Link} to={`users/${userHandle}`} color="primary" variant="h5" className={classes.handle}>{userHandle}</Typography>      
        <hr className={classes.hideSeparator}/>
        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}</Typography>
        <Typography variant="body1" color="textPrimary" className={classes.content}>{body}</Typography>
        <div className={classes.toolIcons}>
        <LikeButton postId={postId}/>
        <span>{likeCount} likes</span>
        <Tooltip title="Comments" placement="top">
        <IconButton  className="button">
        <ChatIcon color="primary"> 
        </ChatIcon>
        </IconButton>
        </Tooltip>                                
        <span>{commentCount} comments</span>
        </div>
        </Grid>
        <hr className={classes.enableSeparator}/>
        <CommentForm postId={postId}/>
        <Comments comments={comments}/>
    </Grid>)
    return (
        <Fragment>
        <Tooltip title="View Post" placement="top">
            <IconButton onClick={handleOpen} className={classes.buttons}> 
                <UnfoldMore color="primary">
                </UnfoldMore>
            </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Tooltip title="Close" placement="top">
            <IconButton onClick={handleClose} className={classes.closeButton}> 
                <CloseIcon color="primary">
                </CloseIcon>
            </IconButton>
        </Tooltip>
        <DialogContent className={classes.dialogContent}> 
            {dialogView}
        </DialogContent>
        </Dialog>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    post:state.data.post
})

const mapActionToProps = {
    getPost,
    clearErrors
}
ViewPost.propTypes = {
    clearErrors:PropTypes.func.isRequired,
    getPost:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    postId:PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ViewPost))
