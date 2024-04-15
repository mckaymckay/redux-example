import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById, selectAllUsers } from '@/store/slice/usersSlice'
import { selectAllPosts } from '@/store/slice/postSlice'
import { Link } from 'react-router-dom'

export default function UserPage ({ match }) {
  const user = useSelector(state => selectUserById(state, match?.params?.userId))
  const users = useSelector(selectAllUsers)

  const postsForUser = useSelector(state => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter(post => post.user === user?.id)
  }
   )

  const postTitles = postsForUser?.map(post => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <div>
      
        <section>
          <h2>{`${user?.name}'s UserPage`}</h2>

          <ul>{postTitles}</ul>
        </section>
    </div>
  )
}
