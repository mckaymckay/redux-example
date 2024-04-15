import React from 'react'
import { useSelector } from 'react-redux'
import {selectUserById, selectAllUsers} from '../../../../store/slice/usersSlice'

export default function UserPage ({ match }) {
  const user = useSelector(state => selectUserById(state, match?.params?.userId))
  const users = useSelector(selectAllUsers)
  console.log(989, user, users)

  // const postsForUser = useSelector(state =>
  //   state.posts.posts.filter(post=<post.))

  // const postTitles = postsForUser.map(post => (
  //   <li key={post.id}>
  //     <Link to={`/posts/${post.id}`}>{post.title}</Link>
  //   </li>
  // ))

  return (
    <div>
      
        <section>
          <h2>{`${user.name}'s UserPage`}</h2>

          {/* <ul>{postTitles}</ul> */}
        </section>
    </div>
  )
}
