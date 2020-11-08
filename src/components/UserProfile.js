import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Paper, Typography, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import dayjs from 'dayjs'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import KeyboardReturn from '@material-ui/icons/KeyboardReturnSharp';
import { logOutUser, imageUpload } from '../redux/actions/userAction'
import EditProfile from './EditProfile';
import ProfileSkeleton from '../util/ProfileSkeleton';

const styles = (theme) =>(
    {
        ...theme.spreadThis,
        paper: {
          padding: 20
        },
        profile: {
          '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
              position: 'absolute',
              top: '80%',
              left: '70%'
            }
          },
          '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
          },
          '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
              verticalAlign: 'middle'
            },
            '& a': {
              color: theme.palette.primary.main
            }
          },
          '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
          },
          '& svg.button': {
            '&:hover': {
              cursor: 'pointer'
            }
          }
        },
        buttons: {
          textAlign: 'center',
          '& a': {
            margin: '20px 10px'
          }
        }
      }
)

function UserProfile(props) {
    const handleImageInput = (event) =>{
      const image = event.target.files[0];
      const newFormData = new FormData();
      newFormData.append("image", image, image.name);
      props.imageUpload(newFormData)
    }
    const handleEditPicture = ()=>{
        const fileClick = document.getElementById('imageInput');
        fileClick.click();
    }
    const handleLogout = () =>{
      props.logOutUser();
    }

    const { classes, user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location}, loading, authenticated }} = props
    let createdMonth = dayjs(createdAt).format('MMM YYYY');
    let profileContent = loading ? 
    (<ProfileSkeleton/>) :
    (authenticated ? (
        <Paper className={classes.paper} elevated={3}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src = {imageUrl} className="profile-image" alt="profile"></img>
                    <input type="file" id="imageInput" onChange={handleImageInput} hidden="hidden" accept="image/jpeg, image/png"/>
                    <Tooltip title="Edit Profile picture" placement="top">
                      <IconButton onClick={handleEditPicture} className="button">
                        <EditIcon color="primary"> 
                        </EditIcon>
                      </IconButton>
                    </Tooltip>
                </div>
                <hr/>
                <div className="profile-details">
            <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                {handle}
            </MuiLink>
            <hr/>
            {bio && <Typography color="primary" variant="body1">{bio}</Typography>}
            <hr/>
            {location && (<Fragment>
            <LocationOn color="primary"/><span>{location}</span>
            <hr/>
            </Fragment>
            )}
            {website && (<Fragment>
            <LinkIcon color="primary"/>
            <a href={website} target="_blank" rel="noopener noreferrer">
            {' '}{website}
            </a>
            <hr/>
            </Fragment>
            )}
            <CalendarToday color="primary"/>{' '}<span>Joined {createdMonth}</span>
                </div>
                <Tooltip title="Logout" placement="top">
                  <IconButton onClick={handleLogout}>
                  <KeyboardReturn color="primary"></KeyboardReturn>
                  </IconButton>
                </Tooltip>
                <EditProfile/>
            </div>
        </Paper>
    ) : (
       <Paper className={classes.paper}>
           <Typography variant="body1" align="center">
            No Profile found. Please Login again
           </Typography>
           <br/>
           <div className={classes.buttons}>
           <Button variant="contained"  color="primary" component={Link} to="/login">
                Login
           </Button>
           <Button variant="contained" color="secondary" component={Link} to="/signup">
               Sign Up
           </Button>
           </div>
       </Paper>
    )) 

    return profileContent;
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    imageUpload: PropTypes.func.isRequired,
    logOutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionToProps = {
  logOutUser,
  imageUpload
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(UserProfile))

