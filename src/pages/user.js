import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Scream from '../components/Scream'
import {getUserData} from '../redux/actions/dataAction'
import axios from 'axios'
import StaticProfile from '../components/StaticProfile'
import PostSkeleton from '../util/PostSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'


const User = (props) => {
    const [profile, setProfile] = useState(null)
    const [postIdParam, setPostIdParam] = useState('')

    useEffect(() => {
        const userHandle = props.match.params.handle;
        const postId = props.match.params.postId;

        if(postId) setPostIdParam(postId)
        props.getUserData(userHandle);
       axios.get(`/user/${userHandle}`).then(res=>{
          setProfile(res.data.user)
       }).catch(err=>{
           console.log(err)
       })//eslint-disable-next-line
    },[])

    const { posts, loading } = props.data

    let markUpValue = loading ? (<PostSkeleton/>) : posts === null ? (<p>User have not posted any status</p>) 
    : !postIdParam ? posts.map((post,i)=> <Scream key={post.postId} post={post}></Scream>) 
    : (posts.map(post=>{
        if(post.postId!== postIdParam)
        return (<Scream key={post.postId} post={post}></Scream>) 
        else
        return (<Scream key={post.postId} post={post} openDialog/>)
    })) ;
    return (
        
        <Grid container spacing={3}>
            <Grid item sm={2} xs={12}>

            </Grid>
            <Grid item sm={6} xs={12}>
               {markUpValue}       
            </Grid>
            <Grid item sm={4} xs={12}>
                {profile === null ? (<ProfileSkeleton/>) : (<StaticProfile profile={profile}/>)}
            </Grid>
        </Grid>
    )

}
User.propTypes = {
  data:PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    data: state.data
})

export default connect(mapStateToProps,{ getUserData })(User)
