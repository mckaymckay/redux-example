import React from 'react'
import { useSelector } from 'react-redux'
import {selectPostById} from '@/store/slice/postSlice'

export default function index ({ id }) {
  // const post = useSelector(state => state.posts?.find(post => post.id === id))
  const post = useSelector(state=>selectPostById(state,id))
  const {date }=post
  return (
    <>
      {date && <i>{`created at ${post?.date}`}</i>}
    </>
  )
}
