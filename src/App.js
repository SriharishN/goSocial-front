import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

import jwtDecode from 'jwt-decode'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import User from './pages/user'

import Navbar from './components/Navbar'
import themes from './util/themes';
import AuthRoute from './util/AuthRoute'

import { Provider } from 'react-redux'
import store from './redux/store'
import { getUserData, logOutUser } from './redux/actions/userAction';
import { SET_AUTHENTICATED } from './redux/types';
import axios from 'axios';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";


const theme = createMuiTheme(themes);

axios.defaults.baseURL = "https://us-central1-gosocial-227ed.cloudfunctions.net/api";
const token = localStorage.FireAuthToken
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logOutUser());
    window.location.href = '/login';
  }else{
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

const App = () => (
  <MuiThemeProvider theme={theme}>
  <Provider store = {store}>
  <div className="App">
    <Router>
    <Navbar/>
       <div className="container">
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <AuthRoute exact path="/login" component={Login} ></AuthRoute>
        <AuthRoute exact path="/signUp" component={Signup} ></AuthRoute>
        <Route exact path="/users/:handle" component={User}></Route>
        <Route exact path="/users/:handle/post/:postId" component={User}></Route>
      </Switch>
      </div>
    </Router>
    <ScrollUpButton style={{
      maxWidth:25,
      height:25,
      color:'blue'
    }} />
  </div>
  </Provider>
  </MuiThemeProvider>
)

export default App;
