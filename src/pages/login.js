import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Button, CircularProgress } from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail'
import InputAdornment from '@material-ui/core/InputAdornment'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'

import {connect} from 'react-redux'
import { loginUser } from '../redux/actions/userAction'

import { Link } from 'react-router-dom'
import AppIcon from '../images/goSocial_logo.png'


const styles = (theme) => ({
  ...theme.spreadThis
})


const Login = (props) =>{
   const [loginDetail, setLoginDetails] = useState({
       email:'',
       password:'',
   })  
   const [errors, setErrors] = useState([{
     errors:''
   }])
   const [password, showPassword] = useState(false)

   const handleChange = (event) =>{
    setErrors("")
    setLoginDetails({
        ...loginDetail,
        [event.target.name]: event.target.value
    });
   console.log("hi");
}

const handleSubmit = (event) =>{
    event.preventDefault();
    setLoginDetails({
      ...loginDetail
    })
    const userData = {
        email: loginDetail.email,
        pass: loginDetail.password
    };
   props.loginUser(userData, props.history)
}
useEffect(() => {
  if(props.UI.errors && props.UI.login)
    setErrors(props.UI.errors)
}, [props.UI.errors,props.UI.login])
const passwordVisibilty = (event) =>{
     showPassword(!password);
}

    return(
     
      <Grid container className={props.classes.form}>
     
     <Grid item sm></Grid>
     <Grid item sm>
       <br/>
         <img src={AppIcon} alt="Logo"/> 
        <Typography variant="h3" className={props.classes.pageTitle}>Login</Typography>
        <form noValidate onSubmit={handleSubmit}>
            <TextField id="email" variant="outlined"
            type="email" 
            name="email" 
            label="Email" className={props.classes.textField} 
            InputProps={{
             startAdornment: (
               <InputAdornment position="start">
                 <MailIcon />
               </InputAdornment>
             ),
           }}
            value={loginDetail.email} onChange={handleChange} helperText={errors.email} error={errors.email ? true:false}
            disabled={props.UI.loading} fullWidth/>
             <TextField id="password" 
            type={password ? 'text' : 'password'} 
            name="password" 
            variant="outlined"
            InputProps={{
             startAdornment: (
               <InputAdornment position="start">
                 <VpnKeyIcon />
               </InputAdornment>
             ),
             endAdornment:(
                 <InputAdornment position="end">
                   <IconButton
                     aria-label="toggle password visibility"
                     onClick={passwordVisibilty}
                   >
                     {password ? <Visibility /> : <VisibilityOff />}
                   </IconButton>
                 </InputAdornment>
             ),
           }}
            label="Password" className={props.classes.textField} 
            value={loginDetail.password} helperText={errors.pass} 
            disabled={loginDetail.loading}
            error={errors.pass ? true:false} 
            onChange={handleChange} fullWidth/>
            
            {errors.general && (<Typography variant="h5" color="error" className={props.classes.customError}>{errors.general}</Typography>)}
            <Button type="submit" variant="contained" color="primary" className={props.classes.loginButton} disabled={props.UI.loading}>
              Login 
              {props.UI.loading && (
              <CircularProgress size={30} className={props.classes.progress}/>)}
            </Button> 
            <br />
            <small>
              Don't have an account ? <Link to="/signup">Click here </Link> to Sign Up
            </small>

        </form>
     </Grid>
     <Grid item sm></Grid>
 </Grid>
 
   
    
    
)}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Login))
