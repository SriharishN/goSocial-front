import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import relativeTime  from 'dayjs/plugin/relativeTime';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import ChatIcon from '@material-ui/icons/Chat'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import DeletePost from './DeletePost';
import ViewPost from './ViewPost'
import LikeButton from './LikeButton';


const styles = {
    card: {
        
        maxWidth: 650,
        marginBottom: 20,
    },
    image: {
        minWidth:170,
    },
    content: {
        paddingLeft:'2rem',
        paddingBottom: '5px',
        objectFit: 'cover'
    },
    avatar: {
        height: '45px',
        width: '45px',
        objectFit: 'cover', 
        '&:hover':{
            transform: 'scale(1.7)',
            position:'relative',
            zIndex:1
        }
    },
    toolIcons: {
        paddingLeft: '1rem'
    },
    handle:{
        cursor:'pointer',
        textDecoration:'none'
    }
    
}
const Scream = (props) =>{
    dayjs.extend(relativeTime);
    const {classes, post: { body, userImage, createdAt, userHandle,postId, likeCount, commentCount }, user: {authenticated, credentials:{ handle }}} = props
    const deleteButton = authenticated && userHandle === handle ? (
        <DeletePost postId={postId}/>
    ) : null
    return (
        <Card className={classes.card}>
         <CardHeader
        avatar={
          <Avatar alt={userHandle}  src={userImage}  className={classes.avatar}>
          </Avatar>
        }
        title={
            <Typography variant="body1" component={Link} color="primary" to={`/users/${userHandle}`} className={classes.handle}>{userHandle}</Typography>
            }
        subheader={dayjs(createdAt).fromNow()}
        className={classes.header}
      
      />   
         
        <CardContent className={classes.content}>
        <Typography variant="body1" color="textPrimary">{body}</Typography> 
        </CardContent>
        <CardContent className={classes.toolIcons}>
         <LikeButton postId={postId}/>
        <span>{likeCount} likes</span>
        <Tooltip title="Comments" placement="top">
        <IconButton  className="button">
        <ChatIcon color="primary"> 
        </ChatIcon>
        </IconButton>
        </Tooltip>                                
        <span>{commentCount} comments</span>
        <ViewPost postId={postId} userHandle={userHandle} openDialog={props.openDialog}/>
        {deleteButton}
        </CardContent>
        </Card>
    )
}

Scream.propTypes = {
    user : PropTypes.object.isRequired,
    post : PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user:state.user
})

const mapActionToProps = {

}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Scream))
