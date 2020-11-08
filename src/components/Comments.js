import React, { Fragment } from 'react'
import { Grid, Typography } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import DeleteComment from './DeleteComment'
import { connect } from 'react-redux'

const styles = (theme) =>({
    ...theme.spreadThis,
    commentImage:{
        maxWidth:'100%',
        height: 100,
        objectFit:'cover',
        borderRadius:'50%'
    },
    commentData:{
        marginLeft:20
    }
});


const Comments = (props) => {
    const { classes, comments, user:{ authenticated, credentials:{handle}} } = props;
    return (
        <Grid container>
            {comments.map((comment, index)=>{
                const { body, createdAt, userHandle, userImage, postId, commentId } = comment;
                const deleteButton = authenticated && userHandle === handle ? (
                    <DeleteComment postId={postId} commentId={commentId}/>
                 ) : null
                return(
                    <Fragment key={createdAt}>
                        <Grid item sm={12}>
                        <Grid container>
                            <Grid item sm={2}>
                            <img src={userImage} alt={userHandle}  className={classes.commentImage}></img>
                            </Grid>
                        <Grid item sm={9}>
                            <div className={classes.commentData}>
                        <Typography component={Link} to={`users/${userHandle}`} color="primary" variant="h5" className={classes.handle}>{userHandle}</Typography>      
                        {deleteButton}
                        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}</Typography>
                        <hr className={classes.hideSeparator}/>
                        <Typography variant="body1" color="textPrimary" className={classes.content}>{body}</Typography>
                        
                        </div>
                 </Grid>
           </Grid>
       </Grid>
{comments.length - 1 === index ? (null) : <hr className={classes.enableSeparator}/>}
</Fragment>
                )
            })}
        </Grid>
    )
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    user: state.user
})

export default connect(mapStateToProps,null)(withStyles(styles)(Comments))
