import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import './index.css'
import PostAuthor from '../PostAuthor'
import PostDate from '../PostDate'
import { selectAllPosts, fetchPosts } from '@/store/slice/postSlice'
import {FETCH_STASUS_PEDDING} from '@/constant'
import { Spin } from 'antd'


export default function index () {
  // const posts = useSelector(state => state.posts)
  const posts = useSelector(selectAllPosts)
  const dispatch = useDispatch()
  const status = useSelector(state => state.posts.status)

  useEffect(() => {
    if (status === FETCH_STASUS_PEDDING) {
      dispatch(fetchPosts())
    }
  },[status, dispatch])
  
  return (
    <Spin spinning={status===FETCH_STASUS_PEDDING}>
      <section className="posts-list">
        <h2>Posts</h2>
        {
          posts.map(post => (
            <article className="post-excerpt" key={post.id} >
              <h3>{post.title}</h3>
              <p className="post-content">{post?.content?.substring(0, 100)}</p>
              <PostDate id={post?.id}></PostDate>
              &nbsp;
              <PostAuthor userId={post?.user}></PostAuthor>
              <br/>
              <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
              </Link>

            </article>
          ))
    
        }
        </section>
      </Spin>
  )
}