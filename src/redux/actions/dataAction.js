
import axios from 'axios'
import { LOADING_DATA, SET_SCREAMS, UNLIKE_SCREAMS, LIKE_SCREAMS, 
LOADING_UI, NEW_POST, CLEAR_ERRORS, DELETE_POST, SET_SCREAM, STOP_LOADING_UI, POST_COMMENT, DELETE_COMMENT, SET_ERRORS_COMMENT, SET_ERRORS_POST } from '../types'

export const getPosts = () =>(dispatch)=> {
    dispatch( {type: LOADING_DATA} )
    axios.get('/getViews').then(res => {
           dispatch({
                type: SET_SCREAMS,
                payload:res.data
            })
    }).catch(err =>{
        dispatch({
            type: SET_SCREAMS,
            payload:[]
        })
    })

}

export const getPost = (postId) => (dispatch) =>{
    dispatch({type: LOADING_UI});
    axios.get(`/getViews/${postId}`).then( res=> {
        dispatch({
            type: SET_SCREAM,
            payload: res.data
        });
        dispatch({type: STOP_LOADING_UI});
    }).catch(err=> console.log(err));
}

export const newPost = (newPost) => (dispatch) => {
    dispatch( {type: LOADING_UI} );
    axios.post('/newPost', newPost).then(res =>{
        dispatch({
            type:NEW_POST,
            payload: res.data
        })
    dispatch({type:CLEAR_ERRORS})
    }).catch(err=>{
        dispatch({
            type:SET_ERRORS_POST,
            payload: err.response.data
        })
    })
}

export const likePosts = (postId) => (dispatch)=> {
    axios.get(`/getViews/${postId}/like`).then(res => {
        console.log(res);
           dispatch({
                type: LIKE_SCREAMS,
                payload:res.data
            })
    }).catch(err=> console.log(err))

}

export const unlikePosts = (postId) =>(dispatch)=> {
    axios.get(`/getViews/${postId}/unlike`).then(res => {
           console.log(res);
           dispatch({
                type: UNLIKE_SCREAMS,
                payload:res.data
            })
    }).catch(err=> console.log(err))

}

export const commentPost = (postId, commentData) => (dispatch) =>{
    axios.post(`/getViews/${postId}/comment`, commentData).then( res=>{
        dispatch({
            type: POST_COMMENT,
            payload: res.data
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch( err=> {
        dispatch({
            type: SET_ERRORS_COMMENT,
            payload:err.response.data
        })
    })
}

export const deletePost = (postId) => (dispatch) =>{
    axios.delete(`/getViews/${postId}`).then(() =>{
        dispatch({
            type: DELETE_POST,
            payload: postId
        })
    }).catch(err=> console.log(err))
}

export const deleteComment = (postId,commentId)=>(dispatch)=>{
    axios.delete(`/getViews/${postId}/comment/${commentId}`).then(()=>{
        dispatch({
            type: DELETE_COMMENT,
            payload: [postId,commentId]
        })
        console.log(postId)
    }).catch(err=> console.log(err))
}

export const getUserData = (userHandle) => (dispatch) =>{
    dispatch({ type:LOADING_DATA })
    axios.get(`/user/${userHandle}`).then((res)=>{
        dispatch({
            type: SET_SCREAMS,
            payload: res.data.posts
        })
    }).catch(err=>{
        dispatch({
            type:SET_SCREAMS,
            payload:null
        })
    })
}

export const clearErrors = () => (dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}