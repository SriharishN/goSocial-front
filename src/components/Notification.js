import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import { connect } from 'react-redux'
import { markNotificationsRead } from '../redux/actions/userAction'

const Notification = (props) => {
    dayjs.extend(relativeTime);
    const [anchor, setAnchor] = useState({
        anchorEl:null
    })
    const notifications = props.notifications
    const anchorEl = anchor.anchorEl;

    const handleOpen = (event) =>{
        setAnchor({
            ...anchor,
            anchorEl : event.target
        })
    }

    const handleClose = () =>{
        setAnchor({
            anchorEl:null
        })
    }

    const onMenuOpened = () =>{
        let unreadNotificationsIds = props.notifications.filter((note) => !note.read).map((note) => note.notificationId);
        props.markNotificationsRead(unreadNotificationsIds);
    }

    let notificationIcon;
    if(notifications && notifications.length > 0){
        notifications.filter(note=> note.read === false).length > 0 ?
          (notificationIcon = (
              <Badge badgeContent={notifications.filter(note=> note.read === false).length}
              color="secondary">
              <NotificationsIcon/>
              </Badge>
          )):(notificationIcon = <NotificationsIcon/>)
    }else{
        notificationIcon = <NotificationsIcon/>
    }
    let notificationMarkUp =  notifications && notifications.length > 0 ? (
        notifications.map(note=>{
            const verb = note.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(note.createdAt).fromNow();
          const iconColor = note.read ? 'primary' : 'secondary';
          const icon =
            note.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            )
            let path = `/users/${note.recipient}/post/${note.postId}`;
            return (
                <MenuItem key={note.createdAt} onClick={handleClose}>
                  {icon}
                  <Typography
                    component ={Link}
                    color="secondary"
                    variant="body1"
                    to={path}
                  >   
                    {note.sender} {verb} your scream {time}
                  </Typography>
                </MenuItem>
              )
        })
    ) : (
    <MenuItem onClick={handleClose}>
        You have no notifications yet
      </MenuItem>
      )
    return (
        <Fragment>
        <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationMarkUp}
      </Menu>
    </Fragment>
    )
}

Notification.propTypes = {
    notifications: PropTypes.array.isRequired,
    markNotificationsRead: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    notifications : state.user.notifications
})

export default connect(mapStateToProps,{ markNotificationsRead })(Notification)