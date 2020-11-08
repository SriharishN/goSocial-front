import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import Scream from '../components/Scream'
import UserProfile from '../components/UserProfile'
import { getPosts } from '../redux/actions/dataAction'
import { connect } from 'react-redux'
import PostSkeleton from '../util/PostSkeleton'

function Home(props) {
   const {posts, loading } = props.data
   useEffect(() => {
       props.getPosts() //eslint-disable-next-line
   },[]); 
    
let markUpValue = !loading ? posts.map((post,i)=> <Scream key={post.postId} post={post}></Scream>) : (<PostSkeleton/>);
    return (
        
        <Grid container spacing={3}>
            <Grid item sm={2} xs={12}>

            </Grid>
            <Grid item sm={6} xs={12}>
            {markUpValue}            
            </Grid>
            <Grid item sm={4} xs={12}>
                <UserProfile/>
            </Grid>
        </Grid>
    )
}

Home.propTypes = {
   data: PropTypes.object.isRequired,
   getPosts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, {getPosts})(Home)
