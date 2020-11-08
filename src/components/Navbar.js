import React, { Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import HomeIcon from '@material-ui/icons/Home'
import Notification from './Notification'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import CreatePost from './CreatePost'

const Navbar = (props) => {
    const {authenticated} = props
    
      return( <AppBar>
             
            <Toolbar className="nav-container">
                {authenticated ? (
                            <Fragment>
                                <CreatePost/>
                                <Link to="/">
                                <Tooltip title="Home" placement="top">
                                <IconButton className="button">
                                <HomeIcon color="primary"> 
                                </HomeIcon>
                                </IconButton>
                                </Tooltip>
                                </Link>
                                <Notification/>
                            </Fragment>
                )
                :
                (
                       <Fragment>
                         <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                        </Fragment>
                )
                }    
            </Toolbar>
        </AppBar>
        )
}

Navbar.protoTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state =>({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
