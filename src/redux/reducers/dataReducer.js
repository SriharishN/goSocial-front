import { DELETE_POST, LIKE_SCREAMS, LOADING_DATA, NEW_POST, POST_COMMENT, SET_SCREAM, SET_SCREAMS, UNLIKE_SCREAMS,DELETE_COMMENT } from '../types'

const initialState = {
    loading:false,
    posts:[],
    post:{}
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_SCREAMS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }
            
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }    
        case LIKE_SCREAMS:
        case UNLIKE_SCREAMS:
            let index = state.posts.findIndex(post=> post.postId === action.payload.postId)
            state.posts[index] = action.payload
            if(state.post.postId === action.payload.postId){
                let comments = state.post.comments;
                state.post = action.payload;
                state.post["comments"] = comments;
            }
            return{
               ...state
            }
        case NEW_POST:
            return{
                ...state,
                posts:[
                    action.payload,
                    ...state.posts
                ]
            }    
        case SET_SCREAM:
            return {
                ...state,
                post: action.payload
            }
        case POST_COMMENT:
            let postIndex = state.posts.findIndex(post=> post.postId === action.payload.postId)
            return {
                ...state,
                post: {
                    ...state.post,
                    comments:[action.payload, ...state.post.comments],
                    commentCount: state.post.commentCount + 1
                },
                posts: state.posts.map((mapPost, index)=>
                    index === postIndex ? {
                        ...mapPost, commentCount: mapPost.commentCount + 1
                    } : mapPost
                )
            }
        case DELETE_POST:
            let delIndex = state.posts.findIndex( post => post.postId === action.payload)
            state.posts.splice(delIndex, 1);
            return{
                ...state
            }
        case DELETE_COMMENT:
            let delCommentIndex = state.post.comments.findIndex(comment=> comment.commentId === action.payload[1])
            state.post.comments.splice(delCommentIndex, 1);
            let postDelIndex = state.posts.findIndex(post=> post.postId === action.payload[0])
            return {
                ...state,
                post:{
                    ...state.post,
                    comments:[...state.post.comments],
                    commentCount: state.post.commentCount - 1
                },
                posts: state.posts.map((mapPost, index)=>
                    index === postDelIndex ? {
                        ...mapPost, commentCount: mapPost.commentCount - 1
                    } : mapPost
                )
            }
        default:
            return state;
    }
}