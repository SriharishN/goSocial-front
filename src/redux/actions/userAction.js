import { SET_USER , CLEAR_ERRORS, LOADING_UI, SET_ERRORS_SIGNUP, SET_ERRORS_LOGIN, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from '../types'
import axios from 'axios'
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login',userData).then(res=>{
        const token = res.data.idTokens;
        localStorage.setItem('FireAuthToken', token);
        axios.defaults.headers.common['Authorization'] = token;
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push("/");
    }).catch(err=>{
        dispatch({
            type: SET_ERRORS_LOGIN,
            payload : err.response.data
        });
    });
}

export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signUp',newUserData).then(res=>{
        const token = res.data.tokens;
        localStorage.setItem('FireAuthToken', token);
        console.log(token);
        axios.defaults.headers.common['Authorization'] = token;
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push("/");
    }).catch(err=>{
        dispatch({
            type: SET_ERRORS_SIGNUP,
            payload : err.response.data
        });
    });
}

export const logOutUser = () => (dispatch) => {
    localStorage.removeItem('FireAuthToken');
    delete axios.defaults.headers.common['Authorization']
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const imageUpload = (formData) => (dispatch) =>{
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData).then(()=>{
        dispatch(getUserData())
    }).catch(err=>{
        console.log(err);
    })
}

export const editProfile = (userDetails) => (dispatch) =>{
    dispatch({ type: LOADING_USER });
    axios.post(`/user`, userDetails).then(()=>{
        dispatch(getUserData());
    }).catch(err=>{
        console.log(err);
    })
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.get('/user').then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })

    }).catch(
        err=> console.log(err)
    )
}

export const markNotificationsRead = (notificationId) => (dispatch) =>{
    axios.post('/notifications', notificationId).then(()=>{
        dispatch({
            type: MARK_NOTIFICATIONS_READ
        })
    }).catch(err=>{
        console.log(err)
    })
}
