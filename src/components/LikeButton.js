import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { likePosts, unlikePosts } from '../redux/actions/dataAction'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const LikeButton = (props) => {
    const { authenticated } = props.user;
    const likedPost = () =>{
        if(props.user.likes && props.user.likes.find( like => like.postId === props.postId))
        return true
        else
        return false
    }
    const likePost = () => {
        props.likePosts(props.postId)
    }
    const unlikePost = () => {
        props.unlikePosts(props.postId)
    }
    const likeButton = !authenticated ? (
        <Tooltip title="Like" placement="top">
        <IconButton className="button" >
        <Link to="/login">
        <FavoriteBorder color="primary"> 
        </FavoriteBorder>
        </Link>
        </IconButton>
        </Tooltip> 
    ) : 
    (
        likedPost() ? (
            <Tooltip title="Like" placement="top">
            <IconButton className="button" onClick={unlikePost}>
            <FavoriteIcon color="primary"> 
            </FavoriteIcon>
            </IconButton>
            </Tooltip> 
        ):(
            <Tooltip title="Like" placement="top">
            <IconButton className="button" onClick={likePost}>
            <FavoriteBorder color="primary"> 
            </FavoriteBorder>
            </IconButton>
            </Tooltip> 
        )
        
    )
    return likeButton
}

LikeButton.propTypes = {
    likePosts:PropTypes.func.isRequired,
    unlikePosts: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}
const mapActionToProps = {
    likePosts,
    unlikePosts
}
const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, mapActionToProps)(LikeButton)
