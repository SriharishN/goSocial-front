import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentPost } from '../redux/actions/dataAction'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton:{
        marginBottom:10
    }
})

const CommentForm = (props) => {

    const [state, setstate] = useState({
        body:''
    })
    const [errors, setErrors] = useState([{
        errors:''
      }])

    const handleChange = (event) =>{
        setstate({
            ...state,
            [event.target.name]: event.target.value
        });
    }
    
    const { classes, postId, authenticated, UI: {loading} } = props;
    const handleSubmit = (event) =>{
        event.preventDefault();
        setstate({
          ...state
        })
        const userData = {
            body: state.body
        };
       props.commentPost(postId,userData)
       setstate({ body: ""});
    }
    
    useEffect(() => {
        if(props.UI.errors && props.UI.comment)
          setErrors(props.UI.errors)

        if(!props.UI.errors && !props.UI.loading){
            setstate({ body: ""});
            setErrors('')
        } 
      }, [props.UI.errors,props.UI.loading,props.UI.comment])
    const commentForm = authenticated ? (
        <Grid item sm={12} style={{textAlign: 'center'}}>
        <form onSubmit={handleSubmit}>
        <TextField
        name="body"
        type="text"
        label="Comment"
        multiline
        rows="3"
        placeholder="Comments !!"
        value={state.body}
        onChange={handleChange}
        error={errors ? true : false}
        helperText={errors.body}
        className={classes.textField}
        fullWidth
        />
        <Button className={classes.submitButton} type="submit" variant="contained" color="primary" disabled = {loading}>Submit</Button>
        </form>
        </Grid>
    ) : null
    return commentForm
}

CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    UI:PropTypes.object.isRequired,
    commentPost: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state =>({
    authenticated: state.user.authenticated,
    UI: state.UI
})

const mapActionToProps = {
    commentPost
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CommentForm))
