import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_ERRORS_LOGIN, SET_ERRORS_SIGNUP, STOP_LOADING_UI, SET_ERRORS_COMMENT, SET_ERRORS_POST } from '../types'

const initialState = {
    loading:false,
    login:false,
    signup:false,
    comment:false,
    post:false,
    errors: null
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case SET_ERRORS_POST:
            return {
                ...state,
                loading: false,
                comment:false,
                post:true,
                errors: action.payload
            }
            case SET_ERRORS_COMMENT:
                return {
                    ...state,
                    loading: false,
                    comment:true,
                    post:false,
                    errors: action.payload
                }    
        case SET_ERRORS_LOGIN:
            return {
                ...state,
                loading: false,
                login:true,
                signup:false,
                errors: action.payload
            }
        case SET_ERRORS_SIGNUP:
            return {
                ...state,
                loading:false,
                login:false,
                signup:true,
                errors:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            }    
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }    
            case STOP_LOADING_UI:
                return {
                    ...state,
                    loading: false
                }        
        default:
            return state;
    }
}