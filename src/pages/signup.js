import React, { useState,useEffect } from 'react'
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
import { signUpUser } from '../redux/actions/userAction'
import { Link } from 'react-router-dom'
import AppIcon from '../images/goSocial_logo.png'


const styles = (theme) => ({
    ...theme.spreadThis
 })


const Signup = (props) =>{
    
    const [signUpDetail, setLoginDetails] = useState({
        email:'',
        password:'',
        confirmpass:'',
        user:'',
    })  
    const [errors, setErrors] = useState([{
      errors:''
    }])
    const [password, showPassword] = useState(false)
    const [confirmpassword, showConfirmPassword] = useState(false)
 
    const handleChange = (event) =>{
     setErrors("")
     setLoginDetails({
         ...signUpDetail,
         [event.target.name]: event.target.value
     });
    
 }
 const handleSubmit = (event) =>{
     event.preventDefault();
     setLoginDetails({
       ...signUpDetail
     })
     const newUserData = {
         email: signUpDetail.email,
         pass: signUpDetail.password,
         confirmpass: signUpDetail.confirmpass,
         handle: signUpDetail.user
     };
     props.signUpUser(newUserData, props.history);
 }
 useEffect(() => {
  if(props.UI.errors && props.UI.signup){
    setErrors(props.UI.errors)
  }
  
}, [props.UI.errors,props.UI.signup]);

 const passwordVisibilty = (event) =>{    
      showPassword(!password);
 }
 const confirmPasswordVisibility = (event) =>{
    showConfirmPassword(!confirmpassword)
 } 
 
     return(
      
       <Grid container className={props.classes.form}>
      
      <Grid item sm></Grid>
      <Grid item sm>
         <br/>
         <img src={AppIcon} alt="Logo"/> 
         <Typography variant="h3" className={props.classes.pageTitle}>Sign Up</Typography>
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
             value={signUpDetail.email} onChange={handleChange} helperText={errors.email} error={errors.email ? true:false}
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
             value={signUpDetail.password} helperText={errors.pass} 
             disabled={props.UI.loading}
             error={errors.pass ? true:false} onChange={handleChange} fullWidth/>

             <TextField id="confirmpass" 
             type={confirmpassword ? 'text' : 'password'} 
             name="confirmpass" 
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
                      onClick={confirmPasswordVisibility}
                    >
                      {confirmpassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
              ),
            }}
             label="Confirm Password" className={props.classes.textField} 
             value={signUpDetail.confirmpass} helperText={errors.confirmpass} 
             disabled={props.UI.loading}
             error={errors.confirmpass ? true:false} onChange={handleChange} fullWidth/>
             
             <TextField id="user" variant="outlined" 
             type="text"
             name="user" 
             label="username" className={props.classes.textField} 
             InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              ),
            }}
             value={signUpDetail.user} onChange={handleChange} helperText={errors.handle} error={errors.handle ? true:false}
             disabled={props.UI.loading} fullWidth/>
             {errors.general && (<Typography variant="h5" color="error" className={props.classes.customError}>{errors.general}</Typography>)}
             
             <Button type="submit" variant="contained" color="primary" className={props.classes.loginButton} disabled={props.UI.loading}>
               Sign Up 
               {props.UI.loading && (
               <CircularProgress size={30} className={props.classes.progress}/>)}
             </Button> 
            <br />
            <small>
             Already have an account ? <Link to="/login">Click here </Link> to Login
            </small>
         </form>
      </Grid>
      <Grid item sm></Grid>
  </Grid>    
 )}
 
 Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps  = (state) =>({
  user: state.user,
  UI: state.UI
})
const mapActionToProps = {
  signUpUser
}
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Signup))
