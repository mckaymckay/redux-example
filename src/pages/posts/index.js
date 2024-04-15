import React from 'react'
import PostsList from './components/PostsList'
import AddPostsForm from './components/AddPostForm'

const Posts= () =>{
  return (
    <>
      <AddPostsForm></AddPostsForm>
      <PostsList></PostsList>
    </>
  )
}
export default Posts