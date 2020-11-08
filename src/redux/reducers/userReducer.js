import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_SCREAMS, UNLIKE_SCREAMS, MARK_NOTIFICATIONS_READ } from '../types'

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function(state = initialState, action ){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }    
        case SET_UNAUTHENTICATED:
            return initialState;

        case SET_USER:
            return {
                authenticated: true,
                loading:false,
                ...action.payload
            }
        case LIKE_SCREAMS:
            return{
                ...state,
                likes:[
                    ...state.likes,
                    {
                        postId: action.payload.postId,
                        userHandle: state.credentials.handle
                    }
                ]
            }   
        case UNLIKE_SCREAMS:
            return{
                ...state,
                likes: state.likes.filter( post => post.postId !== action.payload.postId)
            }     
        
        case MARK_NOTIFICATIONS_READ:
          state.notifications.forEach(notify=> notify.read = true);
              return {
               ...state
                }  
        default:
            return state;    
    }
}