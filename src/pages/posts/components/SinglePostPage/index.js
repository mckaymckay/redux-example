import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import PostAuthor from '../PostAuthor'
import PostDate from '../PostDate'
import {selectPostById} from '@/store/slice/postSlice'


export default function details ({ match }) {
  const {postId,userId}=match.params
  // const post = useSelector(state => state.posts?.find(post => post.id === postId))
  const post =useSelector(state=>selectPostById(state,postId))
  const author =useSelector(state=>state.uses?.find(user=>user.id===post?.user))
  
  if (!post) {
    return (
      <section>
        <h2>页面未找到！</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostDate id={post?.id}></PostDate>
        &nbsp;
        <PostAuthor userId={post?.user}></PostAuthor>
        <br/>
        <Link to={`/editPosts/${post.id}`} className="button muted-button">
              Edit Posts
        </Link>
      </article>
    </section>
  )
}
